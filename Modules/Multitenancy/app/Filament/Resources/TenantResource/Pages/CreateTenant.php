<?php

namespace Modules\Multitenancy\Filament\Resources\TenantResource\Pages;

use Modules\Multitenancy\Filament\Resources\TenantResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateTenant extends CreateRecord
{
    protected static string $resource = TenantResource::class;
}
