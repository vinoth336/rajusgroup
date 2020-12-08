@extends('public.app')
@section('content')

    <section id="content">
        <div class="content-wrap">
            <div class="container clearfix">
                <div class="row clearfix">
                    <div class="col-md-3 d-none d-sm-block">
                        <div class="row">
                            <div class="col-md-12">
                                <br>
                                <h3>Filter</h3>
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Rasi</label>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Star</label>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Lagnam</label>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Age</label>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Mother Tuge</label>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Star</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6" style="">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <br>
                                    <h3>Based on your profile details, following are matched profiles</h3>
                                </div>
                                <div class="row">
                                    @php $i=1 @endphp


                                    @foreach($profiles as $profile)
                                    <div class="entry event col-12">
                                        <div class="grid-inner row align-items-center no-gutters p-4">
                                            <div class="entry-image col-md-4 mb-md-0">
                                                <a href="#">
                                                    <img src="{{ $profile->secureProfilePhoto() }}" alt="Inventore voluptates velit totam ipsa tenetur">
                                                </a>
                                            </div>
                                            <div class="col-md-8 pl-md-4">
                                                <div class="entry-title title-xs">
                                                    <h2><a href="#">{{ $profile->fullName }}</a></h2>
                                                </div>
                                                <div class="entry-meta">
                                                    <ul>
                                                        <li><a href="#"><i class="icon-time"></i> 11:00 - 19:00</a></li>
                                                        <li><a href="#"><i class="icon-map-marker2"></i> Melbourne, Australia</a></li>
                                                    </ul>
                                                </div>
                                                <div class="entry-content">
                                                    <a href="#" class="btn btn-info btn-sm">Add To Shortlist</a>
                                                    <a href="#" class="btn btn-success btn-sm">Send Interest</a>
                                                    <a href="#" class="btn btn-danger btn-sm">Ignore</a>
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
