<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;





Route::get('/', function () {
    return redirect('/home');
});
Route::get('/home', [HomeController::class, 'index'])->name('homepage');
Route::inertia('/contact','Front_End/Contact')->name('contact');
Route::post('/demands', [ApiController::class, 'storeDemands']);
Route::inertia('/about', 'Front_End/About')->name('about');

$routes = ['blog', 'events', 'filieres'];
foreach ($routes as $route) {
    Route::get('/' . $route . '/{id}', [HomeController::class, 'detailsPage'])->name('home.' . $route . '.details');
    Route::get('/' . $route, [HomeController::class, 'dataPage'])->name('home.' . $route);
}




Route::fallback(function () {
    return inertia('NotFound');
});

//require __DIR__.'/spatie.php';
require __DIR__ . '/auth.php';
