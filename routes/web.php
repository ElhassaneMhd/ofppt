<?php

use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Redirect to dashboard
Route::get('/admin', function () {
    return redirect('/admin/dashboard');
});

Route::fallback(function () {
    return inertia('NotFound');
});

require __DIR__.'/spatie.php';
require __DIR__.'/auth.php';
