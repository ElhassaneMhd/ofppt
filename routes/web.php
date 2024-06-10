<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\DemandController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\apiController;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;




// Redirect to dashboard
Route::get('/', function () {
    return redirect('/dashboard');
});

Route::inertia('/dashboard', 'Dashboard/Dashboard');
Route::post('/{data}/multiple/{action}', [apiController::class, 'multipleAction']);
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
    Route::post('/'.$resource.'/multiple/delete', [apiController::class, 'multipleAction'])->name($resource.'.multiple.delete');
    Route::post('/'.$resource.'/multiple/show', [apiController::class, 'multipleAction'])->name($resource.'.multiple.show');
    Route::post('/'.$resource.'/multiple/hide', [apiController::class, 'multipleAction'])->name($resource.'.multiple.hide');
}
// Route::resource('/roles', RolesController::class);


Route::fallback(function () {
    return inertia('NotFound');
});
