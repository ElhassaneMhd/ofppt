<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsersController extends Controller
{
    public
    function __construct(){
        $this->middleware(['role:super-admin'])->only('store');
        $this->middleware(['role:super-admin'])->except('updateInfo','updatePassword');
    }
    public function index()  {
        $users = $this->refactorManyElements(User::role(['admin','gestionaire'])->get(),'users');
        $roles = Role::all();
        $permissions = Permission::all();
        return Inertia::render('Back_Office/Users/Index', compact('users','roles','permissions'));
    }
    public function create(){
        $roles=Role::all();
        $permissions=Permission::all();
        return Inertia::render('Back_Office/Users/Create', compact('roles','permissions'));
    }
    public function store(Request $request){
        $this->storeUser($request);
        return redirect()->route('users.index');
    }
    public function show($id){
        $user = User::find($id);
        $roles = Role::all();
        $permissions = Permission::all();
        return Inertia::render('Back_Office/Users/Show', compact('user','roles','permissions'));
    }
    public function edit($id){
        $user = $this->refactorUser(User::find($id));
        $roles = Role::all();
        $permissions = Permission::all();
        return Inertia::render('Back_Office/Users/Edit', compact('user','roles','permissions'));
    }
    public function update(Request $request, $id){
        $user = User::find($id);
        $this->updateUser($request, $user);
        return redirect()->route('users.index');
    }
    public function updateInfo(Request $request){
        $user = auth()->user();
        $this->updateUser($request, $user);
        return redirect('admin/settings/profile');
    }
    public function updatePassword(Request $request){
        if($this->updateUserPassword($request)===true){
            return redirect('admin/settings/profile');
        }elseif($this->updateUserPassword($request)==='same') {
            return redirect('admin/settings/password')->withErrors(['password'=>'The new password must be different from the current password.']);
        }elseif($this->updateUserPassword($request)==='wrong') {
            return redirect('admin/settings/password')->withErrors(['password'=>'The current password is incorrect.']);
        }

    }

    public function destroy($id){
        $this->destroyElement(User::class, $id);
        return redirect()->route('users.index');
    }
       public function restore(string $id){
        $this->restoreData(User::class, $id);
    }
    public function forceDelete(string $id){
        $this->forceDeleteData(User::class, $id);
    }
    public function assignRole(Request $request, $id){
        $user = User::find($id);
        if ($user->hasRole($request->role)) {
            return back()->with('message', 'Role exists.');
        }
        $user->assignRole($request->role);
        return back()->with('message', 'Role assigned.');
    }
    public function removeRole(User $user, Role $role){
        if ($user->hasRole($role)) {
            $user->removeRole($role);
            return back()->with('message', 'Role removed.');
        }
        return back()->with('message', 'Role not exists.');
    }
    public function givePermission(Request $request, $id){
        $user = User::find($id);
        if ($user->hasPermissionTo($request->permission)) {
            return back()->with('message', 'Permission exists.');
        }
        $user->givePermissionTo($request->permission);
        return back()->with('message', 'Permission added.');
    }
    public function revokePermission(User $user, Permission $permission){
        if ($user->hasPermissionTo($permission)) {
            $user->revokePermissionTo($permission);
            return back()->with('message', 'Permission revoked.');
        }
        return back()->with('message', 'Permission does not exists.');
    }
}
