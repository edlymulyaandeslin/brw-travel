<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TravelPackage extends Model
{
    /** @use HasFactory<\Database\Factories\TravelPackageFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        "start_date" => "datetime",
        "end_date" => "datetime",
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class, "car_id", "id");
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}