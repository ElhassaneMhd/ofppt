<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\GeneralController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/demande/send', [ApiController::class, 'storeDemands']);
Route::get('/sectors', [ApiController::class, 'getSector']);
Route::get('/stats', [GeneralController::class, 'stats']);
Route::get('/categorie', [ApiController::class, 'getCategorie']);
Route::get('/{data}', [ApiController::class, 'index']);
Route::get('/{data}/{id}', [ApiController::class, 'show']);
