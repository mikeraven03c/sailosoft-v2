<?php

namespace Modules\Vue\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;

class VueLoginViewController
{
    public function __invoke()
    {
        if (Auth::check()) {
            return redirect('v2');
        }
        return view('vue::login');
    }
}
