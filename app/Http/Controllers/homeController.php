<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Filiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



class HomeController extends Controller{
    public function index(){
        $articles= $this->GetAll('articles');
        $events= $this->GetAll('events');
        $filieres= $this->GetAll('filieres');
        $sectors = $this->getSectors(true, false);
        $stats = $this->getStats("homepage");
        $sectorsWithStats = [];
        // foreach ($stats["filieres"]["sectors"]??[] as $key => $value) {
        //     if(in_array($key ,$sectors)) $sectorsWithStats[] = ["name" => $key, "count" => $value];
        //     else $sectorsWithStats[] = ["name" => $key, "count" => 0];
        // }
        return Inertia::render('Home/HomePage',compact('articles','events','filieres','sectors', 'sectorsWithStats', ));
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
    // public function dataPage($data){
    //     $path = ucfirst($data).'/'.ucfirst($data);
    //     $elements= $this->GetAll($data);
    //     $sectors = $this->getSectors(true,false);
    //     if  ($data == 'filieres' ) return Inertia::render($path,compact('elements','sectors'));
    //     return Inertia::render($path,compact('elements'));
    // } 
    public function detailsPage($id){
        $route = explode('/', Route::getFacadeRoot()->current()->uri())[0];
        $element= $this->GetByDataId($route,$id);
        $elements= $this->GetAll(explode('/', Route::getFacadeRoot()->current()->uri())[0]);
        return Inertia::render( ucfirst($route).'/Details',compact('element', "elements"));
    }
}
