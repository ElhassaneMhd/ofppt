<?php

namespace App\Traits;
use App\Models\Article;
use App\Models\Demand;
use App\Models\Event;
use App\Models\Filiere;
use App\Models\User;
use App\Models\Year;
use Illuminate\Support\Str;

trait Get{
    use Refactor;
    public function GetAll($data,$trashed = false){
        $all = [];
        if(in_array($data,['users','articles','filieres','events','years','demands'])){
            $model = 'App\\Models\\' . ucfirst(Str::singular($data));
            if($trashed===true){
                $collections = $model::onlyTrashed()->get();
            }else{
                if(!in_array($data,['users','demands','years'])){
                    $collections = $model::where('visibility', 'true')->get();
                }else{
                    $collections = $model::all();
                }
            }
          foreach ($collections as $collection) {
                 ($data === 'users')&& $all[]= $this->refactorUser($collection);
                 ($data === 'articles')&& $all[]= $this->refactorArticle($collection);
                 ($data === 'filieres')&& $all[]= $this->refactorFiliere($collection);
                 ($data === 'events')&& $all[]= $this->refactorEvent($collection);
                 ($data === 'demands')&& $all[]= $this->refactorDemand($collection);
                 ($data === 'years')&& $all[]= $this->refactorYear($collection);
            }
        }else{
            return response()->json(['message'=>'undefined api'],400);
        }
        if(!isset($all) ){
            return [];
        }
        else{
            return $all;
        }
    }
    public function GetByDataId($data,$id){
        if (in_array($data, ['users', 'articles', 'filieres', 'events'])) {
            $model = 'App\\Models\\' . ucfirst(Str::singular($data));
            $collection = $model::where('id', $id)->where('visibility', 'true')->first();
            if($collection){
                ($data === 'users') && $results = $this->refactorUser($collection);
                ($data === 'articles') && $results = $this->refactorArticle($collection);
                ($data === 'filieres') && $results = $this->refactorFiliere($collection);
                ($data === 'events') && $results = $this->refactorEvent($collection);
            }else{
                return response()->json(['message' => 'Looking for undefined data, try with a different id'], 404);
            }
        }else{
            return response()->json(['message' => 'Looking for undefined api'], 404);
        }
        return $results;
    }
    public function getElementFiles($element){
        if ($element){
            $files = $element->files;
            foreach($files as $file){
                $Allfiles[] = ['id'=>$file->id,'url' =>$file->url,'type'=>$file->type];
            }
        }
        return $Allfiles??[];
    }
    public function getSectors($onlyVisible = false,$onyTrashed = false){
        $sectors = Filiere::all()->pluck('sector')->toArray();
        if($onlyVisible){
            $sectors = Filiere::where('visibility', 'true')->get()->pluck('sector')->toArray();
        }
        if($onyTrashed){
            $sectors = Filiere::onlyTrashed()->get()->pluck('sector')->toArray();
        }
        return array_keys(array_flip($sectors)) ?? [];
    }
    public function getCategories($onlyVisible = false,$onyTrashed = false){
        $categories = Article::all()->pluck('categorie')->toArray();
        if($onlyVisible){
            $categories = Article::where('visibility', 'true')->get()->pluck('categorie')->toArray();
        }
        if($onyTrashed){
            $categories = Article::onlyTrashed()->get()->pluck('categorie')->toArray();
        }
        return array_keys(array_flip($categories)) ?? [];
    }
    public function getStats($for){
        $superAdmins = User::role('super-admin')->count();
        $gestionaires = User::role('gestionaire')->count();
        $admins = User::role('admin')->count();
        $users= [
            'total' => $this->GetCount('users'),
            'trashed' => count(User::onlyTrashed()->get()),
            'superAdmins' => $superAdmins,
            'gestionaires' => $gestionaires,
            'admins' => $admins,
        ];
        $articles = [
            'total' => $this->GetCount('articles'),
            'trashed' => count(Article::onlyTrashed()->get()),
            'visible' => count(Article::where('visibility', 'true')->get()),
            'hidden' => count(Article::where('visibility', 'false')->get()),
        ];
        $visibleCategories = $this->getCategories(true,false);
        $allCategories = $this->getCategories();
        ($for === 'homepage')? $categories = $visibleCategories:$categories = $allCategories;
        foreach($categories as $categorie){
            $articles['categories'][$categorie] = Article::where('categorie',$categorie)->count();
        }
        $filieres = [
            'total' => $this->GetCount('filieres'),
            'trashed' => count(Filiere::onlyTrashed()->get()),
            'visible' => count(Filiere::where('visibility', 'true')->get()),
            'hidden' => count(Filiere::where('visibility', 'false')->get()),
            'active' => count(Filiere::where('isActive', 'true')->get()),
            'inactive' => count(Filiere::where('isActive', 'false')->get()),
        ];
        $visibleSectores = $this->getSectors(true,false);
        $allSectors = $this->getSectors();
        ($for === 'homepage')?$sectors = $visibleSectores:$sectors = $allSectors;
        foreach($sectors as $sector){
            $filieres['sectors'][$sector] = Filiere::where('sector',$sector)->count();
        }
        $events = [
            'total' => $this->GetCount('events'),
            'trashed' => count(Event::onlyTrashed()->get()),
            'visible' => count(Event::where('visibility', 'true')->get()),
            'hidden' => count(Event::where('visibility', 'false')->get()),
            "upcoming" => count(Event::where('upcoming','true')->get()),
        ];
        $demands = ['totale' => count(Demand::all())];
        $years = [
            'total' => $this->GetCount('years'),
        ];
        foreach(Year::all() as $year){
            $years['years'][$year->year] = [
                'filieres' => count(Filiere::where('year_id', $year->id)->get()),
                'events' => count(Event::where('year_id', $year->id)->get()),
                'articles' => count(Article::where('year_id', $year->id)->get()),
            ];
        }
        if($for === 'homepage') return compact('filieres','years');
        if ('super-admin') return compact('users', 'articles', 'filieres', 'events', 'demands','years');
        if ($for === 'admin') return compact( 'articles', 'filieres', 'events', 'demands','years');       
        if ($for === 'gestionaire')  return compact('articles', 'filieres', 'events');
    }
    public function GetCount($data){
        if (in_array($data, ['users', 'articles', 'filieres', 'events', 'years', 'demands'])) {
            $model = 'App\\Models\\' . ucfirst(Str::singular($data));
            $count = $model::count();
        }
        return $count ?? 0;
    }
}
