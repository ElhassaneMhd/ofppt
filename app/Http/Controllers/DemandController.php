<?php

namespace App\Http\Controllers;

use App\Models\Demand;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DemandController extends Controller
{
    public function index()
    {
        $demands = Demand::all();
        return Inertia::render('Demands/Index', compact('demands'));
    }
    public function trash()
    {
        $demands = Demand::onlyTrashed()->get();
        return Inertia::render('Demands/Trash', [$demands]);
    }
    public function storeDemand(Request $request)
    {
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
    public function show(Demand $demand)
    {
        return Inertia::render('Demands/Show', [$demand]);
    }
    public function edit(Demand $demand)
    {
        return Inertia::render('Demands/Edit', [$demand]);
    }
    public function destroy(Demand $demand)
    {
        $demand->delete();
        $demands = Demand::all();
        return view('demands.demands', compact('demands'));
    }
    public function restore($id)
    {
        $demand = Demand::onlyTrashed()->findOrFail($id);
        $demand->restore();
        $demands = Demand::onlyTrashed()->get();
        return view('demands.trash', compact('demands'));
    }
}
