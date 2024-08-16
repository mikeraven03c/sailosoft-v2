<?php

namespace Modules\CustomEntity\Filament\Resources\CustomEntityResource\Pages;

use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Modules\CustomEntity\Filament\Resources\CustomEntityResource;

class ListCustomEntities extends ListRecords
{
    protected static string $resource = CustomEntityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
