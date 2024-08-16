<?php

namespace Modules\Vue\Http\Controllers;

class QuasarMainAppController
{
    public function __invoke()
    {
        return view('vue::app');
    }
}
