<?php

use App\Http\Controllers\AnnouncesController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DemandsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\FilieresController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SessionsController;
use App\Http\Controllers\UsersController;
use App\Models\Year;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'formLogin'])->name('formLogin');
    Route::POST('/admin/login', [AuthController::class, 'login'])->name('login');
});
Route::get('/admin', function () {
    return redirect('/admin/dashboard');
});
Route::middleware('auth')->prefix('/admin')->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'dashboard'])->name('dashboard');

    Route::put('/session/year/{id}', function ($id) {
        request()->session()->forget('activeYear');
        session(['activeYear'=>Year::find($id)]);
    });

    Route::get('/settings/{tab?}', [GeneralController::class, 'settings'])->name('settings');
    Route::put('/settings', [GeneralController::class, 'setAppSettings'])->name('settings.update');

    Route::POST('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/user', [AuthController::class, 'user'])->name('user');
    Route::post('/user', [UsersController::class, 'updatePassword'])->name('password.update');
    Route::put('/user', [UsersController::class, 'updateInfo'])->name('user.update');

    Route::post('/{data}/multiple/{action}', [GeneralController::class, 'multipleAction']);
    Route::get('/{data}/trashed', [GeneralController::class, 'trashed'])->name('trashed');

    $resources = [
        'filieres' => FilieresController::class,
        'articles' => ArticlesController::class,
        'demands' => DemandsController::class,
        'events' => EventsController::class,
        'users' => UsersController::class,
        'sessions'=>SessionsController::class,
        'announces'=>AnnouncesController::class
    ];
    foreach ($resources as $resource => $controller) {
        Route::resource('/' . $resource, $controller);
        Route::delete('/' . $resource . '/{id}/forceDelete', [$controller, 'forceDelete'])->name($resource . '.forceDelete');
        Route::post('/' . $resource . '/{id}/restore', [$controller, 'restore'])->name($resource . '.restore');

        foreach (['restore', 'forceDelete', 'destroy'] as $action) {
            Route::post('/' . $resource . '/multiple/' . $action, [GeneralController::class, 'multipleAction'])->name($resource . '.multiple.' . $action);
        }
        if (in_array($resource, ['articles', 'filieres', 'events','announces'])) {
            Route::post('/' . $resource . '/multiple/toggle', [GeneralController::class, 'multipleAction'])->name($resource . '.multiple.toggle');
        }
    }

});
