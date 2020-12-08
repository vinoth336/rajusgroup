<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateMemberBasicDetailRequest;
use App\Models\Blood;
use App\Models\City;
use App\Models\Degree;
use App\Models\FamilyType;
use App\Models\Member;
use App\Models\MemberEducation;
use App\Models\MemberFamily;
use App\Models\MemberHoroscope;
use App\Models\MemberLocation;
use App\Models\MemberOccupation;
use App\Models\Star;
use App\Models\State;
use App\Models\Zodiac;
use App\Traits\SaveMemberDetails;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AdminMemberController extends Controller
{
    use SaveMemberDetails;

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function create(Request $request)
    {
        $member = new Member();

        return $this->createProfilePage($member, 'basic-details');

    }

    public function index(Request $request)
    {
        $members = Member::get();
        return view('member.list')
        ->with('members', $members);
    }

    public function createMember(Request $request)
    {

        DB::beginTransaction();

        try {
            $member = $this->saveBasicMemberInformation($request, new Member);
            $this->saveEducation($request, $member);
            $this->saveOccupation($request, $member);
            $this->saveFamily($request, $member);
            $this->saveLocation($request, $member);
            $this->saveHoroscope($request, $member);
            $member->checkIsUserCompletedIsProfileEntry();
            DB::commit();
            return redirect()->route('admin.member.index');
        } catch(Exception $e) {
            Log::error('Error Occurred in AdminMemberController@createMember - ' . $e->getMessage());
            return abort(500);
        }
    }

    public function edit(Request $request, $member)
    {
        $member = Member::where('id', $member)->with(['blood', 'mother_tongue'])->first();

        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        return view('member.edit')
            ->with('member', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('activeTab', 'basic-details')
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars);
    }

    public function update(Request $request, Member $member)
    {
        DB::beginTransaction();

        try {
            $member = $this->saveBasicMemberInformation($request, $member);
            $this->saveEducation($request, $member);
            $this->saveOccupation($request, $member);
            $this->saveFamily($request, $member);
            $this->saveLocation($request, $member);
            $this->saveHoroscope($request, $member);
            $member->checkIsUserCompletedIsProfileEntry();

            DB::commit();

            return redirect()->route('admin.member.index')->with('status', 'Updated Successfully');
        } catch(Exception $e) {
            Log::error('Error Occurred in AdminMemberController@update - ' . $e->getMessage());
            return abort(500);
        }
    }

    public function delete(Request $request, Member $member)
    {
        DB::beginTransaction();

        try {
            $member->educations()->delete();
            $member->occupation()->delete();
            $member->family()->delete();
            $member->location()->delete();
            $memberHoroscope = $member->horoscope;
            if($memberHoroscope) {
                $memberHoroscope->unlinkImage($memberHoroscope->image);
                $memberHoroscope->delete();
            }
            $member->unlinkImage($member->profile_photo);
            $member->delete();

            DB::commit();

            return redirect()->route('admin.member.index');
        } catch(Exception $e) {
            Log::error('Error Occurred in AdminMemberController@update - ' . $e->getMessage());
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
        $member->username = $request->username;
        $member->password = $member->password ?? Hash::make('Welcome1');
        $member->save();

        $image = $request->has('profile_photo') ? $request->file('profile_photo') : null;
        $member->storeImage($image, ['width' => 192, 'height' => 192]);
        $member->save();

        return $member;
    }

    public function createProfilePage($member, $activeTab = 'basic-details') {
        $bloodGroup = Blood::orderBy('id')->get();
        $degrees = Degree::get();
        $familyType = FamilyType::get();
        $cities = City::get();
        $memberHoroscope = $member->horoscope ?? optional();
        $states = State::get();
        $rasies = Zodiac::get();
        $stars = Star::get();
        return view('member.create')
            ->with('basicInformation', $member)
            ->with('bloodGroup', $bloodGroup)
            ->with('activeTab', $activeTab)
            ->with('degrees', $degrees)
            ->with('familyType', $familyType)
            ->with('cities', $cities)
            ->with('states', $states)
            ->with('memberHoroscope', $memberHoroscope)
            ->with('rasies', $rasies)
            ->with('stars', $stars)

            ;
    }
}

