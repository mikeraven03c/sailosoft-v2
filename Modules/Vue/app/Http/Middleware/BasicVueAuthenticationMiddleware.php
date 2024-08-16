<?php

namespace Modules\Vue\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Contracts\Auth\Middleware\AuthenticatesRequests;


class BasicVueAuthenticationMiddleware extends Authenticate
{
    protected function authenticate($request, array $guards)
    {
        return parent::authenticate($request, $guards);
    }

    protected function redirectTo($request): ?string
    {
        return route('v2.login');
    }
}
