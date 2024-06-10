<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(){
        $roles = Role::all();
        return Inertia::render('Roles/Index', compact('roles'));
    }

    public function create(){
        $roles=Role::all();
        $permissions = Permission::all();
        return Inertia::render('Roles/Create', compact('roles','permissions'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['name' => ['required', 'min:3']]);
        Role::create($validated);
        return to_route('roles.index')->with('message', 'Role Stored successfully.');
    }

    public function edit($id)
    {
        $role=Role::find($id);
        $permissions = Permission::all();
        return Inertia::render('Roles/Edite', compact('role','permissions'));
    }

    public function update(Request $request,$id)
    {
        $role=Role::find($id);
        $validated = $request->validate(['name' => ['required', 'min:3']]);
        $role->update($validated);
        return to_route('roles.index')->with('message', 'Role Updated successfully.');
    }

    public function destroy($id)
    {
        $this->destroyElement(Role::class, $id);
        return redirect()->route('roles.index');
    }

    public function givePermission(Request $request,$id){
        $role=Role::find($id);
        if($request->has('permissions')){
            foreach ($request->permissions as $permission) {
                if ($role->hasPermissionTo($permission)===false) {
                    $role->givePermissionTo($permission);
                }
            }
         }
        return back()->with('message', 'Permission added.');
    }
    public function revokePermission(Role $role, Permission $permission){
        if($role->hasPermissionTo($permission)){
            $role->revokePermissionTo($permission);
            return back()->with('message', 'Permission revoked.');
        }
        return back()->with('message', 'Permission not exists.');
    }
}
