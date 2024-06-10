<?php

namespace App\Traits;

trait Refactor
{
    protected function refactorManyElements($elements, $data)
    {
        foreach ($elements as $element) {
            ($data === 'users') && $all[] = $this->refactorUser($element);
            ($data === 'articles') && $all[] = $this->refactorArticle($element);
            ($data === 'filieres') && $all[] = $this->refactorFiliere($element);
            ($data === 'events') && $all[] = $this->refactorEvent($element);
            ($data === 'demands') && $all[] = $this->refactorDemand($element);
            ($data === 'years') && $all[] = $this->refactorYear($element);
        }
        return $all ?? [];
    }
    protected function refactorUser($user)
    {
        return [
            "id" => $user->id,
            "firstName" => $user->firstName,
            "lastName" => $user->lastName,
            "email" => $user->email,
            "phone" => $user->phone,
            "role" => $user->getRoleNames()[0],
            'created_at' => $user->created_at,
            'updated_at' => $user->updated_at,
        ];
    }
    protected function refactorArticle($article)
    {
        return [
            "id" => $article->id,
            "title" => $article->title,
            "details" => $article->details,
            "publisher" => $article->user->firstName,
            "formationYear" => $article->year->year,
            "visibility" => $article->visibility,
            "date" => $article->date,
            "tags" => explode(',', $article->tags) ?? [],
            "files" => $this->getElementFiles($article) ?? [],
            "created_at" => $article->created_at
        ];
    }
    protected function refactorEvent($event)
    {
        return [
            "id" => $event->id,
            "title" => $event->title,
            "formationYear" => $event->year->year,
            "details" => $event->details,
            "publisher" => $event->user->firstName,
            "date" => $event->date,
            "visibility" => $event->visibility,
            'location' => $event->location,
            'upcoming' => $event->status,
            "duration" => $event->duree,
            "tags" => explode(',', $event->tags) ?? [],
            "files" => $this->getElementFiles($event) ?? [],
            "created_at" => $event->created_at
        ];
    }
    protected function refactorFiliere($filiere)
    {
        return  [
            "id" => $filiere->id,
            "title" => $filiere->title,
            "formationYear" => $filiere->year->year,
            "details" => $filiere->details,
            "sector" => $filiere->sector,
            "visibility" => $filiere->visibility,
            "tags" => explode(',', $filiere->tags) ?? [],
            'max_stagiaires' => $filiere->maxStg,
            "files" => $this->getElementFiles($filiere) ?? [],
            "created_at" => $filiere->created_at
        ];
    }
    protected function refactorYear($year)
    {
        $articles = $year->articles()->count();
        $filieres = $year->filieres()->count();
        $evenements = $year->evenements()->count();
        return [
            'year' => $year->year,
            'startDate' => $year->startDate,
            'endDate' => $year->endDate,
            'isActive' => $year->isActive,
            'inscriptionStartDate' => $year->inscriptionStartDate,
            'inscriptionEndDate' => $year->inscriptionEndDate,
            'inscriptionStatus' => $year->inscriptionStatus,
            'articles' => $articles,
            'filieres' => $filieres,
            'evenements' => $evenements,
        ];
    }
    protected function refactorDemand($demand)
    {
        return [
            'id' => $demand->id,
            'fullName' => $demand->fullName,
            'email' => $demand->email,
            'phone' => $demand->phone,
            'subject' => $demand->subject,
            'message' => $demand->message,
            "created_at" => $demand->created_at
        ];
    }
}
