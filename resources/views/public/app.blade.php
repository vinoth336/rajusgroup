<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="author" content="{{-- $siteInformation->site_name --}}" />
    <meta name="description" content="{{-- $siteInformation->meta_description --}}" />
    <link rel="canonical" href="https://www.marriedly.in" />
    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="sitesite">
    <meta property="og:title" content="Choose the Best Wedding Decorators In Coimbatore -marriedly.in">
    <meta property="og:description" content="Find the best wedding decorators in coimbatore for your Events like Wedding Decorations,Birthday Decorations,Engagement,Reception and outdoor wedding Backdrops. Order now!">
    <meta property="og:url" content="https://www.marriedly.in">
    <meta property="og:site_name" content="Wedding Decorators in Coimbatore">
    <meta property="article:publisher" content="https://www.facebook.com/marriedly">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:creator" content="@MarriedlyWeddingPlanner">
    <meta name="twitter:site" content="@MarriedlyWeddingPlanner">
    <meta name="viewport" content="width=device-width, initial-scale=1" />

	<link
		href="https://fonts.googleapis.com/css?family=Lato:300,400,400i,700|Poppins:300,400,500,600,700|PT+Serif:400,400i&amp;display=swap"
        rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="{{ asset('site/style.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('site/css/dark.css') }}" type="text/css">
	<link rel="stylesheet" href="{{ asset('site/css/bootstrap.css') }} " type="text/css" />
	<link rel="stylesheet" href="{{ asset('site/css/font-icons.css') }}" type="text/css" />
	<link rel="stylesheet" href="{{ asset('site/css/animate.css') }}" type="text/css" />
	<link rel="stylesheet" href="{{ asset('site/css/magnific-popup.css') }}" type="text/css" />
	<link rel="stylesheet" href="{{ asset('site/css/custom.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('site/css/swiper.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('site/style.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('site/css/components/bs-filestyle.css') }}" type="text/css" />
	<link rel="stylesheet" type="text/css" href="{{ asset('site/include/rs-plugin/css/settings.css') }}" media="screen" />
	<link rel="stylesheet" type="text/css" href="{{ asset('site/include/rs-plugin/css/layers.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('site/include/rs-plugin/css/navigation.css') }}">
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.standalone.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
    <title>{{-- $siteInformation->site_name --}}</title>
    <script src="{{  asset('site/js/jquery.js') }}"></script>
    <style>
        .list-groupt {
            border-radius : none;
        }
        .content-wrap {
            padding-top:0px;
        }
    </style>
</head>

<body class="stretched">
    <style>
        .float{
	position:fixed;
	width:60px;
	height:60px;
	bottom:89px;
	right:22px;
	background-color:#25d366;
	color:#FFF;
	border-radius:50px;
	text-align:center;
    font-size:30px;
	box-shadow: 2px 2px 3px #999;
  z-index:100;
}

.my-float{
	margin-top: 9px;
}
        </style>

	<div id="wrapper" class="clearfix">

		<header id="header" class="full-header transparent-header white"  data-sticky-logo-height="74" data-menu-padding="32">
			<div id="header-wrap">
				<div class="container">
					<div class="header-row">

						<div id="logo">
							<a href="{{-- route('home') --}}" class="standard-logo"
                                data-dark-logo="{{-- asset('site/images/logo/'.$siteInformation->logo) --}}">
                                <p >
                                    <label style="color:#cc2c26">Rajus</label>
                                    <label style="color: #c46a35">Matrimonial</label>
                                </p>

                            </a>
							<a href="index.html" class="retina-logo" data-dark-logo="">
                                <p style="width: 100%">
                                    Rajus<br>Matrimonial</p>

                                </a>
						</div>
						<div class="header-misc">

						</div>
						<div id="primary-menu-trigger">
							<svg class="svg-trigger" viewBox="0 0 100 100">
								<path
									d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20">
								</path>
								<path d="m 30,50 h 40"></path>
								<path
									d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20">
								</path>
							</svg>
						</div>

						@include('public.navbar')
					</div>
				</div>
			</div>
			<div class="header-wrap-clone"></div>
        </header>

        @yield('content')

        @include('public.footer')
