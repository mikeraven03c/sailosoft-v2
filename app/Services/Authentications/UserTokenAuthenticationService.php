<?php

namespace App\Services\Authentications;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserTokenAuthenticationService extends BasicUserAuthenticationService
{
    public function authenticate()
    {
        $credentials = $this->requestValidation();

        if (Auth::attempt($credentials)) {
            $request = $this->request;
            $user = $request->user();
            $token = $user->createToken($request->token_name ?? Str::uuid());

            return response()->json([
                'success' => true,
                'token' => $token->plainTextToken,
                'user' => $user, // Include user details if needed
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    public function getUserToken()
    {
        return $this->request->user()->tokens;
    }

    public function logout()
{
    $this->request->user()->token()->revoke(); // Revoke the current user's token
    return response()->json([
        'success' => true,
        'message' => 'Logged out successfully'
    ]);
}
}
