<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Year;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
// Retrieve the currently authenticated user...

class HomeController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
public function index(Request $request){
//home view
    $year = Year::all();
    $activeYears = Year::active()->get()[0];
    $user = Auth::user();
    if  (session::missing('YearActive')) {
        session(['YearActive' => $activeYears]);
        }
    session(['user'=>$user]);
    return view('home',compact(['year']));
    }
public function getAf(){
//get all AF to settings 
    $year = Year::all();
    return view('settings.index',compact(['year']));
    }
public function setActiveAF(Request $request){
//set active year formation to front end web sites
        $Year = Year::findOrfail($request->year_id);
        $years=Year::all();
        foreach ($years as $af) {
            $af->active=0;
            $af->save();
        }
        $Year->active=1;
        $Year->save();
        return to_route('home');
    }
public function setActivInSession(Request $request){
//set active year formation in session
    $request->session()->forget('YearActive');
    session(['YearActive'=>Year::find($request->year_id)]);
    return to_route('home');
    }
}
