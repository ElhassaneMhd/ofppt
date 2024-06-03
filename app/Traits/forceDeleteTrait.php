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
    
                foreach ($modelInstance->files as $file) {
                    $fileName = "images/$folderName/" . $file->URL ;
                    if(Storage::disk('public')->exists($fileName)){
                        Storage::delete($fileName);
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
    
                foreach ($modelInstance->files as $file) {
                    $fileName = "images/$folderName/" . $file->URL ;
                    if(Storage::disk('public')->exists($fileName)){
                        Storage::delete($fileName);
                    }
                }
    
            $modelInstance->forceDelete();
        }
            foreach($modelInstance->files as $pj) {
                $pj->delete();
            }
    }
}