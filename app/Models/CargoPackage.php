<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CargoPackage extends Model
{
    protected $guarded = ['id'];

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
}