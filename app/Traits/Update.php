<?php
namespace App\Traits;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

trait Update{
    protected function updateArticle($request,$article){
        $article->update($request->all());
        //modify old files
        $oldImages = [];
        //add new file
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                foreach ($file as $f) {
                    if(is_numeric($f)){
                        $oldImages[] = $f;
                    }else{
                        $this->storeOneFile($f,$article,'article');
                    }
                }
            }
        }
        foreach($article->files as $file) {
            if (!in_array( $file->id, $oldImages)){
                $filePath = public_path('article/'. $file->url);
                if (\Illuminate\Support\Facades\File::exists($filePath)) {
                    \Illuminate\Support\Facades\File::delete($filePath);
                }
               $file->delete();
            }
        }
    }
    protected function updateEvent($request,$event){
        $event->update($request->all());
        $oldImages = [];
        //add new file
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                foreach ($file as $f) {
                    if(is_numeric($f)){
                        $oldImages[] = $f;
                    }else{
                        $this->storeOneFile($f,$event,'event');
                    }
                }
            }
        }
        foreach($event->files as $file) {
            if (!in_array( $file->id, $oldImages)){
                $filePath = public_path('event/'. $file->url);
                if (\Illuminate\Support\Facades\File::exists($filePath)) {
                    \Illuminate\Support\Facades\File::delete($filePath);
                }
               $file->delete();
            }
        }
    }
    protected function updateFiliere($request,$filiere){
        dd($request->all());
        $filiere->update($request->all());
         $oldImages = [];
        //add new file
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                foreach ($file as $f) {
                    if(is_numeric($f)){
                        dd($f);
                        $oldImages[] = $f;
                    }else{
                        dd($f);
                        $this->storeOneFile($f,$filiere,'filiere');
                    }
                }
            }
        }

    }
    protected function updateUser($request,$user){
        if ($request->input('email') !== $user->email){
            $request->validate(['email'=>'email|unique:users,email']);
        }
         $request->validate([
            'password'=>'nullable|confirmed|min:6',
            'role'=>'exists:roles,name',
        ]);
         $user->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'email_verified_at' => $request->input('email_verified_at'),
            'password' => Hash::make($request->input('password')),
        ]);
        $user->syncRoles($request->input('role'));
    }
}
