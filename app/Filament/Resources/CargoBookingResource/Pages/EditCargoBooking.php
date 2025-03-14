<?php

namespace App\Filament\Resources\CargoBookingResource\Pages;

use App\Filament\Resources\CargoBookingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCargoBooking extends EditRecord
{
    protected static string $resource = CargoBookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
