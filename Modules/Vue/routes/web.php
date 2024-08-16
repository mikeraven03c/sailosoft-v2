<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Auth\Middleware\Authenticate;
use Modules\Vue\Http\Controllers\VueController;
use Modules\Vue\Http\Controllers\QuasarMainAppController;
use Modules\Vue\Http\Controllers\Auth\VueLoginAuthController;
use Modules\Vue\Http\Controllers\Auth\VueLoginViewController;
use Modules\Vue\Http\Controllers\Auth\VueLogoutAuthController;
use Modules\Vue\Http\Middleware\BasicVueAuthenticationMiddleware;

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

const APP = 'v2';

Route::get('/', VueLoginViewController::class)->name('v2.login');
Route::get('/v2/login', VueLoginViewController::class)->name('v2.login');
Route::post('/v2/login', VueLoginAuthController::class)->name('v2.auth');
Route::get('/v2/logout', VueLogoutAuthController::class)->name('v2.logout');

Route::middleware([
    BasicVueAuthenticationMiddleware::class,
])->group(function () {
    Route::get('v2', QuasarMainAppController::class)->name('v2.main');
});
// Route::group([], function () {
//     Route::get('v2', QuasarMainAppController::class)->name('v2.main');
// });
