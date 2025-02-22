<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Booking;
use App\Models\BookingSeat;
use Illuminate\Http\Request;
use App\Models\TravelPackage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(["travelPackage.destination", "travelPackage.car", "payment"])->where("user_id", Auth::user()->id)->latest()->get();
        return Inertia::render("Booking/Index", [
            'bookings' => $bookings
        ]);
    }

    public function create(TravelPackage $travelPackage)
    {
        $travelPackage->load(["destination", "category", "car"]);

        $bookingSeats = BookingSeat::where("travel_package_id", $travelPackage->id)->get();

        return Inertia::render("Booking/Create", [
            'travelPackage' => $travelPackage,
            "bookingSeats" => $bookingSeats
        ]);
    }

    public function store(Request $request)
    {
        // payload db booking
        $userId = Auth::user()->id;
        $travelPackageId = $request->travel_package_id;
        $bookingDate = $request->booking_date;
        $passengerCount = $request->passenger_count;
        $notes = $request->notes;

        // $price = $request->price;

        // payload db payment
        $jumlahDp = $request->jumlah_dp;
        $amount = $request->total_amount;
        $payment_method = $request->payment_method;
        $buktiBayar = $request->bukti_bayar;
        $payment_status = $request->payment_status;

        // payload db booking_seats
        $seats = $request->seats;

        if ($buktiBayar) {
            $filename = str()->random(30) . "." . $buktiBayar->extension();
            $buktiBayar = $buktiBayar->storeAs("payments", $filename);
        }

        DB::beginTransaction();
        try {
            // create booking
            $booking = Booking::create([
                "user_id" => $userId,
                "travel_package_id" => $travelPackageId,
                "booking_date" => $bookingDate,
                "passenger_count" => $passengerCount,
                "status" => Booking::PENDING,
                "notes" => $notes,
            ]);

            // create payment
            $booking->payment()->create([
                "jumlah_dp" => $jumlahDp,
                "amount" => $amount,
                "payment_method" => $payment_method,
                "bukti_bayar" => $buktiBayar,
                "status" => $payment_status,
            ]);

            // create seats
            foreach ($seats as $seat) {
                $booking->seats()->create([
                    "seat_number" => $seat,
                    "travel_package_id" => $travelPackageId,
                ]);
            }

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
    }
}