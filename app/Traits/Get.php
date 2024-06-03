<?php

namespace App\Traits;
use App\Models\Article;
use Illuminate\Support\Facades\DB;
trait Get
{
    use Refactor;
    public function GetAll($data){
        $all = [];
        if(in_array($data,['users','articles','filiers','evenements','years'])){
            $collections = DB::table($data)->get();
             foreach ($collections as $collection) {
                 ($data === 'users')&& $all[]= $this->refactorUser($collection);
                 ($data === 'articles')&& $all[]= $this->refactorArticle($collection);
                 ($data === 'filiers')&& $all[]= $this->refactorFilier($collection);
                 ($data === 'evenements')&& $all[]= $this->refactorEvent($collection);
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
        if (in_array($data, ['users', 'articles', 'filiers', 'evenements'])) {
            $collection = DB::table($data)->find($id);
            if($collection){
                ($data === 'users') && $results = $this->refactorUser($collection);
                ($data === 'articles') && $results = $this->refactorArticle($collection);
                ($data === 'filiers') && $results = $this->refactorFilier($collection);
                ($data === 'evenements') && $results = $this->refactorEvent($collection);
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
}