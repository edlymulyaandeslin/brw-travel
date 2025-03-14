<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CargoBooking extends Model
{
    protected $guarded = ['id'];

    public const PENDING = "Pending";
    public const CONFIRMED = "Confirmed";
    public const COMPLETED = "Completed";
    public const CANCELLED = "Cancelled";

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cargoPackage()
    {
        return $this->belongsTo(CargoPackage::class);
    }
}
