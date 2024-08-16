<?php

namespace Modules\Multitenancy\Providers;

use Filament\Pages;
use Filament\Panel;
use Livewire\Livewire;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Modules\Multitenancy\Multitenancy;
use Filament\Http\Middleware\Authenticate;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Modules\Multitenancy\Filament\Resources\DomainResource;
use Modules\Multitenancy\Filament\Resources\TenantResource;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;

class MultitenancyFilamentServiceProvider extends PanelProvider
{
    public function boot()
    {
        if (Multitenancy::isHostNotCentral()) {
            Livewire::setUpdateRoute(function ($handle) {
                return \Illuminate\Support\Facades\Route::post('/livewire/update', $handle)
                    ->middleware(
                        'web',
                        'tenancy',
                        'universal',
                        // InitializeTenancyByDomainOrSubdomain::class, // or whatever tenancy middleware you use
                    );
            });
        }

    }

    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('central')
            ->path('central')
            ->domains(config('tenancy.central_domains'))
            ->colors([
                'primary' => Color::Blue,
            ])
            ->discoverResources(
                in: Multitenancy::path('Filament/Resources'),
                for: 'Modules\\Multitenancy\\Filament\\Resources'
            )
            ->discoverPages(
                in: Multitenancy::path('Filament/Pages'),
                for: 'Modules\\Multitenancy\\Filament\\Pages'
            )
            ->pages([
                Pages\Dashboard::class,
            ])
            ->resources([
                TenantResource::class,
                DomainResource::class
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])->authMiddleware([
                Authenticate::class,
            ])
            ->login();
    }
}
