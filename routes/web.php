<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['namespace' => 'Members'], function () {
    Route::get('/', 'PublicController@index')->name('public.index');
    Route::get('/login', 'MemberLoginController@showLoginForm')->name('public.login');
    Route::post('/login', 'MemberLoginController@login');
    Route::post('/logout', 'MemberLoginController@logout')->name('public.logout');
    Route::post('/register', 'MemberRegistraionController@save')->name('public.register');
    Route::get('/register/success/{id}', 'MemberRegistraionController@registerationSuccess')->name('public.registration_success');
    Route::get('/email/verify/{hash}', 'MemberRegistraionController@verifyEmail')->name('public.verify_email');
    Route::post('/email/resend', 'MemberRegistraionController@resendEmailVerification')
        ->middleware('throttle:5,1')
        ->name('public.resend_email_verify');

    Route::group(['middleware' => 'auth:member'], function () {
        Route::get('/dashboard', 'MemberController@dashboard')->name('member.dashboard');
        Route::get('/profile', 'MemberController@profile')->name('member.profile');
        Route::put('/profile','MemberController@updateProfile');
        Route::post('/sendinterest/{memberCode}', 'MemberController@addInterest')->name('member.send_interest');
        Route::post('/addshortlist/{memberCode}', 'MemberController@addShortList')->name('member.add_profile_to_shortlist');
        Route::post('/addignore/{memberCode}', 'MemberController@addIgnore')->name('member.add_profile_to_ignore_list');
        Route::get('/view/{memberCode}', 'MemberController@viewProfile')->name('member.view_profile');
        Route::get('/viewed_profiles', 'MemberController@viewMemberProfileViewed')->name('member.viewed_profile');
        Route::get('/interested_profiles', 'MemberController@viewMemberInterestedProfiles')->name('member.interested_profiles');
        Route::get('/shortlisted_profiles', 'MemberController@viewMemberShortListedProfiles')->name('member.shortlisted_profiles');
        Route::get('/ignored_profiles', 'MemberController@viewMemberIgnoredProfiles')->name('member.ignored_profiles');
        Route::get('/interest_received', 'MemberController@viewInterestReceived')->name('member.interest_received');
        Route::get('/who_viewed_you', 'MemberController@memberViewedYourProfile')->name('member.who_viewed_you');



    });
});

Route::group(['prefix' => 'admin'], function () {
    Auth::routes();

    Route::group(['middleware' => 'auth'], function () {
        Route::get('/', 'HomeController@index')->name('home');
        Route::get('/home', 'HomeController@index')->name('home');

        Route::get('/member/', 'Admin\AdminMemberController@index')->name('admin.member.index');
        Route::get('/member/create', 'Admin\AdminMemberController@create')->name('admin.member.add');
        Route::post('/member/create','Admin\AdminMemberController@createMember');
        Route::get('/member/{member}','Admin\AdminMemberController@edit')->name('admin.member.edit');
        Route::put('/member/{member}','Admin\AdminMemberController@update');
        Route::delete('/member/{member}','Admin\AdminMemberController@delete')->name('admin.member.delete');


        Route::resource('user', 'UserController', ['except' => ['show']]);
        Route::get('profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
        Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
        Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);
    });
});
