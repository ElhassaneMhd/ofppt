<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class EventsController extends Controller{
    public function index(Request $request){
            $events = Event::all();
            $events = $this->refactorManyElements($events,'events');
            $trashedEvents = Event::onlyTrashed()->get();
            $formationYears = Year::all();
            return Inertia::render('Events/Index', compact('events','trashedEvents','formationYears'));
        }
    public function create(){
            $formationYears = Year::all();
            return Inertia::render('Events/Create', compact('formationYears'));
        }
    public function store(Request $request){
        $this->storeEvent($request);
        return redirect()->route('events.index');
    }
    public function show(string $id){
        $event = Event::findOrFail($id);
        $event = $this->refactorEvent($event);
        return Inertia::render('Events/Show', compact('event'));
    }
    public function edit(string $id){
        $event = Event::findOrFail($id);
        $event = $this->refactorEvent($event);
        $formationYears = Year::all();
        return Inertia::render('Events/Edit', compact('formationYears','event'));
    }
    public function update(Request $request, string $id) {
            $event = Event::findOrFail($id);
            $this->updateEvent($request,$event);
          // return to_route('events.index');
    }
    public function destroy(string $id) {
        $this->destroyElement(Event::class, $id);
           return to_route('events.index');
    }
    public function trash(){
    //index of trashed events
            $events = Event::all();
            $trashedEvents = Event::onlyTrashed()->get();
            return Inertia::render('Events/Show', [$events,$trashedEvents]);
        }
    public function forceDelete(string $id){
            //Force delete from trash
            $this->forceDeleteData(Event::class, $id);
           return to_route('events.index');
        }
    public function restore(string $id){
        //restore events from trash
        $this->restoreData(Event::class, $id);
           return to_route('events.index');
    }
}
