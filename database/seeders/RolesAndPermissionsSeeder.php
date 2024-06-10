<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'gerer articles']);

        Permission::create(['name' => 'gerer filieres']);

        Permission::create(['name' => 'gerer events']);

        Permission::create(['name' => 'gerer users']);

        Permission::create(['name' => 'gerer roles']);
        Permission::create(['name' => 'gerer suppression']);
        // create roles and assign created permissions

        // this can be done as separate statements
        Role::create(['name' => 'gestionnaire'])->givePermissionTo(['gerer filieres','gerer articles','gerer events']);

        // or may be done by chaining
        Role::create(['name' => 'admin'])->givePermissionTo(['gerer filieres','gerer articles','gerer events','gerer users','gerer suppression']);

        Role::create(['name' => 'super-admin'])->givePermissionTo(Permission::all());
    }
}
