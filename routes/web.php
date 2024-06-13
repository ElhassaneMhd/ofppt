<?php

use App\Http\Controllers\ArticlesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\FilieresController;



// Redirect to dashboard

Route::get('/', function () {
    return redirect('/home');
});
Route::get('/home', [HomeController::class, 'index'])->name('home.home');
Route::get('/{data}', [HomeController::class, 'dataPage'])->name('data.page');
Route::get('/{data}/{id}', [HomeController::class, 'dataDetails'])->name('data.details');
Route::inertia('/contact', 'Contact')->name('home.contact');

Route::get('/admin', function () {
    return redirect('/admin/dashboard');
});

Route::fallback(function () {
    return inertia('NotFound');
});

//require __DIR__.'/spatie.php';
require __DIR__ . '/auth.php';
