<?php

namespace Modules\Multitenancy;

use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomainOrSubdomain;

class Multitenancy
{
    const NAME = 'Multitenancy';
    const NAME_LOWER = 'multitenancy';
    const MIDDLEWARE_GROUP = 'tenancy';

    /**
     * Module path for multitenancy
     */
    public static function path($path): string
    {
        return module_path(self::NAME, 'app\\' . $path);
    }

    /**
     * Determine if central domain
     */
    public static function isCentralDomain(): bool
    {
        $request = app('request');
        return in_array($request->getHost(), config('tenancy.central_domains'));
    }
    /**
     * Determine if central domain
     */
    public static function isHostNotCentral(): bool
    {
        return !self::isCentralDomain();
    }




    /**
     * Initializing tenancy on middleware group
     * Note! Add empty 'tenancy' middleware group to the route
     */
    public static function initializeTenancy()
    {
        $router = app(\Illuminate\Routing\Router::class);

        $router->pushMiddlewareToGroup(
            self::MIDDLEWARE_GROUP,
            PreventAccessFromCentralDomains::class
        );
        $router->pushMiddlewareToGroup(
            self::MIDDLEWARE_GROUP,
            InitializeTenancyByDomainOrSubdomain::class
        );
    }
}
