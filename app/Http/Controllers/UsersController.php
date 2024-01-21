<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class UsersController extends Controller
{
    //
    public function register(Request $request) {
        $input = $request->all();
        
        $input['password'] = bcrypt($input['password']);
        
        if(empty($input['token']) || $input['token'] != env('REGISTER_TOKEN') ) {
            $response = [
                'status' => false,
                'message' => 'You are not authorized'
            ];
            return response()->json($response,404);
        }
         
        $user = User::create($input);
        
        $data['id'] = $user->id;
        $data['name'] = $user->name;
        $data['token'] = $user->createToken('MyAppToken')->plainTextToken;
        
        $response = [
            'status' => true,
            'data' => $data,
        ];

        return response()->json($response,200);
    }
}
