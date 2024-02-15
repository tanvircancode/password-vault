<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Login;
use App\Models\User;
use App\Models\Card;
use App\Models\Identity;
use App\Models\Folder;
use App\Models\Organization;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class ItemsController extends Controller
{

    public function store(Request $request)
    {
        $input = $request->only(['user_id', 'type', 'name', 'folder_id', 'notes', 'organization_id', 'favorite']);
        $item = Item::create($input);

        if ($item->id) {
            $item->createRelatedModel($request->all());
        }

        $response = [
            'status' => true,
            'data' => $item,
        ];

        return response()->json($response, 200);
    }

    public function index($id)
    {

        if ($id !== Auth::user()->id) {
            return response()->json(['status' => false], 403);
        }

        $items = User::with(['items.organization', 'items.folder', 'items.login', 'items.identity', 'items.card'])->find($id);
        $response = [
            'status' => true,
            'data' => $items
        ];
        return response()->json($response, 200);
    }
    public function update(Request $request , $id)
    {
        

        $item = Item::find($id);
        if (!$item) {
            return response()->json(['status' => false, 'message' => 'Item not found'], 404);
        }

        if ($item->user_id !== Auth::user()->id) {
            return response()->json(['status' => false, 'message' => 'Unauthorized'], 403);
        }

        $item->updateItemAndRelatedModels($request->all());

        $response = [
            'status' => true,
            'data' => $item->load(['organization','folder','login','card','identity']),
            'message' => 'Item updated Successfully'
        ];
        return response()->json($response, 200);
    }
}
