<?php

namespace App\Services\Authentications;

use Illuminate\Http\Request;

class BasicUserAuthenticationService
{
    public function __construct(public Request $request)
    {

    }

    public function requestValidation() {
        return $this->request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    }
}
