<?php

namespace App\Http\Controllers;

use App\Models\Profile;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{

// login a user methods
    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:6'
        ]);
        //check if the password is correct
        $user= User::where('email', $data['email'])->first();
        if (!Hash::check($data['password'], $user->password)) {
                return to_route('formLogin')->with(['message' => "The password you've entered is incorrect. Please check your password and try again."
            ]);
        }
         if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
        return to_route('dashboard');
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
        Auth::logout();
        Cookie::queue(Cookie::forget('laravel_session'));
        Cookie::queue(Cookie::forget('XSRF-TOKEN'));
        return to_route('login');
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
