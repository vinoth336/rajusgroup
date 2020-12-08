<?php

namespace App\Http\Controllers\Members;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Blood;
use App\Models\City;
use App\Models\Degree;
use App\Models\FamilyType;
use App\Models\Member;
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
        $profiles = $this->getProfiles($request, $member);

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
            ;
    }

    public function getProfiles(Request $request, $member)
    {
        $profiles = Member::whereNotIn('id', [$member->id])
        ->where('gender', '!=', $member->gender);

        return $profiles->get();
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

        return view('public.user.profile')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars);
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
