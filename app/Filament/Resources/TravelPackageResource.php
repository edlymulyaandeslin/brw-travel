<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Set;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use App\Models\TravelPackage;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Actions\DeleteAction;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\TravelPackageResource\Pages;
use App\Filament\Resources\TravelPackageResource\RelationManagers;
use Filament\Forms\Components\DateTimePicker;

class TravelPackageResource extends Resource
{
    protected static ?string $model = TravelPackage::class;

    protected static ?string $navigationIcon = 'heroicon-o-presentation-chart-line';
    protected static ?string $navigationGroup = 'Perjalanan';

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
                TextInput::make('duration_days')
                    ->label('Durasi (hari)')
                    ->required()
                    ->numeric(),
                TextInput::make('capacity')
                    ->label('Kapasitas')
                    ->required()
                    ->numeric()
                    ->live(true)
                    ->afterStateUpdated(function ($state, Set $set) {
                        $set('available_capacity', $state);
                    }),
                TextInput::make('available_capacity')
                    ->label('Kapasitas Tersedia')
                    ->required()
                    ->numeric(),
                DateTimePicker::make('start_date')
                    ->label('Tanggal Mulai')
                    ->required(),
                DateTimePicker::make('end_date')
                    ->label('Tanggal Selesai')
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
                TextColumn::make('start_date')
                    ->label('Tanggal Mulai')
                    ->searchable()
                    ->dateTime("d M Y, H:i"),
                TextColumn::make('end_date')
                    ->label('Tanggal Selesai')
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
            'index'  => Pages\ListTravelPackages::route('/'),
            'create' => Pages\CreateTravelPackage::route('/create'),
            'edit'   => Pages\EditTravelPackage::route('/{record}/edit'),
        ];
    }
}