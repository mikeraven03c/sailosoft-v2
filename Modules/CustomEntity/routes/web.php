<?php

use App\Http\Middleware\BasicAuthMiddleware;
use Illuminate\Support\Facades\Route;
use Modules\CustomEntity\Http\Controllers\CustomEntityController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware([
    BasicAuthMiddleware::class
])->group(function () {
    Route::resource('customentity', CustomEntityController::class)->names('customentity');
});
