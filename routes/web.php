<?php

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Booking;
use App\Models\Destination;
use App\Models\CargoBooking;
use App\Models\CargoPackage;
use Illuminate\Http\Request;
use App\Models\TravelPackage;
use App\Exports\ExportLaporan;
use App\Exports\ExportCargoReport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    $destinations = Destination::latest()->get();

    return Inertia::render('HomePage', [
        "destinations" => $destinations
    ]);
})->name("home");

Route::get("/destination/{destination:slug}", function (Destination $destination) {
    $destination->load(["travelPackages.category", "travelPackages.car", "cargoPackages.category", "cargoPackages.car"]);

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
        ->where("available_capacity", ">=", $travelers)
        ->get();

    $check_in_date = Carbon::parse($request->check_in)->format('Y-m-d');
    $check_out_date = Carbon::parse($request->check_out)->format('Y-m-d');

    $cargoPackages = CargoPackage::with(["destination", "category"])->whereHas("destination", function ($query) use ($destination) {
        $query->where("name", "like", "%$destination%");
    })->whereBetween("departure_date", [$check_in_date, $check_out_date])
        ->get();

    return Inertia::render("Destination/Packages", [
        "travelPackages" => $travelPackages,
        "cargoPackages" => $cargoPackages
    ]);
})->name("findpackages");

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route list booking
    Route::get("/mybooking", [BookingController::class, "index"])->name("mybooking");

    Route::get("/booking/{slug}/create", [BookingController::class, "create"])->name("booking.create");

    Route::post("/booking", [BookingController::class, "store"])->name("booking.store");

    Route::post("/cargo-booking", [BookingController::class, "cargo_store"])->name("cargo-booking.store");

    Route::get("/admin/export-laporan", function () {
        $query = Booking::with(['user', 'travelPackage', 'payment']);

        // Ambil filter dari request
        $startDate = request('start_date');
        $endDate = request('end_date');

        if ($startDate && $endDate) {
            $query->whereBetween('booking_date', [$startDate, $endDate]);
        }

        $reportData = $query->whereIn("status", ["Confirmed", "Completed"])->get();

        set_time_limit(300);

        return Excel::download(new ExportLaporan($reportData), 'Laporan-Booking.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    })->name("laporan.export");

    Route::get("/admin/export-cargo-laporan", function () {
        $query = CargoBooking::with(['user', 'cargoPackage']);

        // Ambil filter dari request
        $startDate = request('start_date');
        $endDate = request('end_date');

        if ($startDate && $endDate) {
            $query->whereBetween('delivery_date', [$startDate, $endDate]);
        }

        $reportData = $query->whereIn("status", ["Confirmed", "Completed"])->get();

        set_time_limit(300);

        return Excel::download(new ExportCargoReport($reportData), 'Laporan-Cargo-Booking.xlsx', \Maatwebsite\Excel\Excel::XLSX);
    })->name("cargo-laporan.export");
});

Route::fallback(function () {
    return Inertia::render('NotFound');
});

require __DIR__ . '/auth.php';
