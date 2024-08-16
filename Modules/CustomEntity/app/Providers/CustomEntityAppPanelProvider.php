<?php

namespace Modules\CustomEntity\Providers;

use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Modules\CustomEntity\CustomEntity;
use Filament\Navigation\NavigationItem;
use Filament\Http\Middleware\Authenticate;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;

class CustomEntityAppPanelProvider extends PanelProvider
{
    protected string $moduleName = 'CustomEntity';

    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('app')
            ->path('app')
            ->login()
            ->colors([
                'primary' => Color::Green
            ])
            ->discoverResources(
                in: module_path($this->moduleName, 'app\\Filament/Resources'),
                for: 'Modules\\CustomEntity\\Filament\\Resources'
            )
            ->discoverPages(
                in: module_path($this->moduleName, 'app\\Filament/Pages'),
                for: 'Modules\\CustomEntity\\Filament\\Pages'
            )
            ->middleware([
                'tenancy',
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                'tenancy',
                Authenticate::class,
            ]);
            // ->plugins([
            //     new \Modules\CustomEntity\Filament\Plugin\CustomEntityPlugin(),
            //     \Jeffgreco13\FilamentBreezy\BreezyCore::make()->myProfile(
            //         shouldRegisterUserMenu: true, // Sets the 'account' link in the panel User Menu (default = true)
            //         shouldRegisterNavigation: false, // Adds a main navigation item for the My Profile page (default = false)
            //         navigationGroup: 'Settings', // Sets the navigation group for the My Profile page (default = null)
            //         hasAvatars: false, // Enables the avatar upload form component (default = false)
            //         slug: 'my-profile' // Sets the slug for the profile page (default = 'my-profile')
            //     )->enableSanctumTokens()
            // ]);;
    }
}
