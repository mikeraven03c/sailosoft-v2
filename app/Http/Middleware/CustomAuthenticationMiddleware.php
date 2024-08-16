<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Middleware\AuthenticatesRequests;

class CustomAuthenticationMiddleware implements AuthenticatesRequests
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Custom authentication logic
        if (!Auth::check()) {
            return redirect('login');
        }

        return $next($request);
    }
}
