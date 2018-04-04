<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
    * Create a new controller instance.
    *
    * @return void
    */
    public function __construct()
    {
        //
    }

    //register method
    public function register(Request $request)
    {
        $user= User::create([
            'username'=>$request->username,
            'email'=>$request->email,
            'location' =>$request->location,
            'type'=>$request->type,
            'age' =>$request->age,
            'api_token'=>str_random(50)

        ]);

        return response()->json(['user'=>$user],200);
    }
}
