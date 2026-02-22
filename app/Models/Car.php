<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

protected $fillable = [
    'model_name',
    'capacity',
    'price_per_km',
    'image',
    'description',  
    'features',         
    'luggage_capacity',
    'base_fare',
    'base_km_limit'
];

protected $casts = [
    'features' => 'array',
];
}
