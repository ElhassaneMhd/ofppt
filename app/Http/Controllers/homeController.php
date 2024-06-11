<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class homeController extends Controller{
     public function home(){
        $articles= $this->GetAll('articles',false);
        $events= $this->GetAll('events',false);
        $filieres= $this->GetAll('filieres',false);
        $sectors = $this->getSectors();
        return Inertia::render('HomePage',compact('articles','events','filieres','sectors'));
     }
     public function elementById($data,$id){
        $element= $this->GetByDataId($data,$id);
        return Inertia::render($data."/".$id,compact('element'));
     }
}
