<?php

namespace App\Http\Controllers\Members;

use App\Http\Controllers\Controller;
use App\Models\Blood;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function index()
    {
        if(auth()->guard('member')->check()) {
            if(auth()->guard('member')->check()) {

                return redirect()->route('member.dashboard');
            }
        }

        $bloodList = Blood::orderBy('name')->get();

        return view('public.index')
        ->with('bloodList', $bloodList);
    }
}
