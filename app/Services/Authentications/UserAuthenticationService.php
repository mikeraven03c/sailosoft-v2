<?php

namespace App\Services\Authentications;

use Illuminate\Support\Facades\Auth;

class UserAuthenticationService extends BasicUserAuthenticationService
{
    public function authenticate()
    {
        $credentials = $this->requestValidation();

        if (Auth::attempt($credentials)) {
            $this->request->session()->regenerate();

            return redirect()->inteded('vue');
        }
    }
}
