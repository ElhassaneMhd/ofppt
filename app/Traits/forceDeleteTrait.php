<?php
namespace App\Traits;
use DOMDocument;
use Illuminate\Support\Facades\Storage;

trait forceDeleteTrait {
    protected function forceDeleteData($model, $id, $folderName){
        if(gettype(json_decode($id)) === 'array' ){
            foreach (json_decode($id) as $id) {
                $modelInstance = $model::onlyTrashed()->findOrFail($id);
    
                $dom = new DOMDocument();
                $dom->loadHTML($modelInstance->details, 9);
                $images = $dom->getElementsByTagName('img');
    
                foreach ($images as $key => $img) {
                    $path = str_replace('/storage', '', $img->getAttribute('src'));
    
                    if (Storage::disk('public')->exists($path)) {
                        Storage::delete($path);
                    }
                }
    
                foreach ($modelInstance->pieceJointes as $pieceJointe) {
                    $pieceJointeName = "images/$folderName/" . $pieceJointe->URL ;
                    if(Storage::disk('public')->exists($pieceJointeName)){
                        Storage::delete($pieceJointeName);
                    }
                }
    
                $modelInstance->forceDelete();
            }
        } else {
            $modelInstance = $model::onlyTrashed()->findOrFail($id);
    
            $dom = new DOMDocument();
                $dom->loadHTML($modelInstance->details, 9);
                $images = $dom->getElementsByTagName('img');
    
                foreach ($images as $key => $img) {
                    $path = str_replace('/storage', '', $img->getAttribute('src'));
    
                    if (Storage::disk('public')->exists($path)) {
                        Storage::delete($path);
                    }
                }
    
                foreach ($modelInstance->pieceJointes as $pieceJointe) {
                    $pieceJointeName = "images/$folderName/" . $pieceJointe->URL ;
                    if(Storage::disk('public')->exists($pieceJointeName)){
                        Storage::delete($pieceJointeName);
                    }
                }
    
            $modelInstance->forceDelete();
        }
            foreach($modelInstance->pieceJointes as $pj) {
                $pj->delete();
            }
    }
}