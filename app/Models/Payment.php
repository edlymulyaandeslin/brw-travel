<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    public  const PAID = 'Paid';
    public  const UNPAID = 'Unpaid';

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}