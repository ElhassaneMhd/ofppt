<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use App\Traits\Refactor;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DemandController extends Controller
{
    use Refactor;
    public function index()   {
        $demands = Demand::all();
        $demands = $this->refactorManyElements($demands,'demands');
        return Inertia::render('Demands/Index', compact('demands'));
    }
    public function trash(){
        $demands =Demand::onlyTrashed()->get();
        return Inertia::render('Demands/Trash', compact('demands'));
    }
    public function storeDemand(Request $request){
        $validatedData = $request->validate([
            'name' => 'required',
            "email" => 'required',
            'subject' => 'required',
            'phoneNumber' => 'required',
            'details' => 'required'
        ]);
        if ($validatedData) {
            Demand::create($validatedData);
            return response()->json(["status" => "succsses", "message" => "demand sended"]);
        }
    }
    public function show(Demand $demand){
        $demand = $this->refactorDemand($demand);
        return Inertia::render('Demands/Show', compact('demand'));
    }
    public function destroy(Demand $demand)
    {
        $demand->delete();
        return to_route('demands.index');
    }
    public function restore($id){
        $demand=Demand::onlyTrashed()->findOrFail($id);
        $demand->restore();
        $demands=Demand::onlyTrashed()->get();
        return Inertia::render('Demands/Trash', compact('demands'));
    }
}
