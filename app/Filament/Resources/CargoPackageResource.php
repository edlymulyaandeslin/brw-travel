<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Set;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use App\Models\CargoPackage;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\CargoPackageResource\Pages;
use App\Filament\Resources\CargoPackageResource\RelationManagers;

class CargoPackageResource extends Resource
{
    protected static ?string $model = CargoPackage::class;

    protected static ?string $navigationIcon = 'heroicon-o-truck';
    protected static ?string $navigationGroup = 'Perjalanan';
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('destination_id')
                    ->label('Destinasi')
                    ->required()
                    ->relationship('destination', 'name'),
                Select::make('category_id')
                    ->label('Kategori')
                    ->required()
                    ->relationship('category', 'name'),
                TextInput::make('title')
                    ->label('Judul Paket')
                    ->required()
                    ->maxLength(255)
                    ->live(true)
                    ->afterStateUpdated(function ($state, Set $set) {
                        $set("slug", Str::slug($state));
                    }),
                Select::make('car_id')
                    ->label('Mobil')
                    ->required()
                    ->relationship('car', 'name'),
                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->disabled()
                    ->dehydrated(),
                Textarea::make('description')
                    ->label('Deskripsi')
                    ->required(),
                TextInput::make('price')
                    ->label('Harga')
                    ->required()
                    ->numeric()
                    ->prefix('IDR'),
                TextInput::make('additional_price')
                    ->label('Biaya Tambahan Jika berat > 1000 gram')
                    ->required()
                    ->numeric()
                    ->prefix('IDR'),
                TextInput::make('capacity_gram')
                    ->label('Kapasitas (gram)')
                    ->required()
                    ->numeric()
                    ->live(true)
                    ->afterStateUpdated(function ($state, Set $set) {
                        $set('max_capacity_gram', $state);
                    }),
                TextInput::make('max_capacity_gram')
                    ->label('Maksimal Kapasitas (gram)')
                    ->required()
                    ->numeric(),
                DatePicker::make('departure_date')
                    ->label('Tanggal Berangkat')
                    ->required(),
                TextInput::make('driver')
                    ->label('Nama Sopir')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('destination.name')
                    ->label('Destinasi')
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Judul Paket')
                    ->searchable(),
                TextColumn::make('price')
                    ->label('Harga')
                    ->money("IDR")
                    ->sortable(),
                TextColumn::make('driver')
                    ->label('Sopir')
                    ->searchable(),
                TextColumn::make('departure_date')
                    ->label('Tanggal Berangkat')
                    ->searchable()
                    ->dateTime("d M Y, H:i"),
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
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListCargoPackages::route('/'),
            'create' => Pages\CreateCargoPackage::route('/create'),
            'edit' => Pages\EditCargoPackage::route('/{record}/edit'),
        ];
    }
}