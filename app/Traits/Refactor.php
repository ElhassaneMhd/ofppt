<?php

namespace App\Traits;

use App\Models\Session;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;

trait Refactor
{
    protected function refactorManyElements($elements, $data){
        foreach ($elements as $element) {
            ($data === 'users') && $all[] = $this->refactorUser($element);
            ($data === 'articles') && $all[] = $this->refactorArticle($element);
            ($data === 'filieres') && $all[] = $this->refactorFiliere($element);
            ($data === 'events') && $all[] = $this->refactorEvent($element);
            ($data === 'demands') && $all[] = $this->refactorDemand($element);
            ($data === 'years') && $all[] = $this->refactorYear($element);
            ($data === 'sessions') && $all[] = $this->refactorSession($element);
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
            "files" => $this->getElementFiles($user) ?? [],
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
            "publisher" => $article->user->firstName ?? "unknown" . ' ' . $article->user->lastName ?? "publisher",
            "formationYear" => $this->refactorYear($article->year),
            "visibility" => $article->visibility,
            "categorie" => $article->categorie,
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
            "formationYear" => $this->refactorYear($event->year),
            "details" => $event->details,
            "date" => $event->date,
            "visibility" => $event->visibility,
            'location' => $event->location,
            'upcoming' => $event->upcoming,
            "duration" => $event->duration,
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
            "formationYear" => $this->refactorYear($filiere->year) ,
            "details" => $filiere->details,
            "sector" => $filiere->sector,
            "isActive" => $filiere->isActive,
            "visibility" => $filiere->visibility,
            "tags" => explode(',', $filiere->tags) ?? [],
            'max_stagiaires' => $filiere->max_stagiaires,
            "files" => $this->getElementFiles($filiere) ?? [],
            "created_at" => $filiere->created_at
        ];
    }
    protected function refactorYear($year)
    {
        $articles = $year->articles()->count();
        $filieres = $year->filieres()->count();
        $events = $year->events()->count();
        return [
            'id' => $year->id,
            'year' => $year->year,
            // 'startDate' => $year->startDate,
            // 'endDate' => $year->endDate,
            // 'isActive' => $year->isActive,
            // 'inscriptionStartDate' => $year->inscriptionStartDate,
            // 'inscriptionEndDate' => $year->inscriptionEndDate,
            // 'inscriptionStatus' => $year->inscriptionStatus,
            // 'articles' => $articles,
            // 'filieres' => $filieres,
            // 'events' => $events,
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
    public function refactorSettings()
    {
        $setting = Setting::first();
        if (!$setting) {
            $setting = new Setting();
            $setting->save();
        }
        return [
            'email' => $setting->email,
            "phone" => $setting->phone,
            "facebook" => $setting->facebook,
            "instagram" => $setting->instagram,
            "twitter" => $setting->twitter,
            "youtube" => $setting->youtube,
            "linkedin" => $setting->linkedin,
            "maps" => $setting->maps,
            "location" => $setting->location,
            "aboutDescription" => $setting->aboutDescription,
            "files" => $this->getElementFiles($setting) ?? []
        ];
    }
    public function refactorSession($session){
        $user = User::find($session->user_id);

        $allActivities = $session->activities;
        foreach($allActivities as $actevitie){
            $activities[]=$this->refactorActivity($actevitie);
        }

        $currentSession = Session::where('unique',Cookie::get('unique'))->first();
        ($currentSession&&$currentSession->id ===$session->id)?$isCurrent = 'true':$isCurrent= 'false';

        return [
            'id'=>$session->id,
            'fullName'=>$user->firstName.' '.$user->lastName ,
            'email'=>$user->email ,
            'ip'=>$session->ip,
            'browser'=>$session->browser,
            'device'=>$session->device,
            'status'=>$session->status,
            'isCurrent'=>$isCurrent,
            'location'=>$session->location,
            'activities'=>$activities??[],
            'created_at'=>$session->created_at,
            'updated_at'=>$session->updated_at,
        ];
    }
    public function refactorActivity($activitie){
        $user= $activitie->session->user;
        return [
            'id' => $activitie->id,
            'initiator' => $user->firstName.' '.$user->lastName,
            'model' => $activitie->model,
            'action' => $activitie->action,
            'activity' => $activitie->activity,
            'object' => $activitie->object,
            'created_at' => $activitie->created_at,
        ];
    }
}
