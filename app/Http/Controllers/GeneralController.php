<?php

namespace App\Http\Controllers;

use App\Models\Year;
use Illuminate\Support\Facades\Request;
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
        if ($action === 'delete') {
            foreach ($ids as $id) {
                $this->destroyElement($model, $id);
            }
        }
        if ($action === 'toggle') {
            foreach ($ids as $id) {
                $element = $model::Find($id);
                ($element->visibility === 'true') ? $newV = 'false' : $newV = 'true';
                $element->visibility =  $newV;
                $element->save();
            }
        }
    }
    public function stats()
    {
        return $this->getStats();
    }
}
