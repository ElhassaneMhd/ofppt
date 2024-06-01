<?php
namespace App\Traits;

trait restoreTrait {
    protected function restoreData($model, $id){
        if(gettype(json_decode($id)) === 'array'){
            foreach (json_decode($id) as $id) {
                $modelInstance = $model::onlyTrashed()->findOrFail($id);
                $modelInstance->restore();
            }
        } else {
            $modelInstance = $model::onlyTrashed()->findOrFail($id);
            $modelInstance->restore();
        }
    }
}