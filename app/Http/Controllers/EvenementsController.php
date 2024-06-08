<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\File ;
use App\Models\Year;
use Illuminate\Http\Request;
use App\Traits\Delete;
use App\Traits\Get;
use App\Traits\Restore;
use App\Traits\Store;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class EvenementsController extends Controller{
    use  Get,Store,Restore,Delete;
    public function index(Request $request){
            $Events = Evenement::all();
            $trashedEvents = Evenement::onlyTrashed()->get();
            return Inertia::render('Events/Index', [$Events,$trashedEvents]);
        }
    public function create(){
            $years = Year::all();
            $activeYear = Year::active()->get()[0];
            if  (session::missing('YearActive')) {
            session(['YearActive' => $activeYear]);
            }
            return Inertia::render('Events/Index', [$years]);
        }
    public function store(Request $request){

            $evenement = new Evenement();
            $evenement->title = $request->title;
            $evenement->details = $request->description;
            $evenement->date = $request->date_evenement;
            $evenement->location = $request->location;
            $evenement->duree = $request->duree;
            $evenement->status = $request->status;   
            $evenement->user_id = auth()->user()->id;
            $evenement->visibility =true;
            $evenement->year_id = Session::get('YearActive')->id;
            $evenement->save();
    //store event's files
            if ($request->hasfile('images') && count($request->images) > 0) {
                foreach ($request->images as $image) {
                    $imageURL =$image->getClientOriginalName();
                    $evenement->files()->create([
                        'nom'=>$request->title,
                        'taille'=> 11,
                        'emplacement'=>public_path('images/evenement'),
                        'URL'=>$imageURL,
                    ]);
                        $image->move('../public_html/images/evenement',$imageURL);

                }   
            }
    //store tags 
            if ($request->has('tags') ) {
                foreach (explode(' ', $request->tags ) as $tag) {
                    $evenement->tags()->create([
                        'name'=>$tag,
                    ]);
                }   
            }
        return redirect()->route('evenements.index');

        }
    public function show(string $id){
    //show evenemt by ID
        $evenement = Evenement::findOrFail($id);
        return Inertia::render('Events/Show', [$evenement]);
    }
    public function edit(string $id){
    //get element by id to modify it
            $evenement = Evenement::findOrFail($id);
            $year = Year::all();
            return Inertia::render('Events/Edit', [$year,$evenement]);

        }
    public function update(Request $request, string $id) {
        // dd($request->all());
    //update event info
            $evenement = Evenement::findOrFail($id);
            $evenement->title = $request->title;
            $evenement->details = $request->description;
            $evenement->date = $request->date_evenement;
            $evenement->location = $request->location;
            $evenement->duree = $request->duree;
            $evenement->status = $request->status;
            $evenement->year_id = $request->year;
            $evenement->save();
    //modify old files
            if ($request->has('oldImages')){
                foreach($evenement->files as $pj) {
                    if (in_array( $pj->id, $request->oldImages)===false){
                        $filePath = public_path('images/evenement/'. $pj->URL);
                        if (File::exists()) {
                            File::delete();
                        }
                    $pj->delete();
                    }
                }
            } else {
                foreach($evenement->files as $pj) {$pj->delete();}
            }
    //add new files
            if ($request->hasfile('images') && count($request->images) > 0) {
                foreach ($request->images as $image) {
                    $imageURL =$image->getClientOriginalName();
                    $evenement->files()->create([
                        'nom'=>$request->title,
                        'taille'=> 11,
                        'emplacement'=>public_path('images/evenement'),
                        'URL'=>$imageURL,
                    ]);
                    $image->move('../public_html/images/evenement',$imageURL);
                }   
            }
            return Inertia::render('Events/Show', [$evenement]);

        }
    public function destroy(string $id) {
        //move event to trash

        $this->destroyElement(Evenement::class, $id);

        return redirect()->route('evenements.index');

        }   
    public function trash(){
    //index of trashed events
            $evenements = Evenement::all();
            $trashedEvenements = Evenement::onlyTrashed()->get();
            return Inertia::render('Events/Show', [$evenements,$trashedEvenements]);
        }
    public function forceDelete(string $id){
            //Force delete from trash  
            $this->forceDeleteData(Evenement::class, $id);
            return redirect()->route('evenements.trash');
        }
    public function restore(string $id){
        //restore events from trash
        $this->restoreData(Evenement::class, $id);
        return redirect()->route('evenements.index');
    }
}
