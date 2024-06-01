<?php

namespace App\Http\Controllers;

use App\Traits\Get;
class apiController extends Controller

{
    use Get;

     public function index($data){
        return $this->GetAll($data);
    }
    public function show($data,$id){
        return $this->GetByDataId($data,$id);
    } 
}
