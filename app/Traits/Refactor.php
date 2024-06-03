<?php
namespace App\Traits;
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
        "author"=> $event->Admin->name,
        "date"=>$event->date,
        'location'=>$event->location,
        'upcoming'=>$event->status,
        "duree"=>$event->duree,
        "tags"=> str_split($event->tags, ',')??[],
        "files"=>$this->getElementFiles($event)??[]
      ];
  }
  protected function refactorFilier($filier){

          foreach($filier->tags as $key ) {
            $tags[]= $key['name'];
            $tags = array_unique($tags);
          };
          $images = $this->getElementFiles($filier);
        return  [
            "id"=> $filier->id,
            "name"=> $filier->title,
            "Year"=>$filier->Years->nom,
            "description"=> $filier->details,
            "secteur"=>$filier->Secteur,
            "tags"=>$tags,
            'max_stagiaires'=>$filier->max_stagiaires,
            'cover'=>$images
        ];
  }
}