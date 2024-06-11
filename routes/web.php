<?php


use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Redirect to dashboard
Route::get('/', function () {
    return redirect('/admin/login');
});

Route::fallback(function () {
    return inertia('NotFound');
});

require __DIR__.'/spatie.php';
require __DIR__.'/auth.php';
