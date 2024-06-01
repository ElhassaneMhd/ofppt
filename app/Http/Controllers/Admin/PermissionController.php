<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();
        return view('admin.permissions.index', compact('permissions'));
    }

    public function create()
    {
        $roles=Role::all();
        return view('admin.createRoleOrPerm',compact('roles'));
    }

    public function store(Request $request)
    {
        //dd($request->all());
        $permission = $request->validate(['name' => 'required']);
        Permission::create($permission);   
        // if($request->has('roles')){
        //     foreach ($request['roles'] as $role) {    
        //         $permission->roles()->assignRole($role);
        //     }
        // }

        return to_route('permissions.index')->with('message', 'Permission created.');
    }

    public function edit(Permission $permission)
    {
        $roles = Role::all();
        return view('admin.permissions.edit', compact('permission', 'roles'));
    }

    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate(['name' => 'required']);
        $permission->update($validated);

        return to_route('permissions.index')->with('message', 'Permission updated.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();

        return back()->with('message', 'Permission deleted.');
    }

    public function assignRole(Request $request, Permission $permission)
    {
        if($request->has('roles')){
            foreach ($request->roles as $role) {    
                    if ($permission->hasRole($role)===false) {  
                        $permission->assignRole($role);         
                    }
            }
         }
        return back()->with('message', 'Role assigned.');
    }

    public function removeRole(Permission $permission, Role $role)
    {
        if ($permission->hasRole($role)) {
            $permission->removeRole($role);
            return back()->with('message', 'Role removed.');
        }
        return back()->with('message', 'Role not exists.');
    }
}
