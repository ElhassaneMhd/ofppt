<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DemandsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'formLogin'])->name('formLogin');
    Route::POST('/admin/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth')->group(function () {
    Route::POST('/admin/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/admin/{data}/multiple/{action}', [GeneralController::class, 'multipleAction']);
    Route::get('/admin/{data}/trashed', [GeneralController::class, 'trashed'])->name('trashed');

    Route::inertia('/admin/dashboard', 'Admin/Dashboard/Dashboard')->name('dashboard');
    $resources = [
        'filieres' => FilieresController::class,
        'articles' => ArticlesController::class,
        'demands' => DemandsController::class,
        'events' => EventsController::class,
        'users' => UsersController::class,
    ];

    foreach ($resources as $resource => $controller) {
        Route::resource('/admin/' . $resource, $controller)->names([
            'index' => $resource . '.index',
            'edit' => $resource . '.edit',
            'show' => $resource . '.show',
            'create' => $resource . '.create',
            'destroy' => $resource . '.destroy',
        ]);
        
        Route::post('/admin/'.$resource.'/multiple/delete', [ApiController::class, 'multipleAction'])->name($resource.'.multiple.delete');
        if(in_array($resource, ['articles', 'filieres','events'])){
            Route::post('/admin/'.$resource.'/multiple/toggle', [ApiController::class, 'multipleAction'])->name($resource.'.multiple.toggle');
        }
    }

});
