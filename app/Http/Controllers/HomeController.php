<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AnneeFormation;
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
    $annesFormation = AnneeFormation::all();
    $activeAnneeFormations = AnneeFormation::active()->get()[0];
    $user = Auth::user();
    if  (session::missing('anneeFormationActive')) {
        session(['anneeFormationActive' => $activeAnneeFormations]);
        }
    session(['user'=>$user]);
    return view('home',compact(['annesFormation']));
    }
public function getAf(){
//get all AF to settings 
    $annesFormation = AnneeFormation::all();
    return view('settings.index',compact(['annesFormation']));
    }
public function setActiveAF(Request $request){
//set active annee formation to front end web sites
        $anneeFormation = AnneeFormation::findOrfail($request->annee_formation_id);
        $anneesFormation=AnneeFormation::all();
        foreach ($anneesFormation as $af) {
            $af->active=0;
            $af->save();
        }
        $anneeFormation->active=1;
        $anneeFormation->save();
        return to_route('home');
    }
public function setActivInSession(Request $request){
//set active annee formation in session
    $request->session()->forget('anneeFormationActive');
    session(['anneeFormationActive'=>AnneeFormation::find($request->annee_formation_id)]);
    return to_route('home');
    }
}
