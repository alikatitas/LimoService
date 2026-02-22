<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Car;


Route::get('/', function () {
    return Inertia::render('Home', [
        'cars' => Car::all()
    ]);
});

Route::get('/about', function () {
    return inertia('About');
});

Route::get('/contact', function () {
    return inertia('Contact');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/booking', function () {
    return Inertia::render('Booking', [
        'cars' => Car::all() // Admin'den eklediğin araçları çeker
    ]);
});

Route::post('/bookings', [App\Http\Controllers\BookingController::class, 'store'])->name('bookings.store');
require __DIR__.'/auth.php';
