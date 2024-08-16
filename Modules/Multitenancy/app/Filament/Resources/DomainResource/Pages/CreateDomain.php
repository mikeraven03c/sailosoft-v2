<?php

namespace Modules\Multitenancy\Filament\Resources\DomainResource\Pages;

use Modules\Multitenancy\Filament\Resources\DomainResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateDomain extends CreateRecord
{
    protected static string $resource = DomainResource::class;
}
