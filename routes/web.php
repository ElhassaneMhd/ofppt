<?php

use Illuminate\Support\Facades\Route;



Route::inertia('/', 'Dashboard');
Route::inertia('/dashboard', 'Dashboard');
Route::inertia('/filieres', 'Filieres');
Route::inertia('/articles', 'Articles');
Route::inertia('/applications', 'Applications');
Route::inertia('/events', 'Events');
Route::inertia('/users', 'Users');
Route::inertia('/roles', 'Roles');


Route::fallback(function () {
    return inertia('NotFound');
});
