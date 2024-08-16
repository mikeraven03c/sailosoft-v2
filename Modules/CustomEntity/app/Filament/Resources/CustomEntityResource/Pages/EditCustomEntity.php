<?php

namespace Modules\CustomEntity\Filament\Resources\CustomEntityResource\Pages;

use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Modules\CustomEntity\Filament\Resources\CustomEntityResource;

class EditCustomEntity extends EditRecord
{
    protected static string $resource = CustomEntityResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
