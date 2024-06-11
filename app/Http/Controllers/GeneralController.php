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
        if($action === 'delete'){
            foreach($ids as $id){
                $this->destroyElement($model, $id);
            }
        }
        if( $action ==='toggle' ){
            foreach($ids as $id){
                $element = $model::Find($id);
                ($element->visibility === 'true') ? $newV = 'false' : $newV = 'true';
                $element->visibility =  $newV ;
                $element->save();
            }
        }
    }
    public function stats(){
        return $this->getStats();
    }
}
