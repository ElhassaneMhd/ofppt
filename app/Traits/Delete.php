<?php
namespace App\Traits;
use App\Models\File;

trait Delete{
    protected function destroyElement($model, $id){
        $element = $model::findOrFail($id);
        $element->delete();
    }
    protected function forceDeleteData($model, $id){
        $element = $model::findOrFail($id);
        $element->forceDelete();
    }
    public function deletOldElementFile($element,$id = null){
        if($id){
            $oldFiles[] = File::find($id);
        }else{
            $oldFiles = $element->files;
        }
        foreach($oldFiles as $file){
            if ($file){
                File::find($file->id)->delete();
            }
            if ($file&&\File::exists(public_path($file->url))){
                \File::delete(public_path($file->url));
            }
        }
    }

}
