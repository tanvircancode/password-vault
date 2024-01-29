<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class FoldersController extends Controller
{

    public function index($userId)
    {
        if($userId !== Auth::user()->id) {
            return response()->json(['status' => false], 403);
        }

        $folders = User::with('folders')->find($userId);
        return response()->json($folders);
    }
    
    public function store(Request $request) {
        $input = $request->all();
        $folder = Folder::create($input);

        $response = [
            'status' => true,
            'data' => $folder,
            'message' => "Folder added Successfully"
        ];

        return response()->json($response, 200);

    }
}
