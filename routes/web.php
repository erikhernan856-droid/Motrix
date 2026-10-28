<?php

use App\Http\Controllers\ClientController;
use \App\Models\Client;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\EmpleadoController;

Route::resource('empleados', EmpleadoController::class)->except('show');

Route::resource('vehicles', VehicleController::class)->except('show');

Route::inertia('/', 'welcome')->name('home');

Route::resource('vehicles', VehicleController::class)->except('show');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('dashboard', [
            'recentClients' => Client::latest()->take(5)->get(),
        ]);
    })->name('dashboard');

    Route::resource('clients', ClientController::class);
    
    Route::resource('services', ServiceController::class);
});

require __DIR__.'/settings.php';