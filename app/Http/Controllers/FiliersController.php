<?php

namespace App\Http\Controllers;

use App\Models\Filier;
use App\Models\AnneeFormation;
use App\Models\Secteur;
use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Requests\FiliersRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Traits\filterTrait;
use App\Traits\destroyTrait;
use App\Traits\forceDeleteTrait;
use App\Traits\restoreTrait;


class FiliersController extends Controller{

use filterTrait;
use destroyTrait;
use forceDeleteTrait;
use restoreTrait;

public function __construct(){
    $this->middleware('auth');
}
public function index(Request $request)
    {
        $rowsNum = $request->rowsNum ? $request->rowsNum : 5;
        $sort = $request->sort ? $request->sort : null;
        $allPubliee = Filier::all();
        $anneeFormation = [];
        foreach ($allPubliee as $article) {
            array_push($anneeFormation,$article->AnneeFormations);
        }
        $anneeFormation=array_unique($anneeFormation);
        $categorie = Categorie::all();
        $allTrashed = Filier::onlyTrashed()->get();
        $publieeFiliers = Filier::paginate(5);
        $trashedFiliers = Filier::onlyTrashed()->paginate(5);
        $secteurs = Secteur::all();
        return view("filiers.filiers", compact(["publieeFiliers","trashedFiliers", 'allPubliee', 'allTrashed','anneeFormation','categorie', 'rowsNum', 'sort', 'secteurs']));
    }

public function create(){
     $activeAnneeFormations = AnneeFormation::active()->get()[0];
     $secteurs =Secteur::all();
        if  (session::missing('anneeFormationActive')) {
        session(['anneeFormationActive' => $activeAnneeFormations]);
        }
        $AnneeFormation = AnneeFormation::all();
        return view("filiers.ajouter_filier",compact(['AnneeFormation','secteurs']));
    }

public function store(FiliersRequest $request){
//store filier in DB
        $filier = new Filier();
        $filier->titre = $request->titre;
        $filier->details = $request->description;
        $filier->max_stagiaires = $request->max_stagiaires;
        $filier->active = $request->Active;
        $filier->visibility =true;
        $filier->user_id = auth()->user()->id;
        $filier->secteur_id = $request->secteur;
        $filier->annee_formation_id = Session::get('anneeFormationActive')->id;
        $filier->save();     
//STORE filier files
        if ($request->has('images') && count($request->images) > 0) {
        foreach ($request->images as $image) {
            $imageURL =$image->getClientOriginalName();
            $filier->pieceJointes()->create([
                'nom'=>$request->titre,
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
public function show(string $id)
    {
        $filier =   Filier::findOrFail($id);
        $pieceJointes=$filier->pieceJointes;
        $anneeFormation=$filier->AnneeFormations;
        $secteur=$filier->Secteur      ;
          return view('filiers.show_filier', compact( ['filier','anneeFormation','pieceJointes','secteur']));

    }

    public function edit(string $id) {
        $filier = Filier::findOrfail($id);
        $anneeFormation = AnneeFormation::all();
        $pieceJointes =$filier->pieceJointes;
        return view("filiers.edit_filier", compact("filier",'anneeFormation','pieceJointes'));
    }
public function cacher(Request $request ,string $id){
//casher Filier
    $filier = Filier::findOrFail($id);
    if($filier->visibility==='1'){ 
        $filier->visibility=0;
    }else{
        $filier->visibility=1;
    }
    $filier->save();
    return to_route('filiers.index');
    }

public function update(FiliersRequest $request, string $id) {
//update fillier
        $filier = Filier::findOrfail($id);
        $filier->titre = $request->titre;
        $filier->details = $request->description;
        $filier->max_stagiaires = $request->max_stagiaires;
        $filier->active = $request->active;
        $filier->annee_formation_id = $request->annee_formation;
//modify old files
        if ($request->has('oldImages')){
            foreach($filier->pieceJointes as $pj) {
                if (in_array( $pj->id, $request->oldImages)===false){
                    $filePath = public_path('images/fillier/'. $pj->URL);
                    if (File::exists($filePath)) {
                        File::delete($filePath);
                    }
                    $pj->delete();
                }
            }
        } else {
            foreach($filier->pieceJointes as $pj) {$pj->delete();}
        }
        $filier->save();
//add new files
        if ($request->hasfile('images') && count($request->images) > 0) {
            foreach ($request->images as $image) {
                $imageURL =$image->getClientOriginalName();
                $filier->pieceJointes()->create([
                    'nom'=>$request->titre,
                    'taille'=> 11,
                    'emplacement'=>public_path('images/fillier'),
                    'URL'=>$imageURL,
                ]);
              $image->move('../public_html/images/filier',$imageURL);
            }   
        }
        return redirect()->route("filiers.index");
    }
public function destroy(string $id)  {
        //move filier to trash

        $this->destroyData(Filier::class, $id);

        return redirect()->route("filiers.index");
    }

public function filter(Request $request){

    return $this->filterData($request, Filier::class);
    
}

public function trash() {
//index of trashed filier
        $allPubliee = Filier::all();
        $allTrashed = Filier::onlyTrashed()->get();
        $user = Auth::user();
        $activeAnneeFormations = AnneeFormation::active()->get()[0];
        $publieeFiliers = Filier::paginate(5);
        $trashedFiliers = Filier::onlyTrashed()->paginate(5);
        return view('filiers.trash', compact(['publieeFiliers','trashedFiliers','user','activeAnneeFormations', 'allPubliee', 'allTrashed']));
    }
public function forceDelete(string $id) {
        //forcee delete from trash
        
        $this->forceDeleteData(Filier::class, $id, 'filier');

        return redirect()->route('filiers.trash');
    }
public function restore(string $id) {
        //restore from trash

        $this->restoreData(Filier::class, $id);

        return redirect()->route('filiers.index');

    }
}
