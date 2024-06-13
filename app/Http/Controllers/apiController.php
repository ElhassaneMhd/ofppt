<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;


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
    public function storeDemands(Request $request){
        if ($this->storeDemand($request)) {
            return redirect('/')->with('success','Demande envoyée avec succès');
            }else{
                return redirect('/')->with('error',"Erreur lors de l\'envoi de la demande");
            }
    }

}
