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

Route::middleware('auth:sanctum')->group(function () {

  // user apis
  Route::get('/user/{id}', [UsersController::class, 'show']);
  Route::get('/me', [UsersController::class, 'me']);

  Route::get('/logout', [UsersController::class, 'logout']);

  // item apis
  Route::post('/item', [ItemsController::class, 'store']);
  Route::get('/items/{id}', [ItemsController::class, 'index']);
  Route::put('/item/{id}', [ItemsController::class, 'update']);


  // folder apis
  Route::post('/folder', [FoldersController::class, 'store']);

  // orgs apis
  Route::post('/organization', [OrganizationsController::class, 'store']);

  //move to folder
  Route::put('/moveToFolder/{id}', [ItemsController::class, 'moveItemsToFolder']);

  //move to organization
  Route::put('/moveToOrg/{id}', [ItemsController::class, 'moveItemsToOrganization']);
});


Route::post('/register', [UsersController::class, 'store']);
Route::post('/login', [UsersController::class, 'login']);
