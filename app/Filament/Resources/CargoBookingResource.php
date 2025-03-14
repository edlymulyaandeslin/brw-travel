<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Models\CargoBooking;
use App\Models\CargoPackage;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Columns\SelectColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\CargoBookingResource\Pages;
use App\Filament\Resources\CargoBookingResource\RelationManagers;

class CargoBookingResource extends Resource
{
    protected static ?string $model = CargoBooking::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';

    protected static ?string $navigationGroup = 'Transaksi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_id')
                    ->label('Pengguna')
                    ->required()
                    ->relationship("user", "name")
                    ->disabled(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord),

                Select::make('cargo_package_id')
                    ->label('Paket Barang')
                    ->required()
                    ->relationship("cargoPackage", "title")
                    ->live()
                    ->afterStateUpdated(function ($state, Set $set, Get $get) {
                        if ($state) {
                            $cargoPackage = CargoPackage::find($state);
                            $price = $cargoPackage->price ?? 0;
                            $size = $get('size') ?? 1;
                            $multipleSize = floor($size / 1000);
                            $set('amount', $price + $multipleSize * $cargoPackage->additional_price);
                        }
                    })
                    ->disabled(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord),

                TextInput::make('product_name')
                    ->label('Nama Produk')
                    ->required()
                    ->maxLength(255),

                TextInput::make('size')
                    ->label('Berat (gram)')
                    ->required()
                    ->numeric()
                    ->default(1)
                    ->reactive()
                    ->afterStateUpdated(function ($state, Set $set, Get $get) {
                        if ($cargoPackageId = $get('cargo_package_id')) {
                            $cargoPackage = CargoPackage::find($cargoPackageId);
                            $price = $cargoPackage->price ?? 0;

                            // Pastikan state tidak lebih dari capacity_gram
                            $maxCapacity = $cargoPackage->capacity_gram;
                            $state = min($state, $maxCapacity); // Menyetel maksimum

                            $multipleSize = floor($state / 1000);
                            $set('size', $state); // Pastikan size tetap dalam batas
                            $set('amount', $price + $multipleSize * $cargoPackage->additional_price);
                        }
                    }),

                TextInput::make('sender')
                    ->label('Pengirim')
                    ->required()
                    ->maxLength(255),

                Textarea::make('sender_address')
                    ->label('Alamat Pengirim')
                    ->required()
                    ->columnSpanFull(),

                TextInput::make('recipient')
                    ->label('Penerima')
                    ->required()
                    ->maxLength(255),

                Textarea::make('recipient_address')
                    ->label('Alamat Penerima')
                    ->required()
                    ->columnSpanFull(),

                DatePicker::make('delivery_date')
                    ->label('Tanggal Pengiriman')
                    ->required(),

                Textarea::make('notes')
                    ->label('Catatan')
                    ->columnSpanFull(),

                TextInput::make('amount')
                    ->label('Total Harga')
                    ->required()
                    ->numeric()
                    ->prefix("IDR")
                    ->disabled()
                    ->default(0)
                    ->dehydrated(),

                Select::make('status')
                    ->label('Status Pemesanan')
                    ->required()
                    ->options([
                        CargoBooking::PENDING    => CargoBooking::PENDING,
                        CargoBooking::CONFIRMED  => CargoBooking::CONFIRMED,
                        CargoBooking::COMPLETED  => CargoBooking::COMPLETED,
                        CargoBooking::CANCELLED  => CargoBooking::CANCELLED,
                    ])
                    ->default(CargoBooking::PENDING),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('user.phone')
                    ->label('Telepon Pengguna'),

                Tables\Columns\TextColumn::make('cargoPackage.title')
                    ->label('Paket Barang')
                    ->sortable(),

                Tables\Columns\TextColumn::make('product_name')
                    ->label('Nama Produk')
                    ->searchable(),

                Tables\Columns\TextColumn::make('size')
                    ->label('Ukuran (gram)')
                    ->numeric()
                    ->sortable(),

                Tables\Columns\TextColumn::make('sender')
                    ->label('Pengirim')
                    ->searchable(),

                Tables\Columns\TextColumn::make('recipient')
                    ->label('Penerima')
                    ->searchable(),

                Tables\Columns\TextColumn::make('delivery_date')
                    ->label('Tanggal Pengiriman')
                    ->date()
                    ->sortable(),

                Tables\Columns\TextColumn::make('amount')
                    ->label('Total Biaya')
                    ->money("IDR")
                    ->sortable(),

                SelectColumn::make('status')
                    ->label('Status Pemesanan')
                    ->options([
                        CargoBooking::PENDING    => CargoBooking::PENDING,
                        CargoBooking::CONFIRMED  => CargoBooking::CONFIRMED,
                        CargoBooking::COMPLETED  => CargoBooking::COMPLETED,
                        CargoBooking::CANCELLED  => CargoBooking::CANCELLED,
                    ]),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
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
            'index' => Pages\ListCargoBookings::route('/'),
            'create' => Pages\CreateCargoBooking::route('/create'),
            'edit' => Pages\EditCargoBooking::route('/{record}/edit'),
        ];
    }
}
