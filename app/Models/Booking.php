<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    /** @use HasFactory<\Database\Factories\BookingFactory> */
    use HasFactory;

    protected $guarded = ['id'];
    public const PENDING = "Pending";
    public const CONFIRMED = "Confirmed";
    public const COMPLETED = "Completed";
    public const CANCELLED = "Cancelled";

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function travelPackage()
    {
        return $this->belongsTo(TravelPackage::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}