<?php

namespace App\Http\Controllers;


class ApiController extends Controller{
    public function index($data){
        return $this->GetAll($data);
    }
    public function show($data,$id){
        return $this->GetByDataId($data,$id);
    }

    public function getSector(){
        $sectors = $this->getSectors(true,false);
        return response()->json($sectors);
    }
    public function getCategorie(){
        $categorie = $this->getCategories(true,false);
        return response()->json($categorie);
    }

}
