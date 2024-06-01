<?php
namespace App\Traits;
trait Refactor {

  protected function refactorUser($user){
     $refactored = [
                "id"=>$user->id,
                "firstName"=>$user->firstName,
                "lastName"=>$user->lastName,
                'created_at'=>$user->created_at->format('Y-m-d H:i:s'),
                'updated_at'=>$user->updated_at->format('Y-m-d H:i:s'),
                "gender"=>$user->gender,
                "email"=>$user->email,
                "phone"=>$user->phone,
                "role"=>$user->getRoleNames()[0],
            ];
    return $refactored;
  }
  protected function refactorArticle($article){
    $article->Categories;
    $article->tags;
    $article->AnneeFormations;
    $article->Admin->name;

    foreach($article->tags as $key ) {
      $tags[]= $key['name'];
    };

    $images = $this->getElementFiles($article);
    return [
       "id"=> $article->id,
      "title"=> $article->titre,
      "content"=> $article->details, 
      "author"=> $article->Admin->name,
      "AnneeFormation"=>$article->AnneeFormations->nom,
      "date"=>$article->date,
      "tags"=>$tags,
      'cover'=>$images
    ];
  }
  protected function refactorEvent($item){
      $item->Categories;
      $item->tags;
      $item->Admin;
      $item->AnneeFormations;
          foreach($item->tags as $key ) {
            $tags[]= $key['name'];
          };
          $images = $this->getElementFiles($item);
          return [ 
            "id"=> $item->id,
            "title"=> $item->titre,
            "AnneeFormation"=>$item->AnneeFormations->nom,
            "content"=> $item->details,
            "author"=> $item->Admin->name,
            "date"=>$item->date,
            'lieu'=>$item->lieu,
            'upcoming'=>$item->etat,
            "duree"=>$item->duree,
            "tags"=>$tags,
            'cover'=>$images
        ];
  }
  protected function refactorFilier($filier){
          $filier->Secteur;
          $filier->tags;
          $filier->Admin;
          $filier->AnneeFormations;

          foreach($filier->tags as $key ) {
            $tags[]= $key['name'];
            $tags = array_unique($tags);
          };
          $images = $this->getElementFiles($filier);
        return  [
            "id"=> $filier->id,
            "name"=> $filier->titre,
            "AnneeFormation"=>$filier->AnneeFormations->nom,
            "description"=> $filier->details,
            "secteur"=>$filier->Secteur->name,
            "tags"=>$tags,
            'max_stagiaires'=>$filier->max_stagiaires,
            'cover'=>$images
        ];
  }
}