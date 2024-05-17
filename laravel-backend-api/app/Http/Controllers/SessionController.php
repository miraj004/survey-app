<?php

namespace App\Http\Controllers;

use App\Http\Requests\SessionRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionController extends Controller
{
    public function store(SessionRequest $request) {
        $attributes = $request->validated();
        $remember = $attributes['remember'] ?? false;
        unset($attributes['remember']);
        if(!Auth::attempt($attributes)) {
            return response()->json(['email' => 'Wrong credentials email or password.'], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        $user->email_verified_at = date('Y-m-d H:i:s');
        $user->save();
        return response()->json(compact('user', 'token'));
    }

    public function destroy(Request $request) {
        $user = Auth::user();
        /** @var User $user */
        $user->currentAccessToken()->delete();
        return response(['success' => true]);
    }


}
