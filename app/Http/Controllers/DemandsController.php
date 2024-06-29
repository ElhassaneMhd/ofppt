<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use Inertia\Inertia;


class DemandsController extends Controller
{
    public function index()   {
        $demands = Demand::all();
        $demands = $this->refactorManyElements($demands,'demands');
        return Inertia::render('Back_Office/Demands/Index', compact('demands'));
    }
    public function trash(){
        $demands =Demand::onlyTrashed()->get();
        return Inertia::render('Back_Office/Demands/Trash', compact('demands'));
    }
    public function show(Demand $demand){
        $demand = $this->refactorDemand($demand);
        return Inertia::render('Back_Office/Demands/Show', compact('demand'));
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
        return Inertia::render('Back_Office/Demands/Trash', compact('demands'));
    }
}
