<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\File ;
use App\Models\Year;
use App\Traits\Update;
use Illuminate\Http\Request;
use App\Traits\Delete;
use App\Traits\Get;
use App\Traits\Restore;
use App\Traits\Store;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class EvenementsController extends Controller{
    use  Get,Store,Restore,Delete,Update;
    public function index(Request $request){
            $events = Evenement::all();
            $events = $this->refactorManyElements($events,'evenements');
            $trashedEvents = Evenement::onlyTrashed()->get();
            return Inertia::render('Events/Index', compact('events','trashedEvents'));
        }
    public function create(){
            $years = Year::all();
            $activeYear = Year::active()->get()[0];
            if  (session::missing('YearActive')) {
            session(['YearActive' => $activeYear]);
            }
            return Inertia::render('Events/Index', compact('years'));
        }
    public function store(Request $request){
        $this->storeEvent($request);
        return redirect()->route('evenements.index');
    }
    public function show(string $id){
        $evenement = Evenement::findOrFail($id);
        $evenement = $this->refactorEvent($evenement);
        return Inertia::render('Events/Show', compact('event'));
    }
    public function edit(string $id){
        $evenement = Evenement::findOrFail($id);
        $evenement = $this->refactorEvent($evenement);
        $year = Year::all();
        return Inertia::render('Events/Edit', compact('year','event'));
    }
    public function update(Request $request, string $id) {
            $evenement = Evenement::findOrFail($id);
            $this->updateEvent($request,$evenement);
           return to_route('events.index');
    }
    public function destroy(string $id) {
        $this->destroyElement(Evenement::class, $id);
           return to_route('events.index');
    }
    public function trash(){
    //index of trashed events
            $evenements = Evenement::all();
            $trashedEvenements = Evenement::onlyTrashed()->get();
            return Inertia::render('Events/Show', [$evenements,$trashedEvenements]);
        }
    public function forceDelete(string $id){
            //Force delete from trash
            $this->forceDeleteData(Evenement::class, $id);
           return to_route('events.index');
        }
    public function restore(string $id){
        //restore events from trash
        $this->restoreData(Evenement::class, $id);
           return to_route('events.index');
    }
}
