<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CarResource\Pages;
use App\Models\Car;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CarResource extends Resource
{
    protected static ?string $model = Car::class;

    protected static ?string $navigationIcon = 'heroicon-o-truck';
    
    protected static ?string $navigationLabel = 'Vehicles';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Vehicle Information')
                    ->description('Manage limousine details for the Canadian market.')
                    ->schema([
                        Forms\Components\TextInput::make('model_name')
                            ->label('Vehicle Model')
                            ->placeholder('e.g. Mercedes S-Class')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('capacity')
                            ->label('Passenger Capacity')
                            ->numeric()
                            ->required()
                            ->minValue(1),

                        Forms\Components\TextInput::make('luggage_capacity')
                            ->label('Luggage Capacity (Bags)')
                            ->numeric()
                            ->default(2),

                        Forms\Components\TextInput::make('price_per_km')
                            ->label('Price per KM (CAD)')
                            ->numeric()
                            ->prefix('$')
                            ->required(),

                        Forms\Components\Textarea::make('description')
                            ->label('Vehicle Description')
                            ->placeholder('Brief info about the luxury features...')
                            ->rows(3)
                            ->columnSpanFull(),

                        Forms\Components\CheckboxList::make('features')
                            ->label('Amenities')
                            ->options([
                                'wifi' => 'Free Wi-Fi',
                                'water' => 'Bottled Water',
                                'leather' => 'Leather Seats',
                                'ac' => 'Climate Control',
                                'usb' => 'USB Charging',
                            ])
                            ->columns(2), // Hata veren gridDirection kaldırıldı

                        Forms\Components\TextInput::make('base_fare')
                            ->label('Base Fare (Fixed)')
                            ->numeric()
                            ->prefix('$')
                            ->helperText('Minimum fee for short distances.'),

                        Forms\Components\TextInput::make('base_km_limit')
                            ->label('Base KM Limit')
                            ->numeric()
                            ->suffix('KM')
                            ->helperText('Distance included in the base fare.'),

                        Forms\Components\FileUpload::make('image')
                            ->label('Vehicle Photo')
                            ->image()
                            ->directory('cars')
                            ->imageEditor()
                            ->columnSpanFull(),
                    ])->columns(2)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Preview')
                    ->size(120) // Listede daha büyük görünmesi için artırıldı
                    ->rounded(),

                Tables\Columns\TextColumn::make('model_name')
                    ->label('Model')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('capacity')
                    ->label('Pax')
                    ->sortable(),

                Tables\Columns\TextColumn::make('price_per_km')
                    ->label('Rate/KM')
                    ->money('CAD', locale: 'en_CA')
                    ->sortable(),

                Tables\Columns\TextColumn::make('features')
                    ->label('Amenities')
                    ->badge()
                    ->separator(','),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCars::route('/'),
            'create' => Pages\CreateCar::route('/create'),
            'edit' => Pages\EditCar::route('/{record}/edit'),
        ];
    }
}