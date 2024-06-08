<?php
namespace App\Traits;
use App\Models\File;

trait Delete{

 public function deletOldElementFile($element){
        $oldFiles = $element->files;
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