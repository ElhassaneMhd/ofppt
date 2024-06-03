<?php
use App\Http\Controllers\apiController;
use Illuminate\Support\Facades\Route;

Route::get('/{data}', [apiController::class, 'index']);
Route::get('/{data}/{id}', [apiController::class, 'show']);