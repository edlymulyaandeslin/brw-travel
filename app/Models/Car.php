<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Car extends Model
{
    use HasFactory;

    protected $guarded = [];
    public const MANUAL = "manual";
    public const AUTOMATIC = "automatic";

    public function travelPackage()
    {
        return $this->hasOne(TravelPackage::class, "car_id", "id");
    }
}