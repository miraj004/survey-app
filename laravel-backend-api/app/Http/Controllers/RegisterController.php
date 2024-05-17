<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function store(RegisterRequest $request) {
        $attributes = $request->validated();
        $attributes['email_verified_at'] = date('Y-m-d H:i:s');
        $user = User::create($attributes);
        Auth::login($user);
        /** @var User $user */
        $token = $user->createToken('main')->plainTextToken;
        return response()->json(compact('user', 'token'));
    }
}
