<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\DemandController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;




// Redirect to dashboard
Route::get('/', function () {
    return redirect('/dashboard');
});

Route::inertia('/dashboard', 'Dashboard/Dashboard');

$resources = [
    'filieres' => FilieresController::class,
    'articles' => ArticlesController::class,
    'demands' => DemandController::class,
    'events' => EventsController::class,
    'users' => UsersController::class,
];

foreach ($resources as $resource => $controller) {
    Route::resource('/' . $resource, $controller)->names([
        'index' => $resource . '.index',
        'show' => $resource . '.show',
        'edit' => $resource . '.edit',
        'create' => $resource . '.create',
        'destroy' => $resource . '.destroy',
    ]);
}
// Route::resource('/roles', RolesController::class);


Route::fallback(function () {
    return inertia('NotFound');
});
