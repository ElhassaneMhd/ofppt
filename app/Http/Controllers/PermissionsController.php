<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsController extends Controller
{
    public function index(){
        $permissions = Permission::all();
        return view('admin.permissions.index', compact('permissions'));
    }
    public function create()
    {
        $roles=Role::all();
        return view('admin.createRoleOrPerm',compact('roles'));
    }
    public function store(Request $request) {
        $permission = $request->validate(['name' => 'required']);
        Permission::create($permission);
        // if($request->has('roles')){
        //     foreach ($request['roles'] as $role) {
        //         $permission->roles()->assignRole($role);
        //     }
        // }

        return to_route('permissions.index')->with('message', 'Permission created.');
    }
    public function edit(Permission $permission){
        $roles = Role::all();
        return view('admin.permissions.edit', compact('permission', 'roles'));
    }
    public function update(Request $request, Permission $permission){
        $validated = $request->validate(['name' => 'required']);
        $permission->update($validated);

        return to_route('permissions.index')->with('message', 'Permission updated.');
    }
    public function destroy(Permission $permission){
        $permission->delete();

        return back()->with('message', 'Permission deleted.');
    }
}
