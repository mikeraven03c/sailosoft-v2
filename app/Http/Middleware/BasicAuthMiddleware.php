<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class BasicAuthMiddleware extends Authenticate
{
    protected function authenticate($request, array $guards)
    {
        return parent::authenticate($request, $guards);
    }
    protected function unauthenticated($request, array $guards)
    {
        if (in_array(config('app.mode'), ['local', 'development'])) {
            return;
        }

        if ($request->expectsJson()) {
            parent::unauthenticated($request, $guards);
        } else {
            abort(401);
        }
    }

    protected function redirectTo(Request $request)
    {
        abort(404);
    }
}
