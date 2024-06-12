<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;



// Redirect to dashboard
Route::get('/admin', function () {
    return redirect('/admin/dashboard');
});

Route::get('/home', [HomeController::class, 'index'])->name('home.index');

Route::fallback(function () {
    return inertia('NotFound');
});

require __DIR__.'/spatie.php';
require __DIR__.'/auth.php';
