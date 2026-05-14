<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        try {
            $users = User::all();
            if ($users->isEmpty()):
                return response()->json([
                    "message" => "No users found",
                ]);
            endif;
            return response()->json([
                "message" => "Users retrieved successfully",
                "data" => $users
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "Failed to fetch users",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function create() {
        try {
            $user = User::create([
                "name" => "Hissam",
                "email" => "hissamdev@gmail.com",
                "password" => "password",
            ]);

            return response()->json([
                "message" => "User created successfully",
                "user" => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "error" => $e,
            ]);
        }
    }
}
