<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ApiController extends Controller{
    public function index($data){
        return $this->GetAll($data,false);

    }
    public function show($data,$id){
        return $this->GetByDataId($data,$id);
    }

}
