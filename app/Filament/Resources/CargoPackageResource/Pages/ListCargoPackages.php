<?php

namespace App\Filament\Resources\CargoPackageResource\Pages;

use App\Filament\Resources\CargoPackageResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCargoPackages extends ListRecords
{
    protected static string $resource = CargoPackageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
