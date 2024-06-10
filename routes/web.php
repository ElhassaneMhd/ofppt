<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DemandsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Redirect to dashboard
Route::get('/', function () {
    return redirect('/login');
});

Route::fallback(function () {
    return inertia('NotFound');
});

require __DIR__.'/spatie.php';
require __DIR__.'/auth.php';
