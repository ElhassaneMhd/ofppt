<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



// Redirect to dashboard
Route::get('/admin', function () {
    return redirect('/admin/dashboard');
});

Route::fallback(function () {
    return inertia('NotFound');
});

require __DIR__.'/spatie.php';
require __DIR__.'/auth.php';
