<?php

use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return redirect('/dashboard');
});
Route::inertia('/dashboard', 'Dashboard/Dashboard');
Route::get('/filieres', function () {
    $filieres = \App\Models\Filier::all();
    return inertia('Filieres/Index', ['filieres' => $filieres]);
});
Route::inertia('/articles', 'Articles/Articles');
Route::inertia('/demands', function () {
    $demands = \App\Models\Demande::all();
    return inertia('Demands/Index', ['demands' => $demands]);
});
Route::inertia('/events', 'Events/Events');
Route::inertia('/users', 'Users/Users');
Route::inertia('/roles', 'Roles/Roles');


Route::fallback(function () {
    return inertia('NotFound');
});
