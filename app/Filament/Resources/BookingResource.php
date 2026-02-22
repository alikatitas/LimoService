<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';
    
    protected static ?string $navigationLabel = 'Reservations';

    /**
     * Yeni Kayıt ve Düzenleme Formu
     */
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Customer Information')
                    ->description('Contact details of the client.')
                    ->schema([
                        Forms\Components\TextInput::make('customer_name')
                            ->label('Full Name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('customer_email')
                            ->label('Email Address')
                            ->email()
                            ->required(),
                        Forms\Components\TextInput::make('customer_phone')
                            ->label('Phone Number')
                            ->tel()
                            ->required(),
                        // MANUEL GİRİŞ İÇİN YOLCU SAYISI ALANI
                        Forms\Components\TextInput::make('passenger_count')
                            ->label('Passengers')
                            ->numeric()
                            ->default(1)
                            ->minValue(1)
                            ->required(),
                    ])->columns(4), // Kolon sayısını 4 yaptık

                Forms\Components\Section::make('Trip Details')
                    ->description('Specify the route and vehicle.')
                    ->schema([
                        Forms\Components\Select::make('car_id')
                            ->label('Select Vehicle')
                            ->relationship('car', 'model_name')
                            ->required()
                            ->searchable()
                            ->preload(),
                        Forms\Components\DateTimePicker::make('pickup_time')
                            ->label('Pickup Date & Time')
                            ->required()
                            ->native(false)
                            ->displayFormat('M d, Y H:i'),
                        Forms\Components\TextInput::make('pickup_address')
                            ->label('Pickup Location')
                            ->required()
                            ->columnSpan(1),
                        Forms\Components\TextInput::make('destination_address')
                            ->label('Destination')
                            ->required()
                            ->columnSpan(1),
                        Forms\Components\TextInput::make('flight_number')
                            ->label('Flight Number')
                            ->placeholder('e.g. AC123'),
                    ])->columns(2),

                Forms\Components\Section::make('Status & Pricing')
                    ->schema([
                        Forms\Components\TextInput::make('distance')
                            ->label('Distance (KM)')
                            ->numeric()
                            ->default(0)
                            ->required(),
                        Forms\Components\TextInput::make('total_price')
                            ->label('Total Price (CAD)')
                            ->numeric()
                            ->prefix('$')
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->label('Booking Status')
                            ->options([
                                'pending' => 'Pending',
                                'confirmed' => 'Confirmed',
                                'cancelled' => 'Cancelled',
                            ])
                            ->default('pending')
                            ->required(),
                    ])->columns(3),

                Forms\Components\Textarea::make('notes')
                    ->label('Special Instructions')
                    ->rows(3)
                    ->columnSpanFull(),
            ]);
    }

    /**
     * Kayıt Detay Sayfası (View)
     */
    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Customer Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('customer_name')->label('Name')->weight('bold'),
                        // DETAY SAYFASINDA YOLCU SAYISI
                        Infolists\Components\TextEntry::make('passenger_count')
                            ->label('Passengers')
                            ->badge()
                            ->color('warning')
                            ->icon('heroicon-m-users'),
                        Infolists\Components\TextEntry::make('customer_email')->label('Email')->copyable()->icon('heroicon-m-envelope'),
                        Infolists\Components\TextEntry::make('customer_phone')->label('Phone')->icon('heroicon-m-phone'),
                        Infolists\Components\TextEntry::make('flight_number')->label('Flight #')->badge()->color('info'),
                    ])->columns(5), // Kolon sayısını 5 yaptık

                Infolists\Components\Section::make('Trip Details')
                    ->schema([
                        Infolists\Components\TextEntry::make('pickup_address')->label('From')->columnSpan(2),
                        Infolists\Components\TextEntry::make('destination_address')->label('To')->columnSpan(2),
                        Infolists\Components\TextEntry::make('pickup_time')->label('Pickup Time')->dateTime('M d, Y H:i'),
                        Infolists\Components\TextEntry::make('distance')->label('KM')->suffix(' KM'),
                        Infolists\Components\TextEntry::make('total_price')->label('Total Fare')->money('CAD'),
                    ])->columns(4),

                Infolists\Components\Section::make('Status & Notes')
                    ->schema([
                        Infolists\Components\TextEntry::make('status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'pending' => 'warning',
                                'confirmed' => 'success',
                                'cancelled' => 'danger',
                                default => 'gray',
                            }),
                        Infolists\Components\TextEntry::make('notes')->label('Notes')->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    /**
     * Liste Tablosu
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('customer_name')->label('Customer')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('car.model_name')->label('Vehicle')->sortable(),
                // TABLO LİSTESİNDE KÜÇÜK BİR PAX SÜTUNU
                Tables\Columns\TextColumn::make('passenger_count')
                    ->label('Pax')
                    ->numeric()
                    ->alignCenter(),
                Tables\Columns\TextColumn::make('pickup_time')->label('Pickup Date')->dateTime('M d, H:i')->sortable(),
                Tables\Columns\TextColumn::make('total_price')->label('Fare')->money('CAD')->sortable(),
                Tables\Columns\SelectColumn::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'cancelled' => 'Cancelled',
                    ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(['pending' => 'Pending', 'confirmed' => 'Confirmed', 'cancelled' => 'Cancelled']),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'view' => Pages\ViewBooking::route('/{record}'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}