<?php

namespace App\Http\Controllers;

use App\Models\Year;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class GeneralController extends Controller
{
    public function trashed($data)
    {
        $path = 'Back_Office/' . ucfirst($data) . '/TrashedList';
        $categories = $this->getCategories(false, true);
        $formationYears = Year::all();
        $sectors = $this->getSectors(false, true);
        $roles = Role::all();
        $data = $this->GetAll($data, true);
        $additionalData = [
            'categories' => $categories,
            'formationYears' => $formationYears,
            'sectors' => $sectors,
            'roles' => $roles,
        ];

        return Inertia::render($path, compact('data', 'additionalData'));
    }
    public function multipleAction(Request $request, $data, $action)
    {
        $ids = request()['ids'];
        $model = 'App\\Models\\' . ucfirst(Str::singular($data));
        foreach ($ids as $id) {
            if ($action === 'destroy') {
                $this->destroyElement($model, $id);
            }
            if ($action === 'forceDelete') {
                $this->forceDeleteData($model, $id);
            }
            if ($action === 'restore') {
                $this->restoreData($model, $id);
            }
        }
        if ($action === 'toggle') {
            foreach ($ids as $id) {
                $element = $model::Find($id);
                ($element->visibility === 'true') ? $visibility = 'false' : $visibility = 'true';
                $element->visibility =  $visibility;
                $element->save();
            }
        }
    }
    public function setAppSettings(Request $request){
        $this->storAppSettings($request);
        return redirect()->back();
    }
    public function settings($tab = false)
    {
        if (!$tab) {
            return redirect('admin/settings/profile');
        }
        $tabs = ['profile', 'password', 'general', 'about'];
        if(auth()->user()->roles->first()->name !== 'super-admin'){
            $tabs = ['profile', 'password'];
        }
        if (!in_array($tab, $tabs)) {
            return redirect()->back();
        }
        $path = 'Back_Office/Settings/' . ucfirst($tab);
        $settings = $this->refactorSettings();

        return Inertia::render($path, compact('settings','tabs'));
    }
    public function dashboard()
    {
        $user = auth()->user();
        $role = $user  ? $user->roles->first()->name : 'super-admin';
        $stats = $this->getStats($role);
        // return $stats;
        return Inertia::render('Back_Office/Dashboard/Dashboard', compact('stats'));
    }
}
