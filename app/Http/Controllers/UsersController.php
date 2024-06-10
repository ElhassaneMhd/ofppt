<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsersController extends Controller
{
    public function index()  {
        $users = $this->refactorManyElements(User::all(),'users');
        $publieeUsers = User::paginate(10);
        $roles = Role::all();
        $permissions = Permission::all();
        return Inertia::render('Users/Index', compact('users','roles','permissions'));
    }
    public function create(){
        $roles=Role::all();
        $permissions=Permission::all();
        return Inertia::render('Users/Create', compact('roles','permissions'));
    }
    public function store(Request $request){
        $this->storeUser($request);
        return redirect()->route('users.index');
    }
    public function show($id){
        $user = User::find($id);
        $roles = Role::all();
        $permissions = Permission::all();
        return Inertia::render('Users/Show', compact('user','roles','permissions'));
    }
    public function edit($id){
        $user = User::find($id);
        $roles = Role::all();
        $permissions = Permission::all();
        return Inertia::render('Users/Edit', compact('user','roles','permissions'));
    }
    public function update(Request $request, $id){
        $user = User::find($id);
        $this->updateUser($request, $user);
        return to_route('users.index');
    }
    public function destroy($id){
        $this->destroyElement(User::class, $id);
        return redirect()->route('users.index');
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
