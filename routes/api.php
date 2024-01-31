<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\FoldersController;
use App\Http\Controllers\OrganizationsController;




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
   
    // user apis
 Route::get('/user/{id}',[UsersController::class, 'show']);  

  // item apis
Route::post('/item',[ItemsController::class, 'store']);  

// folder apis
Route::post('/folder',[FoldersController::class, 'store']);  

// orgs apis
Route::post('/organization',[OrganizationsController::class, 'store']);  

Route::post('/logout',[UsersController::class, 'logout']);

});


Route::post('/register',[UsersController::class, 'store']);  
Route::post('/login',[UsersController::class, 'login']);








