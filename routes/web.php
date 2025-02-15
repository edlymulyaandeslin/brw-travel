<?php

use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Destination;
use Illuminate\Http\Request;
use App\Models\TravelPackage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    $destinations = Destination::latest()->get();

    return Inertia::render('HomePage', [
        "destinations" => $destinations
    ]);
})->name("home");

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




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route list booking
    Route::get("/mybooking", function () {
        $bookings = Booking::with(["travelPackage.destination", "payment"])->where("user_id", Auth::user()->id)->latest()->get();
        return Inertia::render("Booking/Index", [
            'bookings' => $bookings
        ]);
    })->name("mybooking");

    Route::get("/booking/{travel_package:slug}/create", function (TravelPackage $travelPackage) {
        $travelPackage->load(["destination", "category"]);

        return Inertia::render("Booking/Create", [
            'travelPackage' => $travelPackage
        ]);
    })->name("booking.create");
});

Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__ . '/auth.php';