<?php

namespace App\Http\Controllers\Members;

use App\Http\Controllers\Controller;
use App\Models\Blood;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function index()
    {
        $bloodList = Blood::orderBy('name')->get();

        return view('public.index')
        ->with('bloodList', $bloodList);
    }
}
