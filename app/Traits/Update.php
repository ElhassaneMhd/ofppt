<?php
namespace App\Traits;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

trait Update{
    protected function updateArticle($request,$article){
        $article->update($request->all());
        //modify old files
        if ($request->has('oldImages')){
            foreach($article->files as $file) {
                if (in_array( $file->id, $request->oldImages)===false){
                    $filePath = public_path('article/'. $file->url);
                    if (\Illuminate\Support\Facades\File::exists($filePath)) {
                        \Illuminate\Support\Facades\File::delete($filePath);
                    }
                   $file->delete();
                }
            }
        } else {
            foreach($article->files as $pj) {$pj->delete();}
        }
        //add new file
        if ($request->hasfile('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                $this->storeOneFile($file, $article, 'article');
            }
        }
    }
    protected function updateEvent($request,$event){
        $event->update($request->all());
    }
    protected function updateFiliere($request,$filiere){
        $filiere->update($request->all());
    }
    protected function updateUser($request,$user){
         $request->validate([
            'email'=>'email|unique:users,email',
            'password'=>'confirmed|min:6',
            'role'=>'exists:roles,name',
            'permissions.*'=>'exists:permissions,name',
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
        $user->syncPermissions($request->input('permissions'));
    }
}
