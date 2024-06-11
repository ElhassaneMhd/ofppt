<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;


class ApiController extends Controller{
    public function index($data){
        return $this->GetAll($data,false);
    }
    public function show($data,$id){
        return $this->GetByDataId($data,$id);
    }
    public function storeDemands(Request $request){
        $this->storeDemand($request);
    }
    public function getSector(){
        $sectors = $this->getSectors();
        return response()->json($sectors);
    }
    public function getCategorie(){
        $categorie = $this->getCategories();
        return response()->json($categorie);
    }

}
