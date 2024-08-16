<?php

namespace App\Actions\Route;

use Illuminate\Support\Facades\Route;

class ConditionalWebRoutingAction
{
    public function __invoke($options = [
        'development'
    ])
    {
        Route::middleware('web');
        if (!in_array(config('app.env'), $options)) {
            Route::middleware('web');
        }
    }
}
