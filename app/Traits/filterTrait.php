<?php 
namespace App\Traits;

use App\Models\User;
use App\Models\Filier;
use App\Models\Article;
use App\Models\Secteur;
use App\Models\Categorie;
use App\Models\Evenement;
use App\Models\AnneeFormation;

trait filterTrait {
    protected function filterData($request, $model)
    {   
        $rowsNum = $request->rowsNum ? $request->rowsNum : 5;
        $sort = $request->sort ? $request->sort : null;
        $searchedValue = $request->search ? $request->search : null;
        $allCategories = Categorie::all();
        $categorie = Categorie::all();
        $anneeFormation = AnneeFormation::all();

        switch($model){
            case 'App\Models\Article':
                $filteredData = $model::where('id', '>', '0');
                $searchedValue = $request->search ? $request->search : '';
                $allPubliee = Article::all();
                $admins = User::all();
                $allTrashed = Article::onlyTrashed()->get();
                $publieeArticles = Article::paginate($rowsNum)->withQueryString();
                $trashedArticles = Article::onlyTrashed()->paginate($rowsNum)->withQueryString();
                $date_from;
                $date_to;

                if (!$request->categorie && !$request->auteur && (!$request->date_from || !$request->date_to) && !$request->search && !$request->annee_formation) return redirect()->back();

                if (isset($searchedValue)){
                    $filteredData = $filteredData->where('titre','like', "%$searchedValue%");
                };

                if (isset($request->categorie)){
                    $valuesContainer = [];
                    foreach ($request->categorie as $key => $value){
                        array_push($valuesContainer, $value);    
                    };
                    $numberedValues = array_map(function ($arrayValue){
                        return (int)$arrayValue;
                    }, $valuesContainer);
                    $filteredData = $filteredData->whereIn("categorie_id", [...$numberedValues]);
                    
                };

                if (isset($request->auteur)){
                    $valuesContainer = [];
                    foreach ($request->auteur as $key => $value){
                        array_push($valuesContainer, $value);    
                    }; 
                    $filteredData = $filteredData->whereIn("user_id", [...$valuesContainer]);
                };

                if (isset($request->date_from) && isset($request->date_to)){
                    $date_from = $request->date_from;
                    $date_to = $request->date_to;
                    $filteredData = $filteredData->whereBetween('date', [$date_from, $date_to]);
                };

                if(isset($request->annee_formation)){
                $filteredData = $filteredData->whereIn('annee_formation_id', [...$request->annee_formation]);
                }

                if(isset($sort)){
                    $filteredData = $filteredData->orderBy('created_at', $sort);
                };
                
                $filteredData = $filteredData->paginate($rowsNum)->withQueryString();
                
                return view("articles.articles", compact(["publieeArticles","trashedArticles", 'allPubliee',"allTrashed", "allCategories", 'filteredData', "rowsNum", "sort", "admins", "anneeFormation"]));
            break;
            case 'App\Models\Evenement':
                $filteredData = Evenement::where('id', '>', 0);
                $allPubliee = Evenement::all();
                $publieeEvenements = Evenement::paginate($rowsNum)->withQueryString();
                $allTrashed = Evenement::onlyTrashed()->get();
                $trashedEvenements = Evenement::onlyTrashed()->paginate($rowsNum)->withQueryString();
                $places = Evenement::groupBy('titre')->pluck('titre')->all();
                $date_from;
                $date_to;

                if (!$request->search && !$request->duree && (!$request->date_from || !$request->date_to) && !$request->lieu && !$request->annee_formation && !$request->etat) return redirect()->back();

                if(isset($request->search)){
                    $filteredData = $filteredData->where('titre', "like", "%$searchedValue%");
                };

                if(isset($request->duree)){
                    $filteredData = $filteredData->where('duree', $request->duree);
                };

                if(isset($request->lieu)){
                    $filteredData = $filteredData->whereBetween('lieu', [...$request->lieu]);
                };

                if(isset($request->annee_formation)){
                    $filteredData = $filteredData->whereBetween('annee_formation', [...$request->annee_formation]);
                };

                if(isset($request->date_from) && isset($request->date_to)){
                    $date_from = $request->date_from;
                    $date_to = $request->date_to;
                    $filteredData = $filteredData->whereBetween('date', [$date_from, $date_to]);
                };

                if(isset($request->etat)){
                    $filteredData = $filteredData->where('etat', $request->etat);
                };

                if(isset($sort)){
                    $filteredData = $filteredData->orderBy('created_at', $sort);
                };

                $filteredData = $filteredData->paginate($rowsNum)->withQueryString();

                return view("evenements.evenements", compact(["publieeEvenements","trashedEvenements", 'allPubliee', "allTrashed","anneeFormation",'categorie', 'rowsNum', 'sort', 'places', 'filteredData']));
            break;
            case 'App\Models\Filier':
                $filteredData = Filier::where('id', '>', 0);
                $allPubliee = Filier::all();
                $allTrashed = Filier::onlyTrashed()->get();
                $publieeFiliers = Filier::paginate($rowsNum)->withQueryString();
                $trashedFiliers = Filier::onlyTrashed()->paginate($rowsNum)->withQueryString();
                $secteurs = Secteur::all();

                if(isset($request->search)){
                $filteredData = $filteredData->where('titre', 'like', $searchedValue);
                };

                if(isset($request->max_stagiaires)){
                $filteredData = $filteredData->where('max_stagiaires', '<=', $request->max_stagiaires);
                };

                if(isset($request->inscription)){
                $filteredData = $filteredData->where('active', $request->inscription);
                };

                if(isset($request->secteur)){
                $filteredData = $filteredData->whereIn('secteur_id', [...$request->secteur]);
                };

                if(isset($request->annee_formation)){
                $filteredData = $filteredData->whereIn('annee_formation_id', [...$request->annee_formation]);
                };

                if(isset($sort)){
                $filteredData = $filteredData->orderBy('created_at', $sort);
                };    

                $filteredData = $filteredData->paginate($rowsNum)->withQueryString();
                
                return view("filiers.filiers", compact(["publieeFiliers","trashedFiliers", 'allPubliee', 'allTrashed','anneeFormation','categorie', 'rowsNum', 'sort', 'secteurs']));
            break;
        }

        

        
    

} 
}