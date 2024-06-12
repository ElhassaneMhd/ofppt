<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\FilieresController;



// Redirect to dashboard
Route::get('/admin', function () {
    return redirect('/admin/dashboard');
});

Route::get('/home', [HomeController::class, 'index'])->name('home.index');
Route::get('/filieres', [FilieresController::class, 'userIndex'])->name('user_fillier.index');
Route::get('/events', [EventsController::class, 'userIndex'])->name('user_events.index');

Route::fallback(function () {
    return inertia('NotFound');
});

//require __DIR__.'/spatie.php';
require __DIR__.'/auth.php';
