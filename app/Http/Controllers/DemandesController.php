<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use App\Http\Requests\DemandeRequest;
use Illuminate\Http\Request;


class DemandesController extends Controller
{
    public function index()   {
        $demandes = Demande::all();
        return view('demandes.demandes',compact('demandes'));
    }
      public function trash(){
        $demandes =Demande::onlyTrashed()->get();
        return view('demandes.trash',compact('demandes'));
    }
    public function storeDemande(Request $request){
           $validatedData = $request->validate([
            'name' => 'required',
            "email" => 'required',
            'subject' => 'required',
            'phoneNumber' => 'required',
            'details' => 'required'
        ]);
        if ($validatedData){
            Demande::create($validatedData);
            return response()->json(["status"=>"succsses","message"=>"demande sended"]);
        }
    }
    public function show(Demande $demande){
        return view('demandes.show',compact('demande'));
    }
    public function destroy(Demande $demande){
        $demande->delete();
        $demandes = Demande::all();
        return view('demandes.demandes',compact('demandes'));
    } 
    public function restore($id){
        $demande=Demande::onlyTrashed()->findOrFail($id);
        $demande->restore();
        $demandes=Demande::onlyTrashed()->get();
        return view('demandes.trash',compact('demandes'));
    }
}
