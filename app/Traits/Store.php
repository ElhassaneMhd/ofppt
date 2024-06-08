<?php

namespace App\Traits;
use App\Models\Article;
use App\Models\Evenement;
use App\Models\Filier;
use Illuminate\Support\Facades\Session;

trait Store{

    protected function storeArticle($request){
          $request->validate([
            'title'=>'required',
            'description'=>'required',
            'date'=>'required|date',
            'categorie'=>'required',
            'user_id'=>'required|exists:users,id',
            'year_id'=>'required|exists:years,id',
            'files.*' => 'file|mimes:doc,DOC,DOCX,docx,PDF,pdf,jpg,JPG,jpeg,JPEG,PNG,png,svg,SVG|max:5120',
            ]);
        $article = new Article();
        $article->title = $request->title;
        $article->details = $request->description;
        $article->date = $request->date;
        $article->visibility =$request->visibility;
        $article->categorie = $request->categorie;
        $article->tags = $request->tags??'';
        $article->user_id = auth()->user()->id??1;
        $article->year_id = Session::get('YearActive')->id??1;
        $article->save();
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                $this->storeOneFile($file,$article,'article');
            }
        }

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
    protected function storeEvent($request){
        $event = Evenement::create([
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
         if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                $this->storeOneFile($file,$event,'article');
            }
        }
        return response()->json(['message' => 'Event created successfully']);
    }
    protected function storeFiliere($request){
        $filier = Filier::create([
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
         if ($request->has('files') && count($request->files) > 0) {
            foreach ($request->files as $file) {
                $this->storeOneFile($file,$filier,'article');
            }
        }
        return response()->json(['message' => 'Filiere created successfully']);
    }
}
