<?php

namespace App\Http\Controllers;

use App\Models\Filiere;
use Inertia\Inertia;

class HomeController extends Controller{
    public function home(){
        $articles= $this->GetAll('articles',false);
        $events= $this->GetAll('events',false);
        $filieres= $this->GetAll('filieres',false);
        $sectors = $this->getSectors();
        return Inertia::render('HomePage',compact('articles','events','filieres','sectors'));
     }
    public function elementById($data,$id){
        $element= $this->GetByDataId($data,$id);
        $path = ucfirst($data) . "/Details";
        return Inertia::render( $path,compact('element'));
    }
    public function sectorFilieres($sector){
        $filieres= Filiere::where('sector',$sector)->where('visibility','true')->get();
        $sectors = $this->getSectors();
        return Inertia::render('Sectors/Filieres',compact('filieres','sectors'));
    }
}
