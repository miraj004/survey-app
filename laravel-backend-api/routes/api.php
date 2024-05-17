<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('surveys', \App\Http\Controllers\SurveyController::class)->except('show');
    Route::post('/logout', [\App\Http\Controllers\SessionController::class, 'destroy']);
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index']);
    Route::get('/survey/{survey}/answers', [\App\Http\Controllers\SurveyAnswerController::class, 'index']);
});

Route::post('/register', [\App\Http\Controllers\RegisterController::class, 'store']);
Route::post('/login', [\App\Http\Controllers\SessionController::class, 'store']);

Route::get('/survey/{survey}', [\App\Http\Controllers\SurveyController::class, 'show']);
Route::post('/survey/{survey}/answer', [\App\Http\Controllers\SurveyAnswerController::class, 'store']);

