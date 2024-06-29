<?php

namespace App\Http\Controllers;


use App\Models\Filiere;
use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;


class FilieresController extends Controller
{

    public function index(Request $request) {
        $filieres = Filiere::all();
        $filieres = $this->refactorManyElements($filieres, 'filieres');
        $sectors = $this->getSectors();
        $formationYears = Year::all();
        return Inertia::render('Back_Office/Filieres/Index', compact('filieres',  'sectors','formationYears'));
    }
    public function create(){
        $sectors = $this->getSectors();
        return Inertia::render('Back_Office/Filieres/Create', compact('sectors'));
    }
    public function store(Request $request){
        $this->storeFiliere($request);
        return to_route("filieres.index");
    }
    public function show(string $id){
        $filiere =   Filiere::findOrFail($id);
        $filiere = $this->refactorFiliere($filiere);
        return Inertia::render('Back_Office/Filieres/Show', compact('filiere'));
    }
    public function edit(string $id) {
        $filiere = Filiere::findOrfail($id);
        $filiere = $this->refactorFiliere($filiere);
        $sectors = $this->getSectors();
        $formationYears = Year::all();
        return Inertia::render('Back_Office/Filieres/Edit', compact('filiere', 'sectors','formationYears'));
    }
    public function update(Request $request, string $id){
        //update fillier
        $filiere = Filiere::findOrFail($id);
        $this->updateFiliere($request, $filiere);
        return to_route("filieres.index");
    }
    public function destroy(string $id) {
        $this->destroyElement(Filiere::class, $id);
        return redirect()->route("filieres.index");
    }
    public function trash(){
        $filieres = Filiere::all();
        $trashedFilieres = Filiere::onlyTrashed()->get();
        return Inertia::render('Back_Office/Filieres/Trash', compact('filieres', 'trashedFilieres'));
    }
    public function forceDelete(string $id)
    {
        $this->forceDeleteData(Filiere::class, $id);
        return to_route("filieres.index");
    }
    public function restore(string $id)
    {
        $this->restoreData(Filiere::class, $id);
        return to_route("filieres.index");
    }
}
