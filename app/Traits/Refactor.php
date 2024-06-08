<?php
namespace App\Traits;
trait Refactor {
  protected function refactorManyElements($elements,$data){
    foreach($elements as $element){
                 ($data === 'users')&& $all[]= $this->refactorUser($element);
                 ($data === 'articles')&& $all[]= $this->refactorArticle($element);
                 ($data === 'filiers')&& $all[]= $this->refactorFilier($element);
                 ($data === 'evenements')&& $all[]= $this->refactorEvent($element);
                 ($data === 'demands')&& $all[]= $this->refactorDemand($element);
                 ($data === 'years')&& $all[]= $this->refactorYear($element);
            }
        return $all ?? [];
  }
  protected function refactorUser($user){
     return [
         "id"=>$user->id,
         "firstName"=>$user->firstName,
         "lastName"=>$user->lastName,
         'created_at'=>$user->created_at,
         'updated_at'=>$user->updated_at,
         "email"=>$user->email,
         "phone"=>$user->phone,
         "role"=>$user->getRoleNames()[0],
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
      "tags"=> explode(',',$article->tags)??[],
      "files"=>$this->getElementFiles($article)??[],
      "created_at"=>$article->created_at
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
      "tags"=> explode(',',$event->tags)??[],
        "files"=>$this->getElementFiles($event)??[],
        "created_at"=>$event->created_at
      ];
  }
  protected function refactorFilier($filier){
        return  [
            "id"=> $filier->id,
            "name"=> $filier->title,
            "Year"=>$filier->year->year,
            "description"=> $filier->details,
            "sector"=>$filier->sector,
            "tags"=> explode(',',$filier->tags)??[],
            'max_stagiaires'=>$filier->maxStg,
            "files"=>$this->getElementFiles($filier)??[],
            "created_at"=>$filier->created_at
          ];
  }
  protected function refactorYear($year){
    $articles = $year->articles()->count();
    $filiers = $year->filiers()->count();
    $evenements = $year->evenements()->count();
    return [
      'year' => $year->year,
      'startDate'=>$year->startDate,
      'endDate'=>$year->endDate,
      'isActive'=>$year->isActive,
      'inscriptionStartDate'=>$year->inscriptionStartDate,
      'inscriptionEndDate'=>$year->inscriptionEndDate,
      'inscriptionStatus'=>$year->inscriptionStatus,
      'articles'=>$articles,
      'filiers'=>$filiers,
      'evenements'=>$evenements,
    ];
  }
  protected function refactorDemand($demand){
    return [
      'fullName' => $demand->fullName,
      'email' => $demand->email,
      'phone' => $demand->phone,
      'subject' => $demand->subject,
      'message' => $demand->message
    ];
  }
}
