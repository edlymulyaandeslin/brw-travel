<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Booking;
use App\Models\Payment;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Models\TravelPackage;
use Filament\Resources\Resource;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Columns\SelectColumn;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use App\Filament\Resources\BookingResource\Pages;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\BookingResource\RelationManagers;
use App\Filament\Resources\BookingResource\RelationManagers\PaymentRelationManager;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';

    protected static ?string $navigationGroup = 'Transaksi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Detail Pemesanan')
                    ->schema([
                        Select::make('user_id')
                            ->label('Pengguna')
                            ->required()
                            ->relationship("user", "name")
                            ->disabled(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord),

                        Select::make('travel_package_id')
                            ->label('Paket Perjalanan')
                            ->required()
                            ->relationship("travelPackage", "title")
                            ->live()
                            ->afterStateUpdated(function ($state, Set $set, Get $get) {
                                if ($state) {
                                    $travelPackage = TravelPackage::find($state);
                                    $price = $travelPackage->price ?? 0;
                                    $passengerCount = $get('passenger_count') ?? 1;
                                    $set('payment.amount', $price * $passengerCount);
                                }
                            })
                            ->disabled(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord),

                        DatePicker::make('booking_date')
                            ->label('Tanggal Pemesanan')
                            ->required()
                            ->disabled(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord),

                        TextInput::make('passenger_count')
                            ->label('Jumlah Penumpang')
                            ->required()
                            ->numeric()
                            ->default(1)
                            ->reactive()
                            ->afterStateUpdated(function ($state, Set $set, Get $get) {
                                if ($travelPackageId = $get('travel_package_id')) {
                                    $travelPackage = TravelPackage::find($travelPackageId);
                                    $price = $travelPackage->price ?? 0;
                                    $set('payment.amount', $price * $state);
                                }
                            }),

                        Select::make('status')
                            ->label('Status Pemesanan')
                            ->required()
                            ->options([
                                Booking::PENDING    => Booking::PENDING,
                                Booking::CONFIRMED  => Booking::CONFIRMED,
                                Booking::COMPLETED  => Booking::COMPLETED,
                                Booking::CANCELLED  => Booking::CANCELLED,
                            ])
                            ->default("Menunggu"),
                        Textarea::make("notes")
                            ->label("Catatan")
                    ])->columns(2),

                Section::make('Detail Pembayaran')
                    ->relationship("payment")
                    ->schema([
                        TextInput::make('amount')
                            ->label('Jumlah')
                            ->required()
                            ->numeric()
                            ->prefix("IDR")
                            ->disabled()
                            ->default(0)
                            ->dehydrated(),

                        Select::make('payment_method')
                            ->label('Metode Pembayaran')
                            ->required()
                            ->options([
                                Payment::CASH     => Payment::CASH,
                                Payment::TRANSFER => Payment::TRANSFER,
                            ]),

                        FileUpload::make('bukti_bayar')
                            ->label("Bukti Pembayaran")
                            ->directory('payments')
                            ->image(),

                        TextInput::make('jumlah_dp')
                            ->label("Jumlah Transfer")
                            ->numeric()
                            ->prefix("IDR")
                            ->default(0),

                        Select::make('status')
                            ->label("Status Pembayaran")
                            ->required()
                            ->options([
                                Payment::DP     =>  Payment::DP,
                                Payment::PAID   =>  Payment::PAID,
                                Payment::UNPAID =>  Payment::UNPAID,
                            ]),
                    ]),

                Section::make('Kursi Pemesanan')
                    ->schema([
                        Repeater::make('seats')
                            ->relationship("seats")
                            ->schema([
                                TextInput::make('seat_number')
                                    ->label("Nomor Kursi")
                                    ->maxValue(6)
                                    ->required()
                            ])
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Pengguna')
                    ->sortable(),
                TextColumn::make('user.phone')
                    ->label('Telepon Pengguna')
                    ->default("-"),
                TextColumn::make('travelPackage.title')
                    ->label('Paket Perjalanan')
                    ->sortable(),
                TextColumn::make('booking_date')
                    ->label('Tanggal Pemesanan')
                    ->date()
                    ->sortable(),
                TextColumn::make('passenger_count')
                    ->label('Jumlah Penumpang')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('payment.payment_method')
                    ->label("Metode Pembayaran"),
                TextColumn::make('payment.jumlah_dp')
                    ->label("Uang Muka")
                    ->money("IDR")
                    ->sortable(),
                TextColumn::make('payment.amount')
                    ->label("Jumlah")
                    ->money("IDR")
                    ->sortable(),
                SelectColumn::make('status')
                    ->label('Status Pemesanan')
                    ->options([
                        Booking::PENDING    => Booking::PENDING,
                        Booking::CONFIRMED  => Booking::CONFIRMED,
                        Booking::COMPLETED  => Booking::COMPLETED,
                        Booking::CANCELLED  => Booking::CANCELLED,
                    ]),
                SelectColumn::make('payment.status')
                    ->label("Status Pembayaran")
                    ->options([
                        Payment::DP     => Payment::DP,
                        Payment::PAID   => Payment::PAID,
                        Payment::UNPAID => Payment::UNPAID,
                    ]),
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Diperbarui')
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
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
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
            'index'  => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit'   => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}