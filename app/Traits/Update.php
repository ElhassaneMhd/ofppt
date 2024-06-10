<?php
namespace App\Traits;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

trait Update{
    protected function updateArticle($request,$article){
        $article->title = $request->title;
        $article->details = $request->details;
        $article->date = $request->date;
        if(isset($request->user)){
            $article->user_id = $request->user_id;
        }else{
            $article->user_id = Session::get('user')->id;
        }
        $article->categorie = $request->categorie;
        $article->year_id = $request->year_id;
        $article->save();
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
          if ($request->hasfile('images') && count($request->images) > 0) {
            foreach ($request->images as $image) {
                $this->storeOneFile($image, $article, 'pdf');
            }
        }
    }
    protected function updateEvent($request,$event){
        $event->update([
            'title' => $request->input('title'),
            'date' => $request->input('date'),
            'location' => $request->input('location'),
            'duree' => $request->input('duree'),
            'details' => $request->input('details'),
            'status' => $request->input('status'),
            'visibility' => $request->input('visibility'),
            'tags' => $request->input('tags'),
            'user_id' => $request->input('user_id'),
            'year_id' => $request->input('year_id'),
        ]);
    }
    protected function updateFilier($request,$filiere){
        $filiere->update([
                'title' => $request->input('title'),
                'details' => $request->input('details'),
                'isActive' => $request->input('isActive'),
                'visibility' => $request->input('visibility'),
                'maxStg' => $request->input('maxStg'),
                'tags' => $request->input('tags'),
                'user_id' => $request->input('user_id'),
                'year_id' => $request->input('year_id'),
                'sector' => $request->input('sector'),
            ]);
    }
    protected function updateUser($request,$user){
         $user->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'email_verified_at' => $request->input('email_verified_at'),
            'password' => Hash::make($request->input('password')),
        ]);
    }
}
