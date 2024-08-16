<?php

namespace Modules\CustomEntity\Services;

use Illuminate\Support\Facades\Route;

class CustomEntityRouteService
{
    public function __construct()
    {
    }

    public static function route(string $controller): void
    {
        Route::controller($controller)->group(function () {
            Route::get('/{navigation}', 'index')->name('custom-apps.index');
            Route::get('/{navigation}/{id}', 'show')->name('custom-apps.show');
            Route::post('/{navigation}', 'store')->name('custom-apps.store');
            Route::put('/{navigation}/{id}', 'update')->name('custom-apps.update');
            Route::delete('/{navigation}/{id}', 'destroy')->name('custom-apps.destroy');
        });
    }

    public function getNavigation(): string
    {
        return request(null)->route('navigation');
    }

    public function getNavigationId(): string
    {
        return request(null)->route('id');
    }

    public function getRequestPerPage($paginate) : int
    {
        return request(null)->query('per_page', $paginate);
    }

    public function getRequestSearch() : string
    {
        return request(null)->query('search', '');
    }

    public function getSort() : string
    {
        return request(null)->query('sort', '');
    }
}
