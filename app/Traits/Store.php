<?php

namespace App\Traits;
use App\Models\Article;
use App\Models\Demand;
use App\Models\Event;
use App\Models\Setting;
use App\Models\User;
use App\Models\Filiere;
use App\Models\Year;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

trait Store{

    protected function storeArticle($request){
        $request->validate([
            'title'=>'required',
            'details'=>'required',
            'categorie'=>'required',
            'files.*' => 'file|mimes:doc,DOC,DOCX,docx,PDF,pdf,jpg,JPG,jpeg,JPEG,PNG,png,svg,SVG|max:5120',
        ]);
        $article = new Article();
        $article->title = $request->title;
        $article->details = $request->details;
        $article->date = Carbon::now();
        $article->visibility ='true';
        $article->categorie = $request->categorie;
        $article->tags = $request->tags;
        $article->user_id = auth()->user()->id??null;
        $article->year_id = Session::get('activeYear')->id??null;
        $article->save();
           if ($request->has('files') && count($request->files) > 0) {
             foreach ($request['files'] as $file) {
                    $this->storeOneFile($file,$article,'article');
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
            'upcoming' => $request->input('upcoming'),
            'visibility' => 'true',
            'tags' => $request->input('tags'),
            'year_id' => Session::get('activeYear')->id??null,
        ]);
        if ($request->has('files') && count($request->files) > 0) {
             foreach ($request['files'] as $file) {
                    $this->storeOneFile($file,$event,'event');
            }
        }
    }
    protected function storeFiliere($request){
        $filiere = Filiere::create([
            'title' => $request->input('title'),
            'details' => $request->input('details'),
            'isActive' => $request->input('isActive')??0,
            'visibility' => 'true',
            'max_stagiaires' => $request->input('max_stagiaires'),
            'sector' => $request->input('sector'),
            'tags' => $request->input('tags'),
            'year_id' => Session::get('activeYear')->id??1,
        ]);
         if ($request->has('files') && count($request->files) > 0) {
             foreach ($request['files'] as $file) {
                    $this->storeOneFile($file,$filiere,'filiere');
            }
        }
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
    protected function storeDemand($request){
        $request->validate([
            'fullName'=>'required',
            'email'=>'required|email',
            'subject'=>'required',
            'message'=>'required',
        ]);
        if (Demand::create($request->all())) {
            return response()->json(["status" => "succsses", "message" => "demand sended"],200);
        } else {
            return response()->json(["status" => "error", "message" => "demand not sended"],400);
        }
    }
    public function storeOneFile($file,$element,$fileType){
        $name = str_replace(' ','',$file->getClientOriginalName());
        $unique = uniqid();
         $element->files()->create(
                    ['url' =>'/assets/'.$fileType.'/'.$unique.$name,
                        'type' => $fileType]
        );
        $file->move(public_path('/assets/'.$fileType),$unique.$name);
    }
     public function storAppSettings($request){
        $setting = Setting::first();
        if (!$setting){
            $setting = new Setting;
        }
        $setting->email = $request->input('email')?? $setting->email??null;
        $setting->phone =  $request->input('phone')??$setting->phone??null;
        $setting->facebook =  $request->input('facebook')??$setting->facebook??null;
        $setting->instagram =  $request->input('instagram')??$setting->instagram ??null;
        $setting->twitter =  $request->input('twitter')??$setting->twitter??null;
        $setting->youtube =  $request->input('youtube')?? $setting->youtube??null;
        $setting->linkedin =  $request->input('linkedin')??$setting->linkedin??null;
        $setting->maps =  $request->input('maps')??$setting->maps??null;
        $setting->location =  $request->input('location')??$setting->location??null;
        $setting->aboutDescription =  $request->input('aboutDescription')?? $setting->aboutDescription??null;
        $setting->save();
        if ($request->has('year_id')){
            $year = Year::findOrfail($request->input('year_id'));
            $years=Year::where('isActive','true')->get();
            foreach ($years as $oneYear) {
                $oneYear->isActive='false';
                $oneYear->save();
            }
            $year->isActive='true';
            $year->save();
        }
        if ($request->has('files') && count($request->files) > 0) {
             foreach ($request['files'] as $file) {
                    $this->storeOneFile($file,$setting,'logo');
            }
        }
    }
}
