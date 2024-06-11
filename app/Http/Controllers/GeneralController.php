<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GeneralController extends Controller{

    public function trashed($data){
        $data= $this->GetAll($data,true);
        return Inertia::render(ucfirst($data).'/Trashed', compact('data'));
    }
    public function multipleAction(Request $request,$data,$action){
        $ids = request()['ids'];
        $model = 'App\\Models\\' . ucfirst(Str::singular($data));
        foreach($ids as $id){
            if($action === 'destroy'){
                $this->destroyElement($model, $id);
            }
            if($action === 'delete'){
                $this->forceDeleteData($model, $id);
            }
            if($action === 'restore'){
                $this->restoreData($model, $id);
            }
        }
        if( $action ==='toggle' ){
            foreach($ids as $id){
                $element = $model::Find($id);
                ($element->visibility === 'true') ? $visibility = 'false' : $visibility = 'true';
                $element->visibility =  $visibility ;
                $element->save();
            }
        }
    }
    public function stats(){
        return $this->getStats();
    }
}
