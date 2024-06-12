<?php
namespace App\Traits;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules\Password;

trait Update{
    protected function updateArticle($request,$article){
        $article->update($request->all());
        $oldImages = [];
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

        // foreach($article->files as $file) {
        //     if (!in_array( $file->id, $oldImages)){
        //         $filePath = public_path('article/'. $file->url);
        //         if (\Illuminate\Support\Facades\File::exists($filePath)) {
        //             \Illuminate\Support\Facades\File::delete($filePath);
        //         }
        //        $file->delete();
        //     }
        // }
    }
    protected function updateEvent($request,$event){
        $event->update($request->all());
        $oldImages = [];
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
        // foreach($event->files as $file) {
        //     if (!in_array( $file->id, $oldImages)){
        //         $filePath = public_path('event/'. $file->url);
        //         if (\Illuminate\Support\Facades\File::exists($filePath)) {
        //             \Illuminate\Support\Facades\File::delete($filePath);
        //         }
        //        $file->delete();
        //     }
        // }
    }
    protected function updateFiliere($request,$filiere){
        $filiere->update($request->all());
         $oldImages = [];
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                foreach ($file as $f) {
                    if(is_numeric($f)){
                        $oldImages[] = $f;
                    }else{
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
        if ($request->has('files') && count($request->files) > 0) {
             foreach ($request->files as $file) {
                foreach ($file as $f) {
                    $this->storeOneFile($f,$user,'avatar');
                }
            }
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
