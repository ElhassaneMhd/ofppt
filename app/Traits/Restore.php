<?php
namespace App\Traits;

trait Restore {
    protected function restoreData($model, $id){
        $modelInstance = $model::onlyTrashed()->findOrFail($id);
        $modelInstance->restore();        
    }
}