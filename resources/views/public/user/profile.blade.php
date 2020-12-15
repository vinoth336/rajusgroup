@extends('public.app')
@section('content')
@php
$memberEducations = $member->educations;
$memberOccupation = $member->occupation ?? optional();
$memberFamily = $member->family ?? optional();
$memberLocation = $member->location ?? optional();
$memberHoroscope = $member->horoscope ?? optional();
@endphp
<section id="content">
    <div class="content-wrap">
        <div class="container clearfix">
            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="col-lg-12">
                        <img src="{{ $member->secureProfilePhoto() }}" class="alignleft img my-0" alt="Avatar"
                            style="max-width: 100px;">
                        <div class="heading-block border-0">
                            <h5>{{ $member->fullName }}</h5>
                            <span></span>
                        </div>
                        <div class="clear"></div>
                        <div class="row">
                                <form method="post" action="{{ route('member.profile') }}" autocomplete="off" class="form-horizontal"
                                    enctype="multipart/form-data">
                                    @csrf
                                    @method('put')
                                    <div class="tab-container">
                                        <div class="tab-content" id="basic-details">
                                                <h3>Basic Information</h3>
                                                <hr>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('First Name') }}</label>
                                                    <div class="col-sm-7">
                                                        <div
                                                            class="form-group{{ $errors->has('first_name') ? ' has-danger' : '' }}">
                                                            <input
                                                                class="form-control{{ $errors->has('first_name') ? ' is-invalid' : '' }}"
                                                                name="first_name" id="input-first_name" type="text"
                                                                placeholder="{{ __('First Name') }}" value="{{ old('first_name', $member->first_name) }}"
                                                                required="true" aria-required="true" />
                                                            @if ($errors->has('first_name'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-first_name">{{ $errors->first('first_name') }}</span>
                                                            @endif

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('Last Name') }}</label>
                                                    <div class="col-sm-7">
                                                        <div class="form-group{{ $errors->has('last_name') ? ' has-danger' : '' }}">
                                                            <input
                                                                class="form-control{{ $errors->has('last_name') ? ' is-invalid' : '' }}"
                                                                name="last_name" id="input-contact_person" type="text"
                                                                placeholder="{{ __('Last Name') }}" value="{{ old('last_name', $member->last_name) }}"
                                                                required="true" aria-required="true" />
                                                            @if ($errors->has('last_name'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-last_name">{{ $errors->first('last_name') }}</span>
                                                            @endif

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('Date Of Birth') }}</label>
                                                    <div class="col-sm-7">
                                                        <div class="form-group{{ $errors->has('dob') ? ' has-danger' : '' }}">
                                                            <input
                                                                class="form-control{{ $errors->has('dob') ? ' is-invalid' : '' }}"
                                                                name="dob" id="input-contact_person" type="text"
                                                                placeholder="{{ __('Date Of Birth') }}" value="{{ old('dob', $member->dob) }}"
                                                                required="true" aria-required="true" />
                                                            @if ($errors->has('dob'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-dob">{{ $errors->first('dob') }}</span>
                                                            @endif

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('Blood Group') }}</label>
                                                    <div class="col-sm-7">
                                                        <div class="form-group{{ $errors->has('blood') ? ' has-danger' : '' }}">
                                                            <select class="selectpicker {{ $errors->has('blood') ? ' is-invalid' : '' }}" name="blood" required>
                                                                @foreach ($bloodGroup as $blood)
                                                                    <option value="{{ $blood->id }}"
                                                                        @if($blood->id == old('blood', $member->blood->id)) selected @endif>
                                                                        {{ $blood->name }}
                                                                    </option>
                                                                @endforeach
                                                            </select>
                                                            @if ($errors->has('blood'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-last_name">{{ $errors->first('blood') }}</span>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('Gender') }}</label>
                                                    <div class="col-sm-7">
                                                        <div class="form-group{{ $errors->has('gender') ? ' has-danger' : '' }}">
                                                            <select class="selectpicker  {{ $errors->has('gender') ? ' is-invalid' : '' }}" name="gender" required>
                                                                <option value="1" @if(old('gender', $member->gender) == 1) selected @endif>Male</option>
                                                                <option value="2" @if(old('gender', $member->gender) == 2) selected @endif>Female</option>
                                                            </select>
                                                            @if ($errors->has('last_name'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-last_name">{{ $errors->first('last_name') }}</span>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('Religion') }}</label>
                                                    <div class="col-sm-7">
                                                        <div class="form-group{{ $errors->has('religion') ? ' has-danger' : '' }}">
                                                            <select class="selectpicker  {{ $errors->has('religion') ? ' is-invalid' : '' }}" name="religion" required>
                                                                <option value="1" @if(old('religion') == 1) selected @endif>Hindu</option>
                                                            </select>
                                                            @if ($errors->has('religion'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-religion">{{ $errors->first('religion') }}</span>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('Mother Tuge') }}</label>
                                                    <div class="col-sm-7">
                                                        <div class="form-group{{ $errors->has('mother_tongue') ? ' has-danger' : '' }}">
                                                            <select class="selectpicker {{ $errors->has('mother_tongue') ? ' is-invalid' : '' }}" name="mother_tongue" required>
                                                                <option value="1" @if(old('mother_tongue', $member->mother_tongue->id) == 1) selected @endif>Tamil</option>
                                                                <option value="2" @if(old('mother_tongue', $member->mother_tongue->id) == 2) selected @endif>Telugu</option>
                                                            </select>
                                                            @if ($errors->has('mother_tongue'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-mother_tongue">{{ $errors->first('mother_tongue') }}</span>
                                                            @endif

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('Email') }}</label>
                                                    <div class="col-sm-7">
                                                        <div class="form-group{{ $errors->has('email') ? ' has-danger' : '' }}">
                                                            <input
                                                                class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                                                name="email" id="input-email" type="text"
                                                                placeholder="{{ __('Email Id') }}" value="{{ old('email', $member->email) }}"
                                                                required="true" aria-required="true" />
                                                            @if ($errors->has('email'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-email">{{ $errors->first('email') }}</span>
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <label class="col-sm-5 col-form-label">{{ __('Mobile No') }}</label>
                                                    <div class="col-sm-7">
                                                        <div class="form-group{{ $errors->has('phone_no') ? ' has-danger' : '' }}">
                                                            <input
                                                                class="form-control{{ $errors->has('phone_no') ? ' is-invalid' : '' }}"
                                                                name="phone_no" id="input-contact_person" type="text"
                                                                placeholder="{{ __('Mobile No') }}" value="{{ old('phone_no', $member->phone_no) }}"
                                                                required="true" aria-required="true" />
                                                            @if ($errors->has('phone_no'))
                                                                <span id="name-error" class="error text-danger"
                                                                    for="input-phone_no">{{ $errors->first('phone_no') }}</span>
                                                            @endif

                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div class="tab-content" id="education-and-occupation-details">
                                                <div class="row form-group">
                                                    <div class="col-sm-12">
                                                        <h3>Education</h3>
                                                            @php
                                                                $memberDegrees = $memberEducations->pluck('degree_id')->toArray();
                                                            @endphp

                                                            <select class="selectpicker" name="degree[]" id="input-service" type="text" multiple >
                                                                <option value=''>Select Degree</option>
                                                                @foreach($degrees as $degree)
                                                                    <option value="{{ $degree->id }}" @if(old('degree.0') == $degree->id
                                                                    || in_array($degree->id, $memberDegrees)))
                                                                     selected @endif >{{ $degree->name }}</option>
                                                                @endforeach
                                                            </select>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-sm-12">
                                                        <h3>Occupation</h3>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Employee In') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('role') ? ' has-danger' : '' }}">
                                                                    <select name="employee_in" class="selectpicker">
                                                                            <option value="">Select Employee In </option>
                                                                            @foreach ($employeeIns as $employeeIn )
                                                                                <option value="{{ $employeeIn->id }}"
                                                                                    @if($employeeIn->id == old('employee_in', $memberOccupation->employee_in_id)) selected @endif >
                                                                                    {{ $employeeIn->name }}
                                                                                </option>
                                                                            @endforeach
                                                                    </select>
                                                                    @if ($errors->has('employee_in'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-role">{{ $errors->first('employee_in') }}</span>
                                                                    @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Role Name') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('role') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('role') ? ' is-invalid' : '' }}"
                                                                        name="role" id="input-contact_person" type="text"
                                                                        placeholder="{{ __('Role Name') }}"
                                                                        value="{{ old('role', $memberOccupation->role) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('role'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-role">{{ $errors->first('role') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label
                                                                class="col-sm-5 col-form-label">{{ __('Organisation Detail') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('organisation_details') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('organisation_details') ? ' is-invalid' : '' }}"
                                                                        name="organisation_details" id="input-organisation_details" type="text"
                                                                        placeholder="{{ __('Organisation Detail') }}"
                                                                        value="{{ old('organisation_details', $memberOccupation->organisation_details) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('organisation_details'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-organisation_details">{{ $errors->first('organisation_details') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Job Location') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('job_location') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('job_location') ? ' is-invalid' : '' }}"
                                                                        name="job_location" id="input-job_location" type="text"
                                                                        placeholder="{{ __('Job Location') }}"
                                                                        value="{{ old('job_location', $memberOccupation->job_location) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('job_location'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-job_location">{{ $errors->first('job_location') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Annual Income') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('role') ? ' has-danger' : '' }}">
                                                                    @php
                                                                     $memberAnnualIncome = array_search($memberOccupation->annual_income, ANNUAL_INCOME_RANGE_KEY_VALUE);
                                                                    @endphp
                                                                    <select name="annual_income" class="selectpicker">
                                                                            <option value="">Select Annual Income</option>
                                                                            @foreach (ANNUAL_INCOME_RANGE as $range => $value )
                                                                                <option value="{{ $range }}"
                                                                                    @if($range == old('annual_income', $memberAnnualIncome)) selected @endif >
                                                                                    {{ $value}}
                                                                                </option>
                                                                            @endforeach
                                                                    </select>
                                                                    @if ($errors->has('employee_in'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-role">{{ $errors->first('employee_in') }}</span>
                                                                    @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div class="tab-content" id="family-location-details">
                                                <div class="row form-group">
                                                    <div class="col-sm-12">
                                                        <h3>Family Details</h3>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Family Type') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('family_type') ? ' has-danger' : '' }}">
                                                                    @php
                                                                        $memberFamilyType = $memberFamily->family_type ?? optional();
                                                                    @endphp
                                                                    <select class="selectpicker" name="family_type">
                                                                        <option value=''>Select Family Type</option>
                                                                        @foreach($familyType as $type)
                                                                            <option value="{{ $type->id }}" @if(old('type', $memberFamilyType->id) == $type->id ) selected @endif >{{ $type->name }}</option>
                                                                        @endforeach
                                                                    </select>
                                                                    @if ($errors->has('family_type'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-family_type">{{ $errors->first('family_type') }}</span>
                                                                    @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Parents') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('parents') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('parents') ? ' is-invalid' : '' }}"
                                                                        name="parents" id="input-parents" type="text"
                                                                        placeholder="{{ __('Parents') }}"
                                                                        value="{{ old('parents', $memberFamily->parents) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('parents'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-parents">{{ $errors->first('parents') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Brothers') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('brothers') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('brothers') ? ' is-invalid' : '' }}"
                                                                        name="brothers" id="input-contact_person" type="text"
                                                                        placeholder="{{ __('Brothers') }}"
                                                                        value="{{ old('brothers', $memberFamily->brothers) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('brothers'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-brothers">{{ $errors->first('brothers') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Sisters') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('sisters') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('sisters') ? ' is-invalid' : '' }}"
                                                                        name="sisters" id="input-sisters" type="text"
                                                                        placeholder="{{ __('Sisters') }}"
                                                                        value="{{ old('sisters', $memberFamily->sisters) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('sisters'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-sisters">{{ $errors->first('sisters') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row form-group">
                                                    <div class="col-sm-12">
                                                        <h3>Address Details</h3>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Address') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('address') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('address') ? ' is-invalid' : '' }}"
                                                                        name="address" id="input-address" type="text"
                                                                        placeholder="{{ __('Address') }}"
                                                                        value="{{ old('address', $memberLocation->address) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('address'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-address">{{ $errors->first('address') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('State') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('State') ? ' has-danger' : '' }}">
                                                                    <select class="selectpicker" name="state" >
                                                                        <option value="">Select City</option>
                                                                        @foreach ($states as $state )
                                                                            <option value="{{ $state->id }}" @if(old('state', $memberLocation->state_id) == $state->id) selected @endif>
                                                                                {{ $state->name }}
                                                                            </option>
                                                                        @endforeach
                                                                    </select>
                                                                    @if ($errors->has('state'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-state">{{ $errors->first('state') }}</span>
                                                                    @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('City') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('last_name') ? ' has-danger' : '' }}">
                                                                    <select class="selectpicker" name="city" >
                                                                        <option value="">Select City</option>
                                                                        @foreach ($cities as $city )
                                                                            <option value="{{ $city->id }}" @if(old('city', $memberLocation->city_id) == $city->id) selected @endif>
                                                                                {{ $city->name }}
                                                                            </option>
                                                                        @endforeach
                                                                    </select>
                                                                    @if ($errors->has('city'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-city">{{ $errors->first('city') }}</span>
                                                                    @endif
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Pin Code') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('pincode') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('pincode') ? ' is-invalid' : '' }}"
                                                                        name="pincode" id="input-contact_person" type="text"
                                                                        placeholder="{{ __('Pin Code') }}"
                                                                        value="{{ old('pincode', $memberLocation->pincode) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('pincode'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-pincode">{{ $errors->first('pincode') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('LandMark') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('landmark') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('landmark') ? ' is-invalid' : '' }}"
                                                                        name="landmark" id="input-contact_person" type="text"
                                                                        placeholder="{{ __('LandMark') }}"
                                                                        value="{{ old('landmark', $memberLocation->landmark) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('landmark'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-landmark">{{ $errors->first('landmark') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div class="tab-content" id="horoscope-details">
                                                <div class="row form-group">
                                                    <div class="col-sm-12">
                                                        <h3>Horoscope Details</h3>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Rasi') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('rasi') ? ' has-danger' : '' }}">

                                                                    <select class="selectpicker" name="rasi" >
                                                                        <option value="">Select Rasi</option>
                                                                        @foreach ($rasies as $rasi )
                                                                            <option value="{{ $rasi->id }}" @if(old('rasi', optional($memberHoroscope->rasi)->id) == $rasi->id) selected @endif>
                                                                                {{ $rasi->name }}
                                                                            </option>
                                                                        @endforeach
                                                                    </select>
                                                                    @if ($errors->has('rasi'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-rasi">{{ $errors->first('rasi') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Lagnam') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('lagnam') ? ' has-danger' : '' }}">
                                                                    <input
                                                                        class="form-control{{ $errors->has('lagnam') ? ' is-invalid' : '' }}"
                                                                        name="lagnam" id="input-lagnam" type="text"
                                                                        placeholder="{{ __('Lagnam') }}"
                                                                        value="{{ old('lagnam', $memberHoroscope->lagnam) }}" required="true"
                                                                        aria-required="true" />
                                                                    @if ($errors->has('lagnam'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-lagnam">{{ $errors->first('lagnam') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Star') }}</label>
                                                            <div class="col-sm-7">
                                                                <div
                                                                    class="form-group{{ $errors->has('star') ? ' has-danger' : '' }}">
                                                                    <select class="selectpicker" name="star" >
                                                                        <option value="">Select Rasi</option>
                                                                        @foreach ($stars as $star )
                                                                            <option value="{{ $star->id }}" @if(old('star', optional($memberHoroscope->star)->id) == $star->id) selected @endif>
                                                                                {{ $star->name }}
                                                                            </option>
                                                                        @endforeach
                                                                    </select>
                                                                    @if ($errors->has('star'))
                                                                        <span id="name-error" class="error text-danger"
                                                                            for="input-star">{{ $errors->first('star') }}</span>
                                                                    @endif

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row form-group">
                                                            <label class="col-sm-5 col-form-label">{{ __('Horoscope Images') }}</label>
                                                            <div class="col-sm-7">
                                                                <div class="col-lg-12">
                                                                    <input id="horoscope_image" name="horoscope_image" type="file" class="file" data-initial-preview-type="image" data-initial-preview="<img src='{{ asset('site/images/horoscope/' . $memberHoroscope->horoscope_image ) }}' >'" data-show-upload="false" accept="image/x-png,image/jpg,image/jpeg" data-show-preview="true">
                                                                </div>
                                                                <div class="fileinput-preview fileinput-exists thumbnail">
                                                                        @if (!$memberHoroscope->horoscope_image)
                                                                            <p class="text-center"> Horoscope Not Uploaded</p>
                                                                        @endif

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div class="row form-group">
                                                    <div class="ml-auto">
                                                        <a href="{{ route('member.dashboard') }}" class="btn btn-danger">{{ __('Cancel') }}</a>
                                                        <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
