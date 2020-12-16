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
                            <h4 class="text-center"><br>Interest Sent By Others</h4>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    @foreach($profiles as $profile)
                                        @php
                                            $profileViewInfo = $profile;
                                            $profile = $profile->member;
                                        @endphp
                                        @include('public.user.components.member_profile_summary')

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
