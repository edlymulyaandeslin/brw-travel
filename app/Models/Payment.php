<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;

    protected $guarded = ['id'];

    // payment status
    public const DP = 'DP';
    public const PAID = 'Paid';
    public const UNPAID = 'Unpaid';

    // payment method
    public const TRANSFER = 'Transfer';
    public const CASH = 'Cash';

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}