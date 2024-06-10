<?php

namespace App\Http\Controllers;

use App\Models\Profile;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\LoginRequest;


class AuthController extends Controller
{


// login a user methods
    public function login(Request $request) {
     $data = $request->validated();
        $user= User::where('email', $data['email'])->first();
            if (!$user) {
            return response()->json([
                'message' => "The email address you've entered does not exist. Please verify your email and try again"
            ], 401);
        }
//check if the password is correct
        if (!Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => "The password you've entered is incorrect. Please check your password and try again."
            ], 401);
        }

        //create personal access token
        $token = $user->createToken('auth_token')->plainTextToken;
        $ip=$request->headers->get('Accept-For');
        $from=$request->headers->get('Accept-From');
        $this->storeSession($user->id,$token,$from,$ip);
        $cookie = cookie('token', $token ,720); // 1 day
        return response()->json(['data'=>$this->refactorProfile($user),'token'=>$token])->withCookie($cookie);

    }
    public function register(Request $request){
        $user = $this->storeUser($request);
        $token = $user->createToken('auth_token')->plainTextToken;
        $ip=$request->headers->get('Accept-For');
        $from=$request->headers->get('Accept-From');
        $this->storeSession($user->id,$token,$from,$ip);
        $cookie = cookie('token', $token,720 ); // 1 day

        return response()->json($this->refactorProfile($user))->withCookie($cookie);;
    }
// logout
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        cookie()->forget('token');
        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie('token');
    }

    public function user(Request $request) {
        $user = auth()->user();
        return response()->json($this->refactorProfile($user));
    }
    public function abortSession($id){
        $session = Session::find($id);
        if(!$session){
            return response()->json(['message' => "cannot logout undefined session!!"], 404);
        }
        $session->status = 'Offline';
        $session->save();
        $isLoggedOut=$session->save();
        if($isLoggedOut){
            return response()->json(['message' => 'session logouted succsfully'],200);
        }
    }

}
