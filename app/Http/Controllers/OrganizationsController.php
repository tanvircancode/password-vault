<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class OrganizationsController extends Controller
{
    public function store(Request $request)
    {
        $input = $request->all();
        $organization = Organization::create($input);

        if ($organization) {
            $user = Auth::user();
            $organizations = User::with('organizations')->find($user->id);

            $response = [
                'status' => true,
                'data' => $organizations,
                'message' => "Organization added Successfully"
            ];

            return response()->json($response, 200);
        }



        $response = [
            'status' => false,
            'message' => 'Organization not added'
        ];
        return response()->json($response, 404);
    }
}
