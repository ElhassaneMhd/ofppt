<?php
namespace App\Traits;

trait destroyTrait {
    protected function destroyData($model, $id){
        if(gettype(json_decode($id)) === 'array'){
            foreach (json_decode($id) as $id ) {
                    $evenement = $model::findOrFail(($id));
                    $evenement->delete();
                        }   
            } else {
                    $evenement = $model::findOrFail(($id));
                    $evenement->delete(); 
            }
    }
}