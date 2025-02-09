<?php

use App\Http\Controllers\Account\AccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/accounts', [AccountController::class, 'index']);

Route::post('/accounts', [AccountController::class, 'store']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
