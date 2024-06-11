<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DemandsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'formLogin'])->name('formLogin');
    Route::POST('/admin/login', [AuthController::class, 'login'])->name('login');
    // Route::get('/', [HomeController::class, 'home'])->name('home');
    // Route::get('/{data}/{id}', [HomeController::class, 'elementById'])->name('elementById');
    // Route::get('/{sector}/filieres', [HomeController::class, 'sectorFilieres'])->name('sectorFilieres');
});

Route::middleware('auth')->group(function () {
    Route::POST('/admin/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/admin/{data}/multiple/{action}', [GeneralController::class, 'multipleAction']);
    Route::get('/admin/{data}/trashed', [GeneralController::class, 'trashed'])->name('trashed');

    Route::inertia('/admin/settings/{tab}', 'Admin/Settings/Settings')->name('settings');
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
        Route::delete('/admin/' . $resource . '/{id}/forceDelete', [$controller, 'forceDelete'])->name($resource . '.forceDelete');
        Route::get('/admin/' . $resource . '/{id}/restore', [$controller, 'restore'])->name($resource . '.restore');

        foreach(['restore','delete','destroy'] as $action){
            Route::post('/admin/'.$resource.'/multiple/'.$action,[GeneralController::class, 'multipleAction'])->name($resource.'.multiple'.$action);
        }
        if(in_array($resource, ['articles', 'filieres','events'])){
            Route::post('/admin/'.$resource.'/multiple/toggle', [GeneralController::class, 'multipleAction'])->name($resource.'.multiple.toggle');
        }
    }

});
