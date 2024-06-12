<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filiere;
use Inertia\Inertia;


class HomeController extends Controller{
    public function index(){
        $articles= $this->GetAll('articles');
        $events= $this->GetAll('events');
        $filieres= $this->GetAll('filieres');
        $sectors = $this->getSectors();
        $stats = $this->getStats('homepage');
        $pageName = "home";
        $pages = ["home", "blog", "filieres", "evenements", "contact"];
        $sectorsWithStats = [];
        foreach ($stats["filieres"]["sectors"] as $key => $value) {
            if(in_array($key ,$sectors)) $sectorsWithStats[] = ["name" => $key, "count" => $value];
            else $sectorsWithStats[] = ["name" => $key, "count" => 0];
        }
        return Inertia::render('HomePage',compact('articles','events','filieres','sectors', 'sectorsWithStats', 'pageName', 'pages'));
     }
    public function elementById($data,$id){
        $element= $this->GetByDataId($data,$id);
        $path = ucfirst($data) . "/Details";
        return Inertia::render( $path,compact('element'));
    }
    public function sectorFilieres($sector){
        $filieres= Filiere::where('sector',$sector)->where('visibility','true')->get();
        $sectors = $this->getSectors(true,false);
        return Inertia::render('Sectors/Filieres',compact('filieres','sectors'));
    }
    public function storeDemands(Request $request){
        $this->storeDemand($request);
    }
}
