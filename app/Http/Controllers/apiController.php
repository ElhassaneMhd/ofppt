<?php

namespace App\Http\Controllers;

use App\Traits\Get;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

class apiController extends Controller

{
    use Get;
    public function index($data){
        return $this->GetAll($data);
    }
    public function show($data,$id){
        return $this->GetByDataId($data,$id);
    }
    public function destroy(Request $request,$data,$action){
        $ids = $request->ids;
        if($action === 'delete'){
            foreach($ids as $id){
                DB::table($data)->find($id)->delete();
            }
        }
         if( in_array($action ,['hide','show']) ){
            foreach($ids as $id){
                $model = 'App\\Models\\' . ucfirst(Str::singular($data));
                $element = $model::Find($id);
                ($element->visiblility === 'true') ? $newV = 'false' : $newV = 'true';
                $element->visiblility =  $newV ;
                $element->save();
            }
        }
    }
}
