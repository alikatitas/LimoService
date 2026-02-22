<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
protected $fillable = [
    'car_id', 'customer_name', 'customer_email', 'customer_phone', 
    'pickup_address', 'destination_address', 'distance', 
    'passenger_count', 'total_price', 'pickup_time', 
    'flight_number', 'notes', 'status'
];

public function car() {
    return $this->belongsTo(Car::class);
}
}
