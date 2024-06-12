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
        $path = 'Admin/' . ucfirst($data) . '/TrashedList';
        $categories = $this->getCategories();
        $formationYears = Year::all();
        $sectors = $this->getSectors();
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
            if ($action === 'delete') {
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
    public function setAppSettings(Request $request)
    {
        $this->storAppSettings($request);
        return redirect()->back();
    }
    public function settings($tab = false)
    {
        if (!$tab) {
            return Inertia::render('Admin/Settings/Profile');
        }
        $tabs = ['profile', 'password', 'general', 'about'];
        if (!in_array($tab, $tabs)) {
            return redirect()->back();
        }
        $path = 'Admin/Settings/' . ucfirst($tab);
        $settings = $this->refactorSettings();

        return Inertia::render($path, compact(('settings')));
    }
    public function stats()
    {
        return $this->getStats();
    }
}
