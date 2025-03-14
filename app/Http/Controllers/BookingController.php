<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\CargoBooking;
use App\Models\CargoPackage;
use Illuminate\Http\Request;
use App\Models\TravelPackage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(["travelPackage.destination", "travelPackage.car", "payment"])->where("user_id", Auth::user()->id)->latest()->get();

        $cargoBookings = CargoBooking::with(["cargoPackage.destination", "cargoPackage.car"])->where("user_id", Auth::user()->id)->latest()->get();

        return Inertia::render("Booking/Index", [
            'bookings' => $bookings,
            'cargoBookings' => $cargoBookings,
        ]);
    }

    public function create($slug)
    {
        $travelPackage = TravelPackage::with(["destination", "category", "car"])->where("slug", $slug)->first();

        if ($travelPackage) {
            $bookingSeats = BookingSeat::where("travel_package_id", $travelPackage->id)->get();

            return Inertia::render("Booking/Create", [
                'travelPackage' => $travelPackage,
                "bookingSeats" => $bookingSeats,
            ]);
        } else {
            $cargoPackage = CargoPackage::with(["destination", "category", "car"])->where("slug", $slug)->first();

            return Inertia::render("Booking/CargoCreate", [
                'cargoPackage' => $cargoPackage,
            ]);
        }
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

    public function cargo_store(Request $request)
    {
        $tempValue = [
            "user_id" => Auth::user()->id,
            "cargo_package_id" => $request->cargo_package_id,
            "product_name" => $request->product_name,
            "size" => $request->size,
            "sender" => $request->sender,
            "sender_address" => $request->sender_address,
            "recipient" => $request->recipient,
            "recipient_address" => $request->recipient_address,
            "delivery_date" => $request->delivery_date,
            "notes" => $request->notes,
            "amount" => $request->amount,
            "status" => CargoBooking::PENDING,
        ];

        $cargoPackage = CargoPackage::find($tempValue['cargo_package_id']);
        $cargoPackage->capacity_gram -= $tempValue['size'];
        $cargoPackage->save();

        CargoBooking::create($tempValue);

        return redirect()->route("mybooking")->with("success", "Cargo Booking successfully created");
    }
}