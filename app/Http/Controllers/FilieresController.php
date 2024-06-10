<?php

namespace App\Http\Controllers;

use App\Traits\Delete;
use App\Traits\Get;
use App\Traits\Refactor;
use App\Traits\Restore;
use App\Traits\Store;
use App\Models\Filiere;
use App\Models\Year;
use App\Traits\Update;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;


class FilieresController extends Controller{
    use  Get,Store,Restore,Delete,Refactor,Update;

    public function index(Request $request){
        $filieres = Filiere::all();
        $filieres = $this->refactorManyElements($filieres,'filieres');
        $trashedFilieres = Filiere::onlyTrashed()->get();
        return Inertia::render('Filieres/Index', compact('filieres','trashedFilieres'));
    }

    public function create(){
        return Inertia::render('Filieres/Create');
    }

    public function store(Request $request){
    //store filiere in DB
            $filiere = new Filiere();
            $filiere->title = $request->title;
            $filiere->details = $request->description;
            $filiere->max_stagiaires = $request->max_stagiaires;
            $filiere->active = $request->Active;
            $filiere->visibility =true;
            $filiere->user_id = auth()->user()->id;
            $filiere->secteur_id = $request->secteur;
            $filiere->year_id = Session::get('YearActive')->id;
            $filiere->save();
    //STORE filiere files
            if ($request->has('images') && count($request->images) > 0) {
            foreach ($request->images as $image) {
                $imageURL =$image->getClientOriginalName();
                $filiere->files()->create([
                    'nom'=>$request->title,
                    'taille'=> 11,
                    'emplacement'=>public_path('images/filiere'),
                    'URL'=>$imageURL,
                ]);
                $image->move('../public_html/images/filiere',$imageURL);
            }
            }
    //store tags
            if ($request->has('tags') ) {
                foreach (explode(' ', $request->tags ) as $tag) {
                    $filiere->tags()->create([
                        'name'=>$tag,
                    ]);
                }
            }
            return to_route("filieres.index");
        }
    public function show(string $id){
        $filiere =   Filiere::findOrFail($id);
        $filiere = $this->refactorFiliere($filiere);
        return Inertia::render('Filieres/Show',[$filiere]);
    }
    public function edit(string $id) {
        $filiere = Filiere::findOrfail($id);
        $filiere = $this->refactorFiliere($filiere);
        return Inertia::render('Filieres/Show',[$filiere]);
    }
    public function update(Request $request, string $id) {
    //update fillier
        $filiere = Filiere::findOrFail($id);
        $this->updateFiliere($request,$filiere );
        return to_route("filieres.index");
    }
    public function destroy(string $id)  {
        $this->destroyElement(Filiere::class, $id);
        return redirect()->route("filieres.index");
    }
    public function trash() {
        $filieres = Filiere::all();
        $trashedFilieres = Filiere::onlyTrashed()->get();
        return Inertia::render('Filieres/Trash',[$filieres,$trashedFilieres]);
    }
    public function forceDelete(string $id) {
        $this->forceDeleteData(Filiere::class, $id);
        return to_route("filieres.index");
    }
    public function restore(string $id) {
        $this->restoreData(Filiere::class, $id);
        return to_route("filieres.index");
    }
}
