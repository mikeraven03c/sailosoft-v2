<?php


return [
    App\Providers\AppServiceProvider::class,
   \Modules\Filament\Providers\AdminPanelProvider::class,
   \Modules\Multitenancy\Providers\MultitenancyFilamentServiceProvider::class,
   \Modules\CustomEntity\Providers\CustomEntityAppPanelProvider::class
];
