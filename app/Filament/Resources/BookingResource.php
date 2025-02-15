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
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Forms\Components\DatePicker;
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

    protected static ?string $navigationGroup = 'Transaction';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Booking Detail')
                    ->schema([
                        Select::make('user_id')
                            ->required()
                            ->relationship("user", "name")
                            ->disabled(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord),

                        Select::make('travel_package_id')
                            ->required()
                            ->relationship("travelPackage", "title")
                            ->live()
                            ->afterStateUpdated(
                                fn($state, Set $set, Get $get) =>
                                $set('payment.amount', TravelPackage::find($state)?->price * $get('passenger_count') ?? 0)
                            )
                            ->disabled(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord),

                        DatePicker::make('booking_date')
                            ->required()
                            ->disabled(fn($livewire) => $livewire instanceof \Filament\Resources\Pages\EditRecord),


                        TextInput::make('passenger_count')
                            ->required()
                            ->numeric()
                            ->default(1)
                            ->live(true)
                            ->afterStateUpdated(
                                fn($state, Set $set, Get $get) => $get('travel_package_id') &&
                                    $set('payment.amount', TravelPackage::find($get('travel_package_id'))?->price * $state ?? 0)
                            ),

                        Select::make('status')
                            ->required()
                            ->options([
                                "Pending" => Booking::PENDING,
                                "Confirmed" => Booking::CONFIRMED,
                                "Completed" => Booking::COMPLETED,
                                "Cancelled" => Booking::CANCELLED,
                            ])
                            ->default("Pending"),
                    ])->columns(2),

                Section::make('Payment Detail')
                    ->relationship("payment")
                    ->schema([
                        TextInput::make('amount')
                            ->required()
                            ->numeric()
                            ->prefix("IDR")
                            ->disabled()
                            ->default(0)
                            ->dehydrated(),

                        Select::make('payment_method')
                            ->required()
                            ->options([
                                "Cash" => "Cash",
                            ]),

                        Select::make('status')
                            ->label("Payment Status")
                            ->required()
                            ->options([
                                "Paid" => Payment::PAID,
                                "Unpaid" => Payment::UNPAID,
                            ])
                            ->default(Payment::UNPAID),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('User')
                    ->sortable(),
                TextColumn::make('travelPackage.title')
                    ->label('Travel Package')
                    ->sortable(),
                TextColumn::make('booking_date')
                    ->date()
                    ->sortable(),
                TextColumn::make('passenger_count')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('payment.amount')
                    ->label("Amount")
                    ->money("IDR")
                    ->sortable(),
                SelectColumn::make('status')
                    ->options([
                        "Pending" => Booking::PENDING,
                        "Confirmed" => Booking::CONFIRMED,
                        "Completed" => Booking::COMPLETED,
                        "Cancelled" => Booking::CANCELLED,
                    ]),
                SelectColumn::make('payment.status')
                    ->label("Payment Status")
                    ->options([
                        "Paid" => Payment::PAID,
                        "Unpaid" => Payment::UNPAID,
                    ]),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
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
            'index' => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit' => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}