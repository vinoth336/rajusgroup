<?php

namespace App\Http\Controllers\Members;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Blood;
use App\Models\City;
use App\Models\Degree;
use App\Models\EmployeeIn;
use App\Models\FamilyType;
use App\Models\Member;
use App\Models\MemberViewedProfile;
use App\Models\Star;
use App\Models\State;
use App\Models\Zodiac;
use App\Traits\SaveMemberDetails;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MemberController extends Controller
{
    use SaveMemberDetails;

    protected $redirectTo = '/';

    public function __construct()
    {
    }

    public function dashboard(Request $request)
    {
        $member = auth()->user();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $profiles = $this->getProfiles($request, $member)->get();
        $employeeIns = EmployeeIn::orderBy('name')->get();

        return view('public.user.dashboard')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)
            ->with('profiles', $profiles)
            ->with('employeeIns', $employeeIns)
            ->with('showShortListButton', true)
            ->with('showSendInterestButton', true)
            ->with('showIgnoreButton', true)
            ;
    }

    public function getProfiles(Request $request, $member)
    {
        $profiles = Member::whereNotIn('id', [$member->id])
        ->doesnthave('interest_sent_profiles')
        ->where('gender', '!=', $member->gender)->with(['educations' => function($model) {
            $model->with('degree');
        }, 'occupation', 'location'])->inRandomOrder();

        return $profiles;
    }

    public function profile(Request $request)
    {
        $member = auth()->user();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $employeeIns = EmployeeIn::orderBy('name')->get();


        return view('public.user.profile')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)
            ->with('employeeIns', $employeeIns)
            ;
    }

    public function viewProfile(Request $request, $memberCode)
    {
        $member = auth()->user();
        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $employeeIns = EmployeeIn::orderBy('name')->get();
        $profile = Member::where('id', '!=', $member->id)
            ->where('member_code', '=', $memberCode)->firstOrFail();


        $member->member_viewed_profiles()->updateOrCreate([
            'profile_member_id' => $profile->id
        ]);

        return view('public.user.view_profile')
        ->with('profile', $profile)
        ->with('bloodGroup', $bloodGroup)
        ->with('degrees', $degrees)
        ->with('familyType', $familyType)
        ->with('cities', $cities)
        ->with('states', $states)
        ->with('memberHoroscope', $memberHoroscope)
        ->with('rasies', $rasies)
        ->with('stars', $stars)
        ->with('employeeIns', $employeeIns);
    }

    public function viewMemberProfileViewed(Request $request)
    {
        $member = auth()->user();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $profiles = $member->member_viewed_profiles()->with('member_profile')->orderBy('created_at', 'desc')->get();
        $employeeIns = EmployeeIn::orderBy('name')->get();


        return view('public.user.viewed_profile')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)
            ->with('profiles', $profiles)
            ->with('employeeIns', $employeeIns)
            ->with('showCreatedOn', true)
            ;
    }

    public function viewMemberInterestedProfiles(Request $request)
    {
        $member = auth()->user();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $profiles = $member->interested_profiles()->with('member_profile')->orderBy('created_at', 'desc')->get();
        $employeeIns = EmployeeIn::orderBy('name')->get();


        return view('public.user.interest_sent')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)
            ->with('profiles', $profiles)
            ->with('employeeIns', $employeeIns)
            ->with('showCreatedOn', true)
            ;
    }

    public function viewMemberShortListedProfiles(Request $request)
    {
        $member = auth()->user();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $profiles = $member->shortlisted_profiles()
        ->with('member_profile')->orderBy('created_at', 'desc')->get();
        $employeeIns = EmployeeIn::orderBy('name')->get();


        return view('public.user.shortlisted_profiles')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)
            ->with('profiles', $profiles)
            ->with('employeeIns', $employeeIns)
            ->with('showCreatedOn', true);
    }

    public function viewMemberIgnoredProfiles(Request $request)
    {
        $member = auth()->user();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $profiles = $member->ignored_profiles()
        ->with('member_profile')->orderBy('created_at', 'desc')->get();
        $employeeIns = EmployeeIn::orderBy('name')->get();


        return view('public.user.ignored_profiles')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)
            ->with('profiles', $profiles)
            ->with('employeeIns', $employeeIns)
            ->with('showCreatedOn', true);
    }

    public function viewInterestReceived(Request $request)
    {
        $member = auth()->user();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $profiles = $member->interest_received()->with('member')->orderBy('created_at', 'desc')->get();
        $employeeIns = EmployeeIn::orderBy('name')->get();

        return view('public.user.interest_received')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)
            ->with('profiles', $profiles)
            ->with('employeeIns', $employeeIns)
            ->with('showCreatedOn', true);
    }

    public function memberViewedYourProfile(Request $request)
    {
        $member = auth()->user();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        $profiles = $member->member_profile_viewed()->with('member')->orderBy('created_at', 'desc')->get();
        $employeeIns = EmployeeIn::orderBy('name')->get();

        return view('public.user.who_viewed_profiles')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)
            ->with('profiles', $profiles)
            ->with('employeeIns', $employeeIns)
            ->with('showCreatedOn', true);
    }


    public function updateProfile(Request $request)
    {
        DB::beginTransaction();

        try {
            $member = auth()->user();
            $member = $this->saveBasicMemberInformation($request, $member);
            $this->saveEducation($request, $member);
            $this->saveOccupation($request, $member);
            $this->saveFamily($request, $member);
            $this->saveLocation($request, $member);
            $this->saveHoroscope($request, $member);
            $member->checkIsUserCompletedIsProfileEntry();
            DB::commit();

            return redirect()->route('member.profile')->with('status', 'Updated Successfully');
        } catch(Exception $e) {
            Log::error('Error Occurred in MemberController@updateProfile - ' . $e->getMessage());
            return abort(500);
        }

    }

    public function addInterest(Request $request, $memberCode)
    {
        DB::beginTransaction();

        try {
            $member = auth()->user();
            $intrestedMember = Member::where('id', '!=', $member->id)
            ->where('member_code', '=', $memberCode)->firstOrFail();
            $interestedProfile = $member->interested_profiles()->updateOrCreate(['profile_member_id' => $intrestedMember->id]);
            $interestedProfile->request_status = PROFILE_REQUEST_PENDING;
            $interestedProfile->profile_status = PROFILE_INTEREST;

            $interestedProfile->save();

            DB::commit();

            return response(['status' => 'success', 'msg' => 'Added Successfully']);

        }  catch(Exception $e) {
            Log::error('Error Occurred in MemberController@addInterest - ' . $e->getMessage());
            return abort(500);
        }
    }

    public function addShortList(Request $request, $memberCode)
    {
        DB::beginTransaction();

        try {
            $member = auth()->user();
            $intrestedMember = Member::where('id', '!=', $member->id)
            ->where('member_code', '=', $memberCode)->firstOrFail();
            $interestedProfile = $member->interested_profiles()->updateOrCreate(['profile_member_id' => $intrestedMember->id]);
            $interestedProfile->request_status = null;
            $interestedProfile->profile_status = PROFILE_SHORTLIST;
            $interestedProfile->save();

            DB::commit();

            return response(['status' => 'success', 'msg' => 'Added Successfully']);

        }  catch(Exception $e) {
            Log::error('Error Occurred in MemberController@addShortList - ' . $e->getMessage());
            return abort(500);
        }
    }

    public function addIgnore(Request $request, $memberCode)
    {
        DB::beginTransaction();

        try {
            $member = auth()->user();
            $intrestedMember = Member::where('id', '!=', $member->id)
            ->where('member_code', '=', $memberCode)->firstOrFail();
            $interestedProfile = $member->interested_profiles()->updateOrCreate(['profile_member_id' => $intrestedMember->id]);
            $interestedProfile->request_status = null;
            $interestedProfile->profile_status = PROFILE_IGNORED;

            $interestedProfile->save();

            DB::commit();

            return response(['status' => 'success', 'msg' => 'Added Successfully']);

        }  catch(Exception $e) {
            Log::error('Error Occurred in MemberController@addShortList - ' . $e->getMessage());
            return abort(500);
        }
    }

    public function saveBasicMemberInformation(Request $request, Member $member)
    {
        $member->first_name = $request->first_name;
        $member->last_name = $request->last_name;
        $member->dob = $request->dob;
        $member->blood_id = $request->blood;
        $member->gender = $request->gender;
        $member->religion = $request->religion;
        $member->mother_tongue_id = $request->mother_tongue;
        $member->email = $request->email;
        $member->phone_no = $request->phone_no;
        $member->save();

        $image = $request->has('profile_photo') ? $request->file('profile_photo') : null;
        $member->storeImage($image, ['width' => 192, 'height' => 192]);
        $member->save();

        return $member;
    }

}
