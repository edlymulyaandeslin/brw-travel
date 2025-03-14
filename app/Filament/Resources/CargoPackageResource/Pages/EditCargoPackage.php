<?php

namespace App\Filament\Resources\CargoPackageResource\Pages;

use App\Filament\Resources\CargoPackageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCargoPackage extends EditRecord
{
    protected static string $resource = CargoPackageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
