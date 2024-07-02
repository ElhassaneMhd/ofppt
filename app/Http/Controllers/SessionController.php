<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SessionController extends Controller
{

    public function index(Request $request) {
        $sessions = Session::all();
        $sessions = $this->refactorManyElements($sessions, 'sessions');
        return Inertia::render('Back_Office/Sessions/Index', compact('sessions'));
    }
    public function show(string $id){
        $session =   Session::findOrFail($id);
        $session = $this->refactorSession($session);
        return Inertia::render('Back_Office/Sessions/Show', compact('session'));
    }

    public function destroy(string $id) {
        $this->destroyElement(Session::class, $id);
        return redirect()->route("sessions.index");
    }
    public function trash(){
        $sessions = Session::all();
        $trashedSessions = Session::onlyTrashed()->get();
        return Inertia::render('Back_Office/Sessions/Trash', compact('sessions', 'trashedSessions'));
    }
    public function forceDelete(string $id)
    {
        $this->forceDeleteData(Session::class, $id);
        return to_route("sessions.index");
    }
    public function restore(string $id)
    {
        $this->restoreData(Session::class, $id);
        return to_route("sessions.index");
    }
}

