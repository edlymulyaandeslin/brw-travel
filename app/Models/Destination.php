<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Destination extends Model
{
    /** @use HasFactory<\Database\Factories\DestinationFactory> */
    use HasFactory;
    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        static::updating(function ($destination) {
            if ($destination->isDirty('image')) {
                if ($destination->getOriginal('image')) {
                    Storage::delete($destination->getOriginal('image'));
                }
            }
        });

        static::deleting(function ($destination) {
            if ($destination->image) {
                Storage::delete($destination->image);
            }
        });
    }

    public function travelPackages()
    {
        return $this->hasMany(TravelPackage::class);
    }
}