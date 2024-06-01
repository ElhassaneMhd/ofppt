<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\PieceJointe;
use App\Models\Categorie;
use App\Models\AnneeFormation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Requests\EventsRequest;
use Illuminate\Support\Facades\Session;
use App\Traits\filterTrait;
use App\Traits\destroyTrait;
use App\Traits\forceDeleteTrait;
use App\Traits\restoreTrait;

class EvenementsController extends Controller{

use filterTrait;
use destroyTrait;
use forceDeleteTrait;
use restoreTrait;

public function __construct(){
    $this->middleware('auth');
}  
public function index(Request $request){
        $rowsNum = $request->rowsNum ? $request->rowsNum : 5;
        $sort = $request->sort ? $request->sort : null;
        $allPubliee = Evenement::all();
        $anneeFormation = [];
        foreach ($allPubliee as $article) {
            array_push($anneeFormation,$article->AnneeFormations);
        }
        $anneeFormation=array_unique($anneeFormation);
        $categorie = Categorie::all();
        $allTrashed = Evenement::onlyTrashed()->get();
        $publieeEvenements = Evenement::paginate(5);
        $trashedEvenements = Evenement::onlyTrashed()->paginate(5);
        $places = Evenement::groupBy('titre')->pluck('titre')->all();
        return view("evenements.evenements", compact(["publieeEvenements","trashedEvenements", 'allPubliee', "allTrashed","anneeFormation",'categorie', 'rowsNum', 'sort', 'places']));
    }

public function create(){
        $AnneeFormation = AnneeFormation::all();
        $activeAnneeFormations = AnneeFormation::active()->get()[0];
        if  (session::missing('anneeFormationActive')) {
        session(['anneeFormationActive' => $activeAnneeFormations]);
        }
        return view("evenements.ajouter_evenement",compact(['AnneeFormation']));
    }

public function store(EventsRequest $request){
//store evenement in DB
        $description = $request->description;
    $dom = new DOMDocument();
    $dom->loadHTML($description, 9);
        
    $images = $dom->getElementsByTagName('img');

        foreach ($images as $key => $img) {
            
            $data = base64_decode(explode(',',explode(';', $img->getAttribute('src'))[1])[1]);
            $image_name = "/storage/upload/" . explode('.', $img->getAttribute('data-filename'))[0] . time() . '.png';
            file_put_contents(public_path() .  $image_name, $data);
            $img->removeAttribute('src');
            $img->setAttribute('src', $image_name);
        }
        $description = $dom->saveHTML();
        
        $evenement = new Evenement();
        $evenement->titre = $request->titre;
        $evenement->details = $description;
        $evenement->date = $request->date_evenement;
        $evenement->lieu = $request->lieu;
        $evenement->duree = $request->duree;
        $evenement->etat = $request->etat;   
        $evenement->user_id = auth()->user()->id;
        $evenement->visibility =true;
        $evenement->annee_formation_id = Session::get('anneeFormationActive')->id;
        $evenement->save();
//store event's files
        if ($request->hasfile('images') && count($request->images) > 0) {
            foreach ($request->images as $image) {
                $imageURL =$image->getClientOriginalName();
                $evenement->pieceJointes()->create([
                    'nom'=>$request->titre,
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
        return view('evenements.show_evenement', compact( 'evenement'));
    }
public function cacher(Request $request ,string $id){
//afficher & cacher evenemet
    $evenement = Evenement::findOrFail($id);
    if($evenement->visibility==='1'){ 
        $evenement->visibility=0;
    }else{
        $evenement->visibility=1;
    }
    $evenement->save();
    return to_route('evenements.index');
    }
public function edit(string $id){
//get element by id to modify it
        $evenement = Evenement::findOrFail($id);
        $anneeFormation = AnneeFormation::all();
        return view('evenements.edit_evenement', compact('evenement','anneeFormation'));
    }

public function update(Request $request, string $id) {
       // dd($request->all());
//update event info
        $evenement = Evenement::findOrFail($id);
        $evenement->titre = $request->titre;
        $evenement->details = $request->description;
        $evenement->date = $request->date_evenement;
        $evenement->lieu = $request->lieu;
        $evenement->duree = $request->duree;
        $evenement->etat = $request->etat;
        $evenement->annee_formation_id = $request->annee_formation;
        $evenement->save();
//modify old files
         if ($request->has('oldImages')){
            foreach($evenement->pieceJointes as $pj) {
                if (in_array( $pj->id, $request->oldImages)===false){
                    $filePath = public_path('images/evenement/'. $pj->URL);
                    if (File::exists($filePath)) {
                        File::delete($filePath);
                    }
                   $pj->delete();
                }
            }
        } else {
            foreach($evenement->pieceJointes as $pj) {$pj->delete();}
        }
//add new files
        if ($request->hasfile('images') && count($request->images) > 0) {
            foreach ($request->images as $image) {
                $imageURL =$image->getClientOriginalName();
                $evenement->pieceJointes()->create([
                    'nom'=>$request->titre,
                    'taille'=> 11,
                    'emplacement'=>public_path('images/evenement'),
                    'URL'=>$imageURL,
                ]);
                $image->move('../public_html/images/evenement',$imageURL);
            }   
        }
    return redirect()->route('evenements.index');

    }

public function destroy(string $id) {
    //move event to trash

    $this->destroyData(Evenement::class, $id);

    return redirect()->route('evenements.index');

    }
   
public function filter(Request $request){
    return $this->filterData($request, Evenement::class);
}    

public function trash(){
//index of trashed events
        $allPubliee = Evenement::all();
        $allTrashed = Evenement::onlyTrashed()->get();
        $user = Auth::user();
        $publieeEvents = Evenement::paginate(5);
        $trashedEvents = Evenement::onlyTrashed()->paginate(5);
        return view('evenements.trash', compact(['publieeEvents','trashedEvents','user','allPubliee', 'allTrashed']));
    }
public function forceDelete(string $id){
        //Force delete from trash 
        
        $this->forceDeleteData(Evenement::class, $id, "evenement");

        return redirect()->route('evenements.trash');
    }
public function restore(string $id){
        //restore events from trash

        $this->restoreData(Evenement::class, $id);

        return redirect()->route('evenements.index');
    }
}
