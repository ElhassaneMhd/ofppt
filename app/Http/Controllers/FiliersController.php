<?php

namespace App\Http\Controllers;

use App\Traits\Delete;
use App\Traits\Get;
use App\Traits\Refactor;
use App\Traits\Restore;
use App\Traits\Store;
use App\Models\Filier;
use App\Models\Year;
use App\Traits\Update;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;


class FiliersController extends Controller{
    use  Get,Store,Restore,Delete,Refactor,Update;

     public function index(Request $request){
        $filiers = $this->GetAll('filiers');
        $filiers = $this->refactorManyElements($filiers,'filiers');
        $trashedFiliers = Filier::onlyTrashed()->get();
        return Inertia::render('Filiers/Index', [$filiers,$trashedFiliers]);
    }

    public function create(){
        return Inertia::render('Filiers/Create');
    }

    public function store(Request $request){
    //store filier in DB
            $filier = new Filier();
            $filier->title = $request->title;
            $filier->details = $request->description;
            $filier->max_stagiaires = $request->max_stagiaires;
            $filier->active = $request->Active;
            $filier->visibility =true;
            $filier->user_id = auth()->user()->id;
            $filier->secteur_id = $request->secteur;
            $filier->year_id = Session::get('YearActive')->id;
            $filier->save();
    //STORE filier files
            if ($request->has('images') && count($request->images) > 0) {
            foreach ($request->images as $image) {
                $imageURL =$image->getClientOriginalName();
                $filier->files()->create([
                    'nom'=>$request->title,
                    'taille'=> 11,
                    'emplacement'=>public_path('images/filier'),
                    'URL'=>$imageURL,
                ]);
                $image->move('../public_html/images/filier',$imageURL);
            }
            }
    //store tags
            if ($request->has('tags') ) {
                foreach (explode(' ', $request->tags ) as $tag) {
                    $filier->tags()->create([
                        'name'=>$tag,
                    ]);
                }
            }
            return to_route("filiers.index");
        }
    public function show(string $id){
        $filier =   Filier::findOrFail($id);
        $filier = $this->refactorFilier($filier);
        return Inertia::render('Filiers/Show',[$filier]);
    }
    public function edit(string $id) {
        $filier = Filier::findOrfail($id);
        $filier = $this->refactorFilier($filier);
        return Inertia::render('Filiers/Show',[$filier]);
    }
    public function update(Request $request, string $id) {
    //update fillier
        $filier = Filier::findOrFail($id);
        $this->updateFilier($request,$filier );
        return to_route("filiers.index");
    }
    public function destroy(string $id)  {
        $this->destroyElement(Filier::class, $id);
        return redirect()->route("filiers.index");
    }
    public function trash() {
        $filiers = Filier::all();
        $trashedFiliers = Filier::onlyTrashed()->get();
        return Inertia::render('Filiers/Trash',[$filiers,$trashedFiliers]);
    }
    public function forceDelete(string $id) {
        $this->forceDeleteData(Filier::class, $id);
        return to_route("filiers.index");
    }
    public function restore(string $id) {
        $this->restoreData(Filier::class, $id);
        return to_route("filiers.index");
    }
}
