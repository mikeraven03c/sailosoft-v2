<?php

namespace Modules\CustomEntity\Filament\Plugin;

use Filament\Panel;
use Filament\Contracts\Plugin;
use Modules\CustomEntity\Filament\Resources\CustomEntityResource;

class CustomEntityPlugin implements Plugin
{
    public function getId(): string
    {
        return 'custom-entity';
    }

    public function register(Panel $panel): void
    {
        $panel
            ->resources([
                CustomEntityResource::class
            ])
            ->pages([]);
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
