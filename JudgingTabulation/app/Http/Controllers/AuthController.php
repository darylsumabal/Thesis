<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{

    public function me()
    {
        $user = Auth::user();

        if (!$user) {
            return  response()->json(['message' => 'Unauthenticated'], 401);
        }

        return response()->json(['user' => $user]);
    }

    public function register(RegisterRequest $request)
    {
        $validate = $request->validated();

        $user = User::create([
            'email' => $validate['email'],
            'name' => $validate['name'],
            'password' => bcrypt($validate['password'])
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    public function login(LoginRequest $request)
    {

        $validate = $request->validated();

        if (!Auth::attempt($validate)) {
            return response([
                'message' => 'empty not allowed'
            ]);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json(['message' => 'Login successful', 'access_token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Log Out successful'], 200);
    }
}
