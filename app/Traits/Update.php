<?php
namespace App\Traits;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules\Password;

trait Update{
    protected function updateArticle($request,$article){
        $article->update($request->all());
        $ids = $article->files->pluck('id')->toArray();
        $oldImagesIds = [];
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request['files'] as $file) {
                if(gettype($file) === 'integer'||gettype($file) === 'string'){
                    $oldImagesIds[] = $file;
                }else{
                    $files[] = $file;
                }
            }
        }
        foreach($ids as $id){
            if(!in_array($id,$oldImagesIds??[])){
                $this->deletOldElementFile($article,$id);
            }
        }
        foreach($files??[] as $file){
            $this->storeOneFile($file,$article,'event');
        }
    }
    protected function updateEvent($request,$event){
        $event->update($request->all());
        $ids = $event->files->pluck('id')->toArray();
        if ($request->has('files') &&count($request['files']) > 0) {
            foreach ($request['files'] as $file) {
                if(gettype($file) === 'integer'||gettype($file) === 'string'){
                    $oldImagesIds[] = $file;
                }else{
                    $files[] = $file;
                }
            }
        }
        foreach($ids as $id){
            if(!in_array($id,$oldImagesIds??[])){
                $this->deletOldElementFile($event,$id);
            }
        }
        foreach($files??[] as $file){
            $this->storeOneFile($file,$event,'event');
        }
    }
    protected function updateFiliere($request,$filiere){
        $filiere->update($request->all());
        $oldImage = $filiere->files->first();
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request['files'] as $file) {
                $this->storeOneFile($file,$filiere,'filiere');
            }
        }
        $oldImage && $this->deletOldElementFile($filiere,$oldImage->id);
    }
    protected function updateUser($request,$user){
        if ($request->input('email') !== $user->email){
            $request->validate(['email'=>'email|unique:users,email']);
        }
        if ($request->input('phone') !== $user->phone){
            $request->validate(['phone'=>'unique:users,phone']);
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
        ]);

        if($request->has('role')){
            $user->syncRoles($request->input('role'));
        }
        
        $oldAvatar = $user->files->first();
        if($request->has('files') && count($request->files) > 0){
            foreach ($request['files'] as $file) {
                $this->storeOneFile($file,$user,'avatar');
            }
            $oldAvatar && $this->deletOldElementFile($user,$oldAvatar->id);
        }
        if($request['files'][0]===null){
            $oldAvatar && $this->deletOldElementFile($user,$oldAvatar->id);
        }
    }
    public function updateUserPassword($request){
        $user = auth()->user();
        $validatedData = $request->validate([
            'currentPassword' => ['required', Password::min(6)->numbers()]  ,
            'password' => ['string','required',Password::min(6)->numbers(),'confirmed' ]
        ]);
        if (Hash::check($validatedData['currentPassword'], $user->password)) {
            if (Hash::check($validatedData['password'], $user->password)) {
                    return 'same';
                }
            $hashedPassword = Hash::make($validatedData['password']);
            $user->password = $hashedPassword;
            $user->save();
            return true;
        }
        return 'wrong';
    }
}
