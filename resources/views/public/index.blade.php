@extends('public.app')
@section('content')
    <?php
    $enquiry_form_class = 'form-group row';
    //$services = $servicesForEnquiries;
    ?>
    <section id="slider" class=""
        style="background-image: url('{{ asset('/site/images/site_images/bg.jpg')  }}');background-repeat: no-repeat;background-size: cover;">

        <div class="container clearfix">
            <div class="row">
                <div class="col-lg-6 ">

                </div>
                <div class="col-lg-6">
                    <div class="">
                        <div class="">
                            @if (session('status'))

                            <div class="col-md-12">
                                <div class="alert alert-success">
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <i class="material-icons">close</i>
                                    </button>
                                    <span>{{ session('status') }}</span>
                                </div>
                            </div>

                        @endif
                            <form style="margin-top: 50px;background: #f5f8f9; padding:20px;border: 1px solid #ddd"
                                action="{{ route('public.register') }}" id="myform" method="post">
                                @csrf
                                @method('post')


                                <div class="form-group ">
                                    <div class=" text-white  bg-danger p-3 text-center ">
                                        Registratin Form
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="control-label col-md-4 col-sm-4" for="first_name">
                                        First name
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <input type="text" class="form-control"  required name="first_name" placeholder="First name"
                                            value="{{ old('first_name') }}">
                                        <span id="first_nameMsg" class="error">
                                            @error('first_name')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="last_name">
                                        Last name
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <input type="text" class="form-control"  required name="last_name" placeholder="Last name"
                                            value="{{ old('last_name') }}">
                                        <span id="last_nameMsg" class="error">
                                            @error('last_name')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="dob">
                                        Date of birth
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <input type="text" class="form-control datepicker" autocomplete="off" data-provide="datepicker" name="dob" id="dob"
                                            value="{{ old('dob') }}">
                                        <span id="dobMsg" class="error">
                                            @error('dob')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="blood">
                                        Blood group
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <select class="form-control"  required name="blood" id="blood">
                                            @foreach ($bloodList as $blood )
                                                <option value="{{ $blood->id }}" @if($blood->id == old('blood')) selected @endif>{{ $blood->name }}</option>
                                            @endforeach
                                        </select>
                                        <span id="bloodMsg" class="error">
                                            @error('blood')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="gender">
                                        Gender
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                    <label class="radio-inline">
                                        <input type="radio" name="gender" value="2" @if(old('gender') == 2) checked @endif>&nbsp; &nbsp; Female
                                    </label>
                                    <label class="radio-inline">
                                        <input type="radio" name="gender" value="1" @if(old('gender') == 1) checked @endif>&nbsp; &nbsp; Male
                                    </label>
                                    <br>
                                    <span id="genderMsg" class="error">
                                        @error('gender')
                                                {{ $message }}
                                            @enderror
                                    </span>
                                </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="religion">
                                        Religion
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <select class="form-control"  required name="religion" id="religion">
                                            <option value="1" selected>Hindu</option>
                                        </select>
                                        <span id="religionMsg" class="error">
                                            @error('religion')
                                                    {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="mother_tongue">
                                        Mother Tuge
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <select class="form-control"  required name="mother_tongue" id="mother_tongue">
                                            <option value="2" @if(old('mother_tongue') == 2) selected @endif>Telugu</option>
                                            <option value="1" @if(old('mother_tongue') == 1) selected @endif>Tamil</option>
                                        </select>
                                        <span id="mother_tongueMsg" class="error">
                                            @error('mother_tongue')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="email">
                                        Email
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <input type="email" class="form-control"  required placeholder="Email" name="email"
                                            value="{{ old('email') }}">
                                        <span id="emailMsg" class="error">
                                            @error('email')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="phone_no">
                                        Mobile No
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <input type="number" class="form-control"  required placeholder="Mobile No" name="phone_no"
                                            value="{{ old('phone_no') }}">
                                        <span id="phone_no_msg" class="error">
                                            @error('phone_no')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="username">
                                        User name
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <input type="text" class="form-control"  required name="username" placeholder="User name"
                                            value="{{ old('username') }}">
                                        <span id="usernameMsg" class="error">
                                            @error('username')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="passwords">
                                        Password
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <input type="password" class="form-control"  required placeholder="Password" name="password" min="6">
                                        <span id="passwordsMsg" class="error">
                                            @error('password')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-4 col-md-4" for="cPassword">
                                        Confirm Password
                                        <span class="text-danger">*</span>
                                    </label>
                                    <div class="col-sm-8 col-md-8">
                                        <input type="password" class="form-control"  required placeholder="Confirm Password"
                                            name="confirm_password" min="6">
                                        <span id="confirm_password_msg" class="error">
                                            @error('confirm_password')
                                                {{ $message }}
                                            @enderror
                                        </span>
                                    </div>
                                </div>
                                <input type="submit" class="btn btn-success btn-block" value="Signup">
                                <input type="hidden" name="prefix" value="template-phone_noform-">
                                <br>
                                <div class="text-center">
                                    Already Existing Customer, Click here for
                                    <a href="">Login</a>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <section id="content">
        <div class="content-wrap">
            <div class="container clearfix">
                <div class="section header-stick" style="padding-bottom: 0px;margin-bottom:20px;margin-top: 0.3rem !important;">
                    <div class="container clearfix">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="heading-block bottommargin-sm">
                                    <h3>Who We Are</h3>
                                </div>
                                <p class="mb-0 justify-content-center">Rajus Group is a bespoke wedding planning and
                                    decor company based in Coimbatore.
                                    They believe in delivering quality services to their clients.
                                    They understand the client’s vision first and then conceptualise the wedding
                                    based on those points.
                                    Their mission is to convert your vision into a beautiful reality.
                                    The team at Rajus Group specialise in Décor and Planning.
                                    For décor they have their own in-house team that works efficiently but they are
                                    happy to work with other decorators as well as per the clients’ requirements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line" style="margin: 2rem 0;"></div>

            </div>
            <div class="clear"></div>



            <div class="container clearfix">
                <div class="row col-mb-50">
                    <div class="col-lg-12" style="display: none">
                        <h4>What our Clients Say?</h4>
                        <div class="fslider testimonial" data-animation="slide" data-arrows="false">
                            <div class="flexslider">
                                <div class="flex-viewport" style="overflow: hidden; position: relative;">
                                    <div class="slider-wrap"
                                        style="width: 1000%; transition-duration: 0s; transform: translate3d(-247px, 0px, 0px);">


                                       {{-- @foreach ($testmonials as $client)
                                            <div class="slide" data-thumb-alt=""
                                                style="width: 247.984px; margin-right: 0px; float: left; display: block;">
                                                <div class="testi-image">
                                                    <a href="#">
                                                        <img src="{{ asset('web/images/avatar/thumbnails/' . $client->client_image) }}"
                                                            alt="{{ $client->client_name }}" draggable="false">
                                                    </a>
                                                </div>
                                                <div class="testi-content">
                                                    <p>{{ $client->comment }}</p>
                                                    <div class="testi-meta">
                                                        {{ $client->designation }}
                                                    </div>
                                                </div>
                                            </div>
                                        @endforeach
                                        --}}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <section id="content">
        <div id="phone_no_us" class="content-wrap " style="padding-top: 0px">
            <div class="container clearfix">
                <div class="row align-items-stretch col-mb-50 mb-0">
                    <div class="col-lg-6">
                        <div class="fancy-title title-border">
                            <h3>Send us an Email</h3>
                        </div>
                        <!-- Enquiry Form Start Here -->

                        <?php
                        $enquiry_form_class = 'col-md-4';
                        //$services = $servicesForEnquiries;
                        ?>
                        {{-- @include('site.enquiry_form', ['enquiry_form_class' => $enquiry_form_class] ) --}}

                        <!-- Enquiry Form Ended Here -->

                    </div>

                    <div class="col-lg-6 min-vh-50">
                        <div class="card topmargin overflow-hidden" style="border:none">
                            <div class="card-body">
                                <h4>Opening Hours</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit reprehenderit
                                    voluptates.</p>
                                <ul class="iconlist mb-0">
                                    <li><i class="icon-time color"></i> <strong>Mondays-Fridays:</strong>
                                        {{-- $siteInformation->working_hours_mon_fri --}}
                                    </li>
                                    <li><i class="icon-time color"></i> <strong>Saturdays:</strong>
                                        {{-- $siteInformation->working_hours_sat --}}
                                    </li>
                                    <li><i class="icon-time text-danger"></i> <strong>Sundays:</strong>
                                        {{-- $siteInformation->working_hours_sun --}}
                                    </li>
                                </ul>
                                <i class="icon-time bgicon"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row col-mb-50">
                    <div class="col-sm-6 col-lg-3" style="cursor: pointer"
                        onclick="window.open('https://goo.gl/maps/u86ebsZ7AeX54e7g9', '_blank')">
                        <div class="feature-box fbox-center fbox-bg fbox-plain">
                            <div class="fbox-icon">
                                <a href="#"><i class="icon-map-marker2"></i></a>
                            </div>
                            <div class="fbox-content">
                                <h3>Get Direction<span class="subtitle">Check In<br>Google Map</span></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3" style="cursor: pointer"
                        onclick="window.open('tel:+91{{-- $siteInformation->phone_no --}}', '_blank')">
                        <div class="feature-box fbox-center fbox-bg fbox-plain">
                            <div class="fbox-icon">
                                <a href=""><i class="icon-phone3"></i></a>
                            </div>
                            <div class="fbox-content">
                                <h3>Speak to<br> Us<span class="subtitle"><a style="text-decoration: none;color:#000"
                                            href="tel:+91{{-- $siteInformation->phone_no --}}"> (+91)
                                            {{-- $siteInformation->phone_no --}}</a></span></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3" style="cursor: pointer"
                        onclick="window.open('https://www.instagram.com/{{-- $siteInformation->instagram_id --}}/', '_blank')">
                        <div class="feature-box fbox-center fbox-bg fbox-plain">
                            <div class="fbox-icon">
                                <a href="#"><i class="icon-instagram"></i></a>
                            </div>
                            <div class="fbox-content">
                                <h3>Follow<br>Us<span class="subtitle">2.3M Followers</span></h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3" style="cursor: pointer"
                        onclick="window.open('https://www.facebook.com/{{-- $siteInformation->facebook_id --}}', '_blank')">
                        <div class="feature-box fbox-center fbox-bg fbox-plain">
                            <div class="fbox-icon">
                                <a href="#"><i class="icon-facebook2"></i></a>
                            </div>
                            <div class="fbox-content">
                                <h3>Follow<br>Us<span class="subtitle">2.3M Followers</span></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
    <script>
        $(document).ready(function() {
            // bind 'myForm' and provide a simple callback function
            $('#myForm').ajaxForm(function() {
                alert("Thank you for your comment!");
            });

            $('.datepicker').datepicker({
                format: 'dd-mm-yyyy',
                todayHighlight: true
            });
        });

    </script>
@endsection
