<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Rezervasyon formunu ve araçları gösterir.
     */
    public function index()
    {
        return Inertia::render('Booking', [
            'cars' => Car::all()
        ]);
    }

    /**
     * Yeni bir rezervasyon oluşturur.
     */
    public function store(Request $request)
    {
        // 1. Veri Doğrulama (Validation)
        // Frontend'den gelen verilerin tam olduğunu garanti altına alıyoruz.
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email',
            'customer_phone' => 'required|string',
            'pickup_address' => 'required|string',
            'destination_address' => 'required|string',
            'distance' => 'required|numeric',
            'passenger_count' => 'required|integer|min:1',
            'pickup_time' => 'required',
            'flight_number' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        // 2. Fiyatı Backend Tarafında Tekrar Hesaplama
        // Bu adım, "total_price" alanının SQL hatası vermesini %100 engeller.
        $car = Car::findOrFail($request->car_id);
        
        $baseFare = (float) $car->base_fare;
        $kmLimit = (int) $car->base_km_limit;
        $perKmRate = (float) $car->price_per_km;
        $distance = (float) $request->distance;
        $paxCount = (int) $request->passenger_count;

        // Tek kişi için mesafe bazlı fiyat
        $pricePerPerson = $baseFare;
        if ($distance > $kmLimit) {
            $pricePerPerson += ($distance - $kmLimit) * $perKmRate;
        }

        // Toplam Fiyat = Kişi başı fiyat x Yolcu sayısı
        $calculatedTotalPrice = $pricePerPerson * $paxCount;

        // 3. Veritabanına Kayıt
        // Artık "total_price" alanını kendimiz hesapladığımız için SQL hata veremez.
        $booking = Booking::create([
            'car_id'              => $request->car_id,
            'customer_name'       => $request->customer_name,
            'customer_email'      => $request->customer_email,
            'customer_phone'      => $request->customer_phone,
            'pickup_address'      => $request->pickup_address,
            'destination_address' => $request->destination_address,
            'distance'            => $distance,
            'passenger_count'     => $paxCount,
            'total_price'         => $calculatedTotalPrice, // Manuel atama
            'pickup_time'         => $request->pickup_time,
            'flight_number'       => $request->flight_number,
            'notes'               => $request->notes,
            'status'              => 'pending', // Varsayılan durum
        ]);

        // 4. Başarı Sayfasına Yönlendirme
        return Inertia::render('Success', [
            'booking' => $booking
        ]);
    }
}