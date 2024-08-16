<?php

/**
 * This middleware extends the Tenancy for Laravel one to catch
 * tenant ID and scope future requests in the tenant panel.
 */

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Stancl\Tenancy\Tenancy;
use Illuminate\Http\Request;
use Modules\Multitenancy\Tenant;
use Illuminate\Contracts\Auth\Guard;
use Stancl\Tenancy\Resolvers\DomainTenantResolver;
use Illuminate\Contracts\Auth\Factory as AuthFactory;
use Illuminate\Contracts\Session\Middleware\AuthenticatesSessions;
use Stancl\Tenancy\Middleware\InitializeTenancyBySubdomain as BaseMiddleware;

class InitializeTenancyBySubdomain extends BaseMiddleware implements AuthenticatesSessions
{
    protected $tenancy;
    protected $resolver;

    public function __construct(
        Tenancy               $tenancy,
        DomainTenantResolver  $resolver,
        protected AuthFactory $auth
    )
    {
         $this->tenancy = $tenancy;
        $this->resolver = $resolver;
        parent::__construct($tenancy, $resolver);
    }


    public function handle($request, Closure $next): mixed
    {
        $route = $request->route();
        $record = $route->parameter('tenant');
        $subdomain = $this->makeSubdomain($request->getHost());
        // if ($record && $tenant = Tenant::find($record)) {
        if ($subdomain && $tenant = Tenant::find($subdomain)) {
            return $this->initializeTenancy(
                $request,
                $next,
                $subdomain
            );
            if ($domain = $tenant->domain) {
                $this->initializeTenancy($request, $next, $domain->domain);
            }
        }

        return $next($request);
    }

    protected function guard(): AuthFactory|Guard
    {
        return $this->auth;
    }
}