<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

class apiController extends Controller{

    public function index($data){
        return $this->GetAll($data);
    }
    public function show($data,$id){
        return $this->GetByDataId($data,$id);
    }
    public function multipleAction(Request $request,$data,$action){
        $ids = request()['ids'];
        $model = 'App\\Models\\' . ucfirst(Str::singular($data));
        if($action === 'delete'){
            foreach($ids as $id){
                $this->destroyElement($model, $id);
            }
        }
         if( in_array($action ,['hide','show']) ){
            foreach($ids as $id){
                $element = $model::Find($id);
                ($element->visibility === 'true') ? $newV = 'false' : $newV = 'true';
                $element->visibility =  $newV ;
                $element->save();
            }
        }
    }
}
