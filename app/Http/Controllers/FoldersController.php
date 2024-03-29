<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFolderRequest;
use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class FoldersController extends Controller
{

    public function index($userId)
    {
        if ($userId !== Auth::user()->id) {
            return response()->json(['status' => false], 403);
        }

        $folders = User::with('folders')->find($userId);
        return response()->json($folders);
    }

    public function store(StoreFolderRequest $request)
    {
        $input = $request->all();
        $folder = Folder::create($input);

        if ($folder) {
            $user = Auth::user();
            $folders = User::with('folders')->find($user->id);

            $response = [
                'status' => true,
                'data' => $folders,
                'message' => "Folder added Successfully"
            ];

            return response()->json($response, 200);
        }



        $response = [
            'status' => false,
            'message' => 'folder not added'
        ];
        return response()->json($response, 404);
    }
}
