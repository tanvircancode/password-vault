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

        // $items = User::with(['items.organization', 'items.folder', 'items.login', 'items.identity', 'items.card'])->find($id);
        $items = User::with(['items' => function ($query) {
            $query->withTrashed()->with(['organization', 'folder', 'login', 'identity', 'card']);
        }])->find($id);

        $response = [
            'status' => true,
            'data' => $items
        ];
        return response()->json($response, 200);
    }
    public function update(Request $request, $id)
    {
        // return response()->json(['id'=> $id], 200);
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
            'data' => $item->load(['organization', 'folder', 'login', 'card', 'identity']),
            'message' => 'Item updated Successfully'
        ];
        return response()->json($response, 200);
    }

    public function moveItemsToFolder(Request $request, $id)
    {
        $selectedItems = $request->input('selectedItems');

        Item::whereIn('id', $selectedItems)
            ->update(['folder_id' => $id]);

        $items = Item::whereIn('id', $selectedItems)->get();

        $items->load(['organization', 'folder', 'login', 'card', 'identity']);
        return response()->json(['status' => true, 'data' => $items, 'message' => 'Items Moved Successfully'], 200);
    }
    public function moveItemsToOrganization(Request $request, $id)
    {
        $selectedItems = $request->input('selectedItems');

        Item::whereIn('id', $selectedItems)
            ->update(['organization_id' => $id]);

        $items = Item::whereIn('id', $selectedItems)->get();

        $items->load(['organization', 'folder', 'login', 'card', 'identity']);
        return response()->json(['status' => true, 'data' => $items, 'message' => 'Items Moved Successfully'], 200);
    }
    public function destroyItems(Request $request)
    {
        $selectedItems = $request->input('selectedItems');
        // return response()->json(['data' => $selectedItems,'status'=>'checking'], 200);
        $item = new Item();
        $result = $item->deleteItems($selectedItems);
// return response()->json(['data' => $result,'status'=>'checking'], 200);
        if ($result['success']) {
            $items = $result['items'];

            return response()->json([
                'status' => true, 'data' => $items, 'message' => 'Items deleted successfully'
            ], 200);
        } else {
            return response()->json(['status' => false, 'message' => 'No items selected for deletion'], 400);
        }
    }
}
