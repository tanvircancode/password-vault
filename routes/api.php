<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\FoldersController;



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
   
    // Route::post('/item',[ItemsController::class, 'store']);  
    

});


Route::post('/register',[UsersController::class, 'store']);  
Route::post('/login',[UsersController::class, 'login']);
Route::post('/logout',[UsersController::class, 'logout']);

 // user apis
 Route::get('/user/{id}',[UsersController::class, 'show']);  


 // item apis
Route::post('/item',[ItemsController::class, 'store']);  

 // folder apis
//  Route::get('/folders/{userId}',[FoldersController::class, 'index']);  
 Route::post('/folder',[FoldersController::class, 'store']);  


