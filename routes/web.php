<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\FilieresController;




Route::get('/', function () {
    return redirect('/home');
});
Route::get('/home', [HomeController::class, 'index'])->name('home.home');
Route::get('/filieres', [FilieresController::class, 'userIndex'])->name('home.filieres');
Route::get('/blog', [ArticlesController::class, 'userIndex'])->name('home.blog');
Route::get('/events', [EventsController::class, 'userIndex'])->name('home.events');
Route::inertia('/contact', 'Contact')->name('home.contact');

Route::fallback(function () {
    return inertia('NotFound');
});

//require __DIR__.'/spatie.php';
require __DIR__.'/auth.php';
