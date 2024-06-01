<?php

namespace App\Traits;
use App\Models\Article;
use App\Models\Evenement;
use App\Models\Filier;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
trait Get
{
    use Refactor;
    public function GetAll($data){
        $all = [];
        if ($data === 'users') {
            $users = User::all();
            foreach ($users as $user) {
                $all[]= $this->refactorUser($user);
            }
        }
        elseif ($data === 'articles') {
            $articles = Article::all();
            foreach ($articles as $article) {
                $all[]= $this->refactorArticle($article);
            }
        }
        elseif ($data === 'filiers') {
            $filiersfiliers = Filier::all();
            foreach ($filiersfiliers as $filier) {
                $all[]= $this->refactorFilier($filier);
            }
        }
        elseif ($data === 'events') {
            $events = Evenement::all();
            foreach ($events as $event) {
                $all[]= $this->refactorEvent($event);
            }
        }    
        if(isset($all) ){
            return response()->json($all);
        }
        else{
            return response()->json($all, 200);
        }
    }
    public function GetByDataId($data,$id){
        if ($data === 'articles') {
            $article = Article::find($id);
            if ($article){
                $results= $this->refactorArticle($article);
            }
        }
        elseif ($data === 'filiers') {
            $filier = Filier::find($id);
            if ($filier){
                $results= $this->refactorFilier($filier);
            }
        }
        elseif ($data === 'events') {
            $event = Evenement::Find($id);
            if ($event){
                $results= $this->refactorEvent($event);
            }
        }
        elseif ($data === 'users') {
            $user = User::Find($id);
            if ($user){
                $results= $this->refactorUser($user);
            }
        }

        else{
            return response()->json(['message' => 'Looking for undefined api'], 404);
        }        
        if(empty($results)){
            return response()->json(['message' => 'Looking for undefined data, try with a different id'], 404);
        }
        return response()->json($results);
    }
    public function getElementFiles($element){
        if ($element){
            $files = $element->pieceJointes;
            foreach($files as $file){
                $Allfiles[] = ['url' =>$file->url,'type'=>$file->type];
            }
        }
        return $Allfiles??[];
    }
}