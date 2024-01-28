<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ItemsController;


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

Route::middleware('auth:sanctum')->group(function()  { 
    // item apis
    // Route::post('/item',[ItemsController::class, 'store']);  
    

});


Route::post('/register',[UsersController::class, 'store']);  
Route::post('/login',[UsersController::class, 'login']);

Route::post('/item',[ItemsController::class, 'store']);  


