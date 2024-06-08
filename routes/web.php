<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\DemandController;
use App\Http\Controllers\EvenementsController;
use App\Http\Controllers\FiliersController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;




// Redirect to dashboard
Route::get('/', function () {
    return redirect('/dashboard');
});

Route::inertia('/dashboard', 'Dashboard/Dashboard');
Route::resource('/filieres', FiliersController::class)->names([
    'index' => 'filieres.index',
    'show' => 'filieres.show',
]);

Route::resource('/articles', ArticlesController::class)->names([
    'index' => 'articles.index',
    'show' => 'articles.show',
]);

Route::resource('/demands', DemandController::class)->names([
    'index' => 'demands.index',
    'show' => 'demands.show',
]);

Route::resource('/events', EvenementsController::class)->names([
    'index' => 'events.index',
    'show' => 'events.show',
]);

Route::resource('/users', UsersController::class)->names([
    'index' => 'users.index',
    'show' => 'users.show',
]);
// Route::resource('/roles', RolesController::class);


Route::fallback(function () {
    return inertia('NotFound');
});
