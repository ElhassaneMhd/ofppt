<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/{data}', [ApiController::class, 'index']);
Route::get('/{data}/{id}', [ApiController::class, 'show']);
