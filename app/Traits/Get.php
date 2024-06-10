<?php

namespace App\Traits;
use App\Models\Article;
use App\Models\Filiere;
use Illuminate\Support\Str;

trait Get
{
    use Refactor;
    public function GetAll($data,$trashed){
        $all = [];
        if(in_array($data,['users','articles','filieres','events','years','demands'])){
            $model = 'App\\Models\\' . ucfirst(Str::singular($data));
            if($trashed===true){
                $collections = $model::onlyTrashed()->get();
            }else{
                $collections = $model::all();
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
            return response()->json([]);
        }
        else{
            return response()->json($all, 200);
        }
    }
    public function GetByDataId($data,$id){
        if (in_array($data, ['users', 'articles', 'filieres', 'events'])) {
            $model = 'App\\Models\\' . ucfirst(Str::singular($data));
            $collection = $model::find($id);
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
        return response()->json($results);
    }
    public function getElementFiles($element){
        if ($element){
            $files = $element->files;
            foreach($files as $file){
                $Allfiles[] = ['url' =>$file->url,'type'=>$file->type];
            }
        }
        return $Allfiles??[];
    }
    public function getSectors(){
        $sectors = Filiere::all()->unique('sector')->pluck('sector')->toArray();
        return array_unique($sectors) ?? [];
    }
    public function getCategories(){
        $categories = Article::all()->unique('categorie')->pluck('categorie')->toArray();
        return array_unique($categories) ?? [];
    }
}
