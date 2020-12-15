@extends('public.app')
@section('content')

<style>
    .fixed {
        position: fixed;
        width:23%;
        margin-bottom:20px;
    }
    .scrollit {
        margin-left: 25%;

    }
    .right_side_bar_fixed {
        position: fixed;
        margin-left: 75%;
        width:23%;
    }
    </style>
    <section id="content">
        <div class="content-wrap">
            <div class="container-fluid px-5 clearfix">
                <div class="row clearfix">
                    <div class="col-md-3 d-none d-sm-block fixed">
                        <div class="row" style="overflow: auto">
                            <div class="col-md-12">
                                <div class="fancy-title title-border" style="margin-bottom: 5px;margin-top:1rem !important">
                                    <h3>Filter</h3>
                                </div>
                                <form>
                                    <div class="row form-group">
                                        <label class="col-sm-12 col-form-label font-normal">{{ __('Age') }}</label>
                                        <div class="col-sm-5">
                                           <select class="selectpicker form-control" name="from_age">
                                               <option value="22" selected>22</option>
                                               <option value="23" selected>23</option>
                                           </select>
                                        </div>
                                        <div class="col-sm-2">
                                            To
                                        </div>
                                        <div class="col-sm-5">
                                            <select class="selectpicker form-control" name="from_age">
                                                <option value="22" selected>22</option>
                                                <option value="23" selected>23</option>
                                            </select>
                                         </div>
                                    </div>
                                    <div class="row form-group">
                                        <div class="col-sm-6" style="padding-left: 0px">
                                        <label class="col-sm-12 col-form-label font-normal">{{ __('Rasi') }}</label>
                                        <div class="col-sm-12">
                                            <select class="selectpicker form-control" name="from_age">
                                               @foreach ($rasies as $rasi )
                                                   <option value="{{ $rasi->id }}">{{ $rasi->name }}</option>
                                               @endforeach
                                            </select>
                                         </div>
                                        </div>
                                        <div class="col-sm-6"  style="padding-right: 0px">
                                            <label class="col-sm-12 col-form-label font-normal">{{ __('Star') }}</label>
                                        <div class="col-sm-12">
                                            <select class="selectpicker form-control" name="stars">
                                                @foreach ($stars as $star )
                                                    <option value="{{ $star->id }}">
                                                        {{ $star->name }}
                                                    </option>
                                                @endforeach
                                            </select>
                                         </div>
                                        </div>
                                    </div>

                                    <div class="row form-group">
                                        <label class="col-sm-12 col-form-label font-normal">{{ __('Lagnam') }}</label>
                                        <div class="col-sm-12">
                                            <select class="selectpicker form-control" name="lagnam">
                                                <option value="22" selected>Pudan</option>
                                                <option value="23" selected>Sevai</option>
                                            </select>
                                         </div>
                                    </div>
                                    <div class="row form-group">
                                        <label class="col-sm-12 col-form-label font-normal">{{ __('Mother Tuge') }}</label>
                                        <div class="col-sm-12">
                                            <select class="selectpicker form-control" name="mother_tongue">
                                                <option value="1" >Tamil</option>
                                                <option value="2" >Telugu</option>
                                            </select>
                                         </div>
                                    </div>
                                    <div class="row form-group">
                                        <label class="col-sm-12 col-form-label font-normal">{{ __('Marriedl Status') }}</label>
                                        <div class="col-sm-8">
                                            <select class="selectpicker form-control" name="from_age">
                                                <option value="1" >UnMarried</option>
                                                <option value="2" >Married</option>
                                                <option value="3" >Widow/Widower</option>
                                                <option value="3" >Separated</option>
                                                <option value="3" >Divorcee</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-4">
                                            <button type="submit" class="btn btn-success">
                                                <i class="icon-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 profile_container scrollit" style="min-height:100vh;">
                        <div class="row">
                            <h4 class="text-center"><br>Shortlisted Profiles By You</h4>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    @foreach($profiles as $profile)
                                    @php
                                        $profile = $profile->member;
                                    @endphp
                                    <div class="entry event col-12 member_profile">
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
                                                        <li><i class="icon-map-marker1"></i>{{ $profileLocationCity }}, {{ $profileLocationState }}</li>
                                                    </ul>
                                                </div>
                                                <div class="entry-content">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    @include('public.user.sidebar')
                </div>
            </div>
        </div>
    </section>
@endsection
