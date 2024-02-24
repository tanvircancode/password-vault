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
use League\Csv\Writer;

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

        $item = new Item();
        $result = $item->deleteItems($selectedItems);

        if ($result['success']) {
            $items = $result['items'];

            return response()->json([
                'status' => true, 'data' => $items, 'message' => 'Items deleted successfully'
            ], 200);
        } else {
            return response()->json(['status' => false, 'message' => 'No items selected for deletion'], 400);
        }
    }

    public function destroyItem($id)
    {
        $item = Item::withTrashed()->find($id);
        $convertedArray = array();

        if (!$item) {
            return response()->json(['status' => false, 'message' => 'Item not found!'], 404);
        } else if ($item->user_id !== Auth::user()->id) {
            return response()->json(['status' => false, 'message' => 'Unauthenticated'], 403);
        } else {
            if ($item->trashed()) {
                $item->forceDelete();
            } else {
                $item->delete();
            }
            array_push($convertedArray, $item);

            return response()->json(['status' => true, 'data' => $convertedArray, 'message' => 'Item deleted successfully'], 200);
        }
    }

    public function restoreItem($id)
    {
        $item = Item::withTrashed()
            ->with(['organization', 'folder', 'login', 'card', 'identity'])
            ->find($id);
        $convertedArray = array();

        if (!$item) {
            return response()->json(['status' => false, 'message' => 'Item not found!'], 404);
        } else if ($item->user_id !== Auth::user()->id) {
            return response()->json(['status' => false, 'message' => 'Unauthenticated'], 403);
        } else {

            $item->restore();

            array_push($convertedArray, $item);

            return response()->json(['status' => true, 'data' => $convertedArray, 'message' => 'Item restored successfully'], 200);
        }
    }
    // public function export($id)
    // {

    //     if ($id !== Auth::user()->id) {
    //         return response()->json(['status' => false], 403);
    //     }

    //     // $items = User::with(['items' => function ($query) {
    //     //     $query->whereNull('deleted_at')->with(['organization', 'folder', 'login', 'identity', 'card']);
    //     // }])->find($id);
    //     $items = Item::where('user_id', $id)
    //             ->whereNull('deleted_at')
    //             ->get();


    //     $response = [
    //         'status' => true,
    //         'checking' => 'yes',
    //         'data' => $items
    //     ];
    //     return response()->json($response, 200);
    // }
    public function export($id)
    {
        if ($id !== Auth::user()->id) {
            return response()->json(['status' => false], 403);
        }

      
        $items = Item::where('user_id', $id)
            ->with(['organization', 'folder', 'login'])
            ->get();

        $csv = Writer::createFromFileObject(new \SplTempFileObject());

        $csv->insertOne([
            'folder_name', 'favorite', 'type', 'item_name', 'notes', 'login_username', 'login_password',
            'login_url'
        ]);

       
        foreach ($items as $item) {
            if ($item->type == 2 || $item->type == 3) {
                continue;
            }
            $csv->insertOne([

                $item->folder->foldername  ?? "",
                $item->favorite ?? "",
                $item->type  ? ($item->type == 1 ? 'login' : 'note') : "",
                $item->name ?? "",
                $item->notes  ?? "",
                $item->login->username  ?? "",
                $item->login->password  ?? "",
                $item->login->url  ?? ""
            ]);
        }

      
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="vault_data.csv"',
        ];

        // Send the CSV file as a response
        return response()->stream(function () use ($csv) {
            $csv->output();
        }, 200, $headers);
    }
}
