<div class="entry event col-12 member_profile ">
    <input type="hidden" name="member_code" value="{{ $profile->member_code }}" />
    <div class="grid-inner row align-items-center no-gutters p-4">

        <div class="entry-image col-md-4 mb-md-0">
            <a href="#">
                <img src="{{ $profile->secureProfilePhoto() }}" alt="{{ $profile->fullName }}">
            </a>
        </div>
        <div class="col-md-8 pl-md-4">
            <div class="entry-title title-xs">
                <h2 style="text-decoration: underline">
                    <a href="{{ route('member.view_profile', $profile->member_code) }}">{{ $profile->fullName }}</a></h2>
                RG{{ $profile->member_code }}
            </div>
            <div class="entry-meta">
                <ul>
                    @php
                        $profileDegree = $degrees->whereIn('id', $profile->educations->pluck('degree_id'))->pluck('name');
                        $profileDegree = implode(",", $profileDegree->toArray());
                        $profileLocation = $profile->location ?? optional();
                        $profileLocationCity = $profileLocation->city ? $profileLocation->city->name : null;
                        $profileLocationState = $profileLocation->state ? $profileLocation->state->name : null;
                        $profileOccupation = $profile->occupation ?? optional();
                        $memberAnnualIncome = array_search($profileOccupation->annual_income, ANNUAL_INCOME_RANGE_KEY_VALUE);
                        $annualIncome = ANNUAL_INCOME_RANGE[$memberAnnualIncome] ?? null;
                    @endphp
                    <li>Age : {{ $profile->age }}</li>
                    <li>Mother Tongue : {{ $profile->mother_tongue->name }}</li>
                    <li>Education : {{ $profileDegree }}</li>
                    <li>Annual Income : {{ $annualIncome }}</li>
                    <li>Occupation : {{ optional($profile->occupation)->role }}</li>
                    @if($member->viewProfileLocation())
                        <li><i class="icon-map-marker1"></i>{{ $profileLocationCity }}, {{ $profileLocationState }}</li>
                    @endif
                </ul>
            </div>
            <div class="entry-meta">
                @if($checkProfileStatus ?? false)
                    @php
                        //info("-------------------------------");
                        //$temp = $profile->current_user_interest_received;
                    @endphp
                    @if($profile->current_user_interest_received()->count() ?? false)
                        @php
                            $profileInterestReceived = $profile->current_user_interest_received()->first();
                            $requestStatus = $profileInterestReceived->request_status ?? null;
                        @endphp
                        @if($requestStatus == PROFILE_REQUEST_PENDING)
                            Waiting For Your Response
                            @php
                                $showInterestAcceptButton = true;
                                $showInterestRejectButton = true;
                            @endphp
                        @endif
                    @elseif($profile->current_user_interested_profiles()->count() ?? false)
                            @php
                                $profileInterestRequest = $profile->current_user_interested_profiles()->first();
                                $requestStatus = $profileInterestRequest->request_status ?? null;
                                $profileStatus = $profileInterestRequest->profile_status ?? null;
                            @endphp
                            @if($requestStatus == PROFILE_REQUEST_APPROVED && $profileStatus == PROFILE_INTEREST)
                                Your Request Accepted
                                @php
                                    $showInterestRejectButton = true;
                                @endphp
                            @elseif($requestStatus == PROFILE_REQUEST_PENDING && $profileStatus == PROFILE_INTEREST)
                                Your Request In Pending
                                @php
                                    $showDeleteRequest = true;
                                @endphp
                            @elseif($profileStatus == PROFILE_SHORTLIST)
                                @php
                                    $showSendInterestButton = true;
                                    $showIgnoreButton = true;
                                @endphp
                            @elseif($profileStatus == PROFILE_IGNORED)
                                @php
                                    $showShortListButton = true;
                                    $showSendInterestButton = true;
                                    $showDeleteFromIgnoreList = true;
                                @endphp
                            @endif
                    @else
                            @php
                                $showShortListButton = true;
                                $showSendInterestButton = true;
                                $showIgnoreButton = true;
                            @endphp
                    @endif

                    @php
                        //info("------------- ENDED------------------");
                    @endphp
                @endif
            </div>
            <div class="entry-content">
                @if($showCreatedOn ?? false)
                <h5 class="text font-italic font-normal float-right text-dark" style="margin-bottom:  0px">
                    <i class="icon-time text-success"></i> {{ $profileViewInfo->created_at }}
                </h5>
                <br>
            @endif
                @if($showInterestAcceptButton ?? false)
                    <button type="button" class="btn btn-success btn-sm mb-1 accept_interest">
                        <i class="icon-line-check"></i>&nbsp;Accept
                    </button>
                @endif
                @if($showInterestRejectButton ?? false)
                    <button type="button" class="btn btn-danger btn-sm mb-1 ignore_request">
                        <i class="icon-line-cross"></i>&nbsp;Not Interest
                    </button>
                @endif
                @if($showDeleteRequest ?? false)
                    <button type="button" class="btn btn-danger btn-sm mb-1 delete_request">
                        <i class="icon-line-cross"></i>&nbsp;Delete Request
                    </button>
                @endif
                @if($showShortListButton ?? false)
                    <button type="button" class="btn btn-info btn-sm mb-1 add_profile_to_shortlist">
                        <i class="icon-star3"></i>&nbsp;Add To Shortlist
                    </button>
                @endif
                @if($showSendInterestButton ?? false)
                    <button type="button" class="btn btn-success btn-sm mb-1 send_interest">
                        <i class="icon-hand-holding-heart"></i>&nbsp;Send Interest
                    </button>
                @endif
                @if($showIgnoreButton ?? false)
                    <button type="button" class="btn btn-danger btn-sm mb-1 add_profile_to_ignore_list">
                        <i class="icon-forbidden"></i>&nbsp;Ignore
                    </button>
                @endif
                @if($showDeleteFromIgnoreList ?? false)
                    <button type="button" class="btn btn-danger btn-sm mb-1 delete_from_ignore_list">
                        <i class="icon-line-cross"></i>&nbsp;Remove From Ignore List
                    </button>
                @endif
            </div>
        </div>
    </div>
</div>
