<?php

use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Destination;
use Illuminate\Http\Request;
use App\Models\TravelPackage;
use Illuminate\Support\Facades\DB;
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

    Route::post("/booking", function (Request $request) {
        $userId = Auth::user()->id;
        $travelPackageId = $request->travel_package_id;
        $bookingDate = $request->booking_date;
        $passengerCount = $request->passenger_count;
        // $price = $request->price;
        $amount = $request->total_amount;
        $payment_method = $request->payment_method;
        $payment_status = $request->payment_status;


        DB::beginTransaction();
        try {
            // create booking
            $booking = Booking::create([
                "user_id" => $userId,
                "travel_package_id" => $travelPackageId,
                "booking_date" => $bookingDate,
                "passenger_count" => $passengerCount,
                "status" => Booking::PENDING,
            ]);

            // create payment
            $booking->payment()->create([
                "amount" => $amount,
                "payment_method" => $payment_method,
                "status" => $payment_status,
            ]);

            // decrement available capacity
            $travelPackage = TravelPackage::find($travelPackageId);

            if ($travelPackage->available_capacity < $passengerCount) {
                throw new \Exception("Not enough capacity. Only " . $travelPackage->available_capacity . " slots available.");
            }

            $travelPackage->available_capacity -= $passengerCount;
            $travelPackage->save();

            DB::commit();

            session()->flash("success", "Booking successfully created");

            return redirect()->route(route: "mybooking");
        } catch (\Exception $e) {
            DB::rollBack();
            session()->flash("error", $e->getMessage());
        }
    })->name("booking.store");
});

Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__ . '/auth.php';