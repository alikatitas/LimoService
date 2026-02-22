<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class BookingStats extends BaseWidget
{
    // Verilerin her 15 saniyede bir otomatik yenilenmesini sağlar
    protected static ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        return [
            Stat::make('Total Revenue', '$' . number_format(Booking::where('status', 'confirmed')->sum('total_price'), 2) . ' CAD')
                ->description('Total earnings from confirmed trips')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success')
                ->chart([7, 2, 10, 3, 15, 4, 17]), // Küçük bir grafik görseli ekler

            Stat::make('Pending Bookings', Booking::where('status', 'pending')->count())
                ->description('New requests waiting for approval')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),

            Stat::make('Total Passengers', Booking::sum('passenger_count'))
                ->description('Number of people served so far')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),
        ];
    }
}