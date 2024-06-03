<?php
namespace App\Traits;
use App\Models\Article;
trait Refactor {

  protected function refactorUser($user){
     return [
         "id"=>$user->id,
         "firstName"=>$user->firstName,
         "lastName"=>$user->lastName,
         'created_at'=>$user->created_at,
         'updated_at'=>$user->updated_at,
         "email"=>$user->email,
         "phone"=>$user->phone,
        // "role"=>$user->getRoleNames()[0],
      ];
  }
  protected function refactorArticle($article){
    return [
      "id"=> $article->id,
      "title"=> $article->title,
      "details"=> $article->details, 
      "author"=> $article->user->firstName,
      "Year"=>$article->year->year,
      "date"=>$article->date,
      "tags"=> str_split($article->tags, 3)??[],
      "files"=>$this->getElementFiles($article)??[]
    ];
  }
  protected function refactorEvent($event){   
      return [ 
        "id"=> $event->id,
        "title"=> $event->title,
        "Year"=>$event->year->year,
        "content"=> $event->details,
        "author"=> $event->user->firstName,
        "date"=>$event->date,
        'location'=>$event->location,
        'upcoming'=>$event->status,
        "duree"=>$event->duree,
        "tags"=> str_split($event->tags, 3)??[],
        "files"=>$this->getElementFiles($event)??[]
      ];
  }
  protected function refactorFilier($filier){ 
        return  [
            "id"=> $filier->id,
            "name"=> $filier->title,
            "Year"=>$filier->year->year,
            "description"=> $filier->details,
            "secteur"=>$filier->Secteur,
            "tags"=> str_split($filier->tags, 3)??[],
            'max_stagiaires'=>$filier->maxStg,
            "files"=>$this->getElementFiles($filier)??[]
        ];
  }
}