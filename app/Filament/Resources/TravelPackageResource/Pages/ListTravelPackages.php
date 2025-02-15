<?php

namespace App\Filament\Resources\TravelPackageResource\Pages;

use App\Filament\Resources\TravelPackageResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListTravelPackages extends ListRecords
{
    protected static string $resource = TravelPackageResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
