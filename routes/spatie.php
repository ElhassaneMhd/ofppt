<?php
use App\Http\Controllers\RolesController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\UsersController;
// Route::middleware(['auth','role:super-admin|admin'])->group(function () {
    // users routes
    Route::post('/users/{user}/roles', [UsersController::class, 'assignRole'])->name('users.roles');
    Route::delete('/users/{user}/roles/{role}', [UsersController::class, 'removeRole'])->name('users.roles.remove');
    Route::post('/users/{user}/permissions', [UsersController::class, 'givePermission'])->name('users.permissions');
    Route::delete('/users/{user}/permissions/{permission}', [UsersController::class, 'revokePermission'])->name('users.permissions.revoke');

     //roles routes
    Route::post('/roles/{role}/givePermission', [RolesController::class, 'givePermission'])->name('roles.permissions');
    Route::delete('/roles/{role}/revokePermission/{permission}', [RolesController::class, 'revokePermission'])->name('roles.permissions.revoke');
    Route::resource('/roles', RolesController::class);

    //permissions routes
    Route::resource('/permissions', PermissionsController::class);


// });
