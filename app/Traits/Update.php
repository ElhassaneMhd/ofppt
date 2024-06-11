<?php
namespace App\Traits;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules\Password;

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
    public function updateUserPassword($request,$user){
        $validatedData = $request->validate([
                    'currentPassword' => [
                            'required',
                            Password::min(6)->numbers(),
                        ]  ,
                    'password' => [
                            'string',
                            'required',
                            Password::min(6)->numbers(),
                            'confirmed',
                        ]
                    ]);
        if (Hash::check($validatedData['currentPassword'], $user->password)) {
            if (Hash::check($validatedData['password'], $user->password)) {
                    return to_route('settings')->with(['message' => 'New password cannot be the same as the current password ! , Please enter a new password'], 400);
                }
            $hashedPassword = Hash::make($validatedData['password']);
            $user->password = $hashedPassword;
            $user->save();
            return to_route('settings')->with(['message' => 'Password updated successfully'], 200);
        }
        return to_route('settings')->with(['message' => 'Current password is incorrect'], 400);
    }
}
