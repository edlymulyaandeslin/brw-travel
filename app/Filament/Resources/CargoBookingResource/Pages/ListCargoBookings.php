<?php

namespace App\Filament\Resources\CargoBookingResource\Pages;

use App\Filament\Resources\CargoBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCargoBookings extends ListRecords
{
    protected static string $resource = CargoBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
