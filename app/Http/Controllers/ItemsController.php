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

            if ($item->type === 1) {
                $loginInput = $request->only(['username', 'password', 'url']);
                $loginInput['item_id'] = $item->id;
                $login = Login::create($loginInput);
            } else if ($item->type === 2) {
                $cardInput = $request->only(['cardholder_name', 'brand', 'number', 'exp_month', 'exp_year', 'security_code']);
                $cardInput['item_id'] = $item->id;
                $card = Card::create($cardInput);
            } else if ($item->type === 3) {
                $identityInput = $request->only(['title', 'email', 'first_name', 'middle_name', 'last_name', 'phone', 'security', 'license', 'address']);
                $identityInput['item_id'] = $item->id;
                $identity = Identity::create($identityInput);
            }
            
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
}
