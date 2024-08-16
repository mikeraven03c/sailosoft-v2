<?php

use App\Actions\Route\ConditionalWebRoutingAction;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\BasicAuthMiddleware;
use Illuminate\Routing\RouteRegistrar;
use Modules\CustomEntity\Services\CustomEntityRouteService;
use Modules\CustomEntity\Http\Controllers\CustomAppController;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Modules\CustomEntity\Http\Controllers\CustomEntityController;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomainOrSubdomain;

/*
 *--------------------------------------------------------------------------
 * API Routes
 *--------------------------------------------------------------------------
 *
 * Here is where you can register API routes for your application. These
 * routes are loaded by the RouteServiceProvider within a group which
 * is assigned the "api" middleware group. Enjoy building your API!
 *
*/

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    // Route::apiResource('customentity', CustomEntityController::class)->names('customentity');
});
Route::middleware([
    !in_array(config('app.mode'), ['development']) ? 'web' : 'api',
    BasicAuthMiddleware::class
])->prefix('custom-apps')->group(function () {
    Route::middleware('web');
    CustomEntityRouteService::route(CustomAppController::class);
});
