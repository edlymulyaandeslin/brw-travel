<?php

namespace App\Filament\Resources;

use App\Models\Car;
use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Actions\DeleteAction;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Actions\BulkActionGroup;
use App\Filament\Resources\CarResource\Pages;
use Filament\Tables\Actions\DeleteBulkAction;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\CarResource\RelationManagers;

class CarResource extends Resource
{
    protected static ?string $model = Car::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube-transparent';
    protected static ?string $navigationGroup = 'Travelling';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('image')
                    ->directory("cars")
                    ->image()
                    ->columnSpanFull(),
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('merk')
                    ->required()
                    ->maxLength(255),
                TextInput::make('tahun')
                    ->required()
                    ->maxLength(255),
                TextInput::make('color')
                    ->label("Warna")
                    ->required()
                    ->maxLength(255),
                Select::make('transmission')
                    ->required()
                    ->options([
                        Car::MANUAL => Car::MANUAL,
                        Car::AUTOMATIC => Car::AUTOMATIC,
                    ]),
                TextInput::make('fuel_type')
                    ->label("Bahan Bakar")
                    ->required()
                    ->maxLength(255),
                TextInput::make('seat_count')
                    ->label("Jumlah Kursi")
                    ->required()
                    ->numeric(),
                TextInput::make('jarak_tempuh')
                    ->required()
                    ->numeric(),
                TextInput::make('plate_number')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label("Gambar"),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('merk')
                    ->searchable(),
                TextColumn::make('tahun')
                    ->searchable(),
                TextColumn::make('color')
                    ->searchable(),
                TextColumn::make('transmission')
                    ->searchable(),
                TextColumn::make('fuel_type')
                    ->searchable(),
                TextColumn::make('seat_count')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('jarak_tempuh')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('plate_number')
                    ->searchable(),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageCars::route('/'),
        ];
    }
}