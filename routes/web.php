<?php

use Inertia\Inertia;
use App\Models\Destination;
use Illuminate\Http\Request;
use App\Models\TravelPackage;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    $destinations = Destination::latest()->get();

    return Inertia::render('HomePage', [
        "destinations" => $destinations
    ]);
});

Route::get("/destination/{destination:slug}", function (Destination $destination) {
    $destination->load("travelPackages.category");

    return Inertia::render("Destination/Show", [
        "destination" => $destination,
    ]);
})->name("destination.show");

Route::post("/find-packages", function (Request $request) {
    $destination = $request->destination;
    $check_in = $request->check_in;
    $check_out = $request->check_out;
    $travelers = $request->travelers;

    $travelPackages = TravelPackage::with(["destination", "category"])->whereHas("destination", function ($query) use ($destination) {
        $query->where("name", "like", "%$destination%");
    })->whereBetween("start_date", [$check_in, $check_out])
        ->where("capacity", ">=", $travelers)
        ->get();

    return Inertia::render("Destination/Packages", [
        "travelPackages" => $travelPackages
    ]);
})->name("findpackages");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__ . '/auth.php';