<?php

namespace App\Traits;
use App\Models\Article;
use App\Models\Event;
use App\Models\User;
use App\Models\Filiere;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

trait Store{

    protected function storeArticle($request){
        $request->validate([
            'title'=>'required',
            'details'=>'required',
            'date'=>'required|date',
            'categorie'=>'required',
            'user_id'=>'required|exists:users,id',
            'year_id'=>'required|exists:years,id',
            'files.*' => 'file|mimes:doc,DOC,DOCX,docx,PDF,pdf,jpg,JPG,jpeg,JPEG,PNG,png,svg,SVG|max:5120',
        ]);
        $article = new Article();
        $article->title = $request->title;
        $article->details = $request->details;
        $article->date = $request->date;
        $article->visibility =$request->visibility;
        $article->categorie = $request->categorie;
        $article->tags = $request->tags;
        $article->user_id = auth()->user()->id??null;
        $article->year_id = Session::get('activeYear')->id??null;
        $article->save();
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                $this->storeOneFile($file[0],$article,'article');
            }
        }

    }
    protected function storeEvent($request){
        $event = Event::create([
            'title' => $request->input('title'),
            'date' => $request->input('date'),
            'location' => $request->input('location'),
            'duration' => $request->input('duration'),
            'details' => $request->input('details'),
            'status' => $request->input('status'),
            'visibility' => $request->input('visibility'),
            'tags' => $request->input('tags'),
            'year_id' => Session::get('activeYear')->id??null,
        ]);
         if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                $this->storeOneFile($file,$event,'event');
            }
        }
        return response()->json(['message' => 'Event created successfully']);
    }
    protected function storeFiliere($request){
        $filiere = Filiere::create([
            'title' => $request->input('title'),
            'details' => $request->input('details'),
            'isActive' => $request->input('isActive')??0,
            'visibility' => $request->input('visibility'),
            'max_stagiaires' => $request->input('max_stagiaires'),
            'sector' => $request->input('sector'),
            'tags' => $request->input('tags'),
            'year_id' => Session::get('activeYear')->id??1,
        ]);
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                $this->storeOneFile($file[0],$filiere,'filiere');
            }
        }
        return response()->json(['message' => 'Filiere created successfully']);
    }
    protected function storeUser($request){
        $request->validate([
            'firstName'=>'required',
            'lastName'=>'required',
            'email'=>'required|email|unique:users,email',
            'phone'=>'required|unique:users,phone',
            'password'=>'required|confirmed|min:6',
            'role'=>'required',
        ]);
        $user = new User();
        $user->firstName = $request->firstName;
        $user->lastName = $request->lastName;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password);
        $user->save();
        $user->assignRole($request->role);
    }
    public function storeOneFile($file,$element,$fileType){
        $name =$file->getClientOriginalName();
        $unique = uniqid();
         $element->files()->create(
                    ['url' =>'/'.$fileType.'/'.$unique.$name,
                        'type' => $fileType]
        );
        $file->move(public_path('/'.$fileType),$unique.$name);
    }
}
