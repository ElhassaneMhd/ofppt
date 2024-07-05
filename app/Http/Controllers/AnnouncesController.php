<?php

namespace App\Http\Controllers;

use App\Models\Announce;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncesController extends Controller
{
    public function index(){
        $annouces = $$this->refactorManyElements(Announce::all(), 'annouces', 'annouces');
        return Inertia::render('Back_Office/Annoounces/Index', compact('announces'));
    }
    public function create(){
        return Inertia::render('Back_Office/Annoounces/Create');
    }

    public function store(Request $request){
        $this->storeAnnounce($request);
        return to_route('announces.index');
    }
    public function show(string $id){
        //
    }
   public function edit(string $id){
        $announce = Announce::find($id);
        $announce = $this->refactorAnnounce($announce);
        return Inertia::render('Back_Office/Announces/Show',compact('announce'));
    }

    public function update(Request $request, string $id){
        $announce = Announce::find($id);
        $announce->text = $request->text;
        $announce->visibility = $request->visibility;
        $announce->save();
        return to_route('announces.index');

    }
    public function destroy(string $id){
        $this->destroyElement(Announce::class, $id);
        return to_route('articles.index');
    }
}
