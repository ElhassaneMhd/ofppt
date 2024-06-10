<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DemandsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [GeneralController::class, 'login'])->name('formLogin');
    Route::POST('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth')->group(function () {
    Route::POST('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::inertia('/dashboard', 'Dashboard/Dashboard')->name('dashboard');
    Route::post('/{data}/multiple/{action}', [GeneralController::class, 'multipleAction']);
    Route::get('/{data}/trashed', [GeneralController::class, 'trashed'])->name('trashed');
    $resources = [
        'filieres' => FilieresController::class,
        'articles' => ArticlesController::class,
        'demands' => DemandsController::class,
        'events' => EventsController::class,
        'users' => UsersController::class,
        'roles' => RolesController::class,
    ];

    foreach ($resources as $resource => $controller) {
        Route::resource('/' . $resource, $controller)->names([
            'index' => $resource . '.index',
            'show' => $resource . '.show',
            'edit' => $resource . '.edit',
            'create' => $resource . '.create',
            'destroy' => $resource . '.destroy',
        ]);
        Route::post('/'.$resource.'/multiple/delete', [ApiController::class, 'multipleAction'])->name($resource.'.multiple.delete');
        if(in_array($resource, ['articles', 'filieres','events'])){
            Route::post('/'.$resource.'/multiple/toggle', [ApiController::class, 'multipleAction'])->name($resource.'.multiple.toggle');
        }
    }

});
