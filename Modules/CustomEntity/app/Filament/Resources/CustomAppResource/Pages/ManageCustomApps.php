<?php

namespace Modules\CustomEntity\Filament\Resources\CustomAppResource\Pages;

use Modules\CustomEntity\Filament\Resources\CustomAppResource;
use Filament\Actions;
use Filament\Resources\Pages\ManageRecords;

class ManageCustomApps extends ManageRecords
{
    protected static string $resource = CustomAppResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
