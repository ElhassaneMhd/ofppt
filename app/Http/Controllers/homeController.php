<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Filiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;



class HomeController extends Controller
{
    public function index()
    {
        $articles = $this->GetAll('articles');
        $events = $this->GetAll('events');
        $filieres = $this->GetAll('filieres');
        $sectors = $this->getSectors(true, false);
        $stats = $this->getStats("homepage");
        $sectorsWithStats = [];
        // foreach ($stats["filieres"]["sectors"]??[] as $key => $value) {
        //     if(in_array($key ,$sectors)) $sectorsWithStats[] = ["name" => $key, "count" => $value];
        //     else $sectorsWithStats[] = ["name" => $key, "count" => 0];
        // }
        return Inertia::render('Front_End/HomePage', compact('articles', 'events', 'filieres', 'sectors', 'sectorsWithStats',));
    }

    public function storeDemands(Request $request)
    {
        $this->storeDemand($request);
    }

    public function getRouteName()
    {
        return explode('/', Route::getFacadeRoot()->current()->uri())[0];
    }

    // /Filieres | /Blog | /Events
    public function dataPage()
    {
        $route = $this->getRouteName();
        $data = $this->GetAll($route === 'blog' ? 'articles' : $route);
        $sectors = $this->getSectors(true, true);
        $categories = $this->getCategories(true, true);

        $path = 'Front_End/' . ucfirst($route) . '/' . ucfirst($route);

        if ($route === 'filieres') return Inertia::render(
            $path,
            ['filieres' => $data, 'sectors' => $sectors]
        );
        if ($route === 'blog') return Inertia::render(
            $path,
            ['articles' => $data, 'categories' => $categories]
        );
        return Inertia::render($path, ['events' => $data]);
    }

    // /Filieres/{id} | /Blog/{id} | /Events/{id}
    public function detailsPage($id)
    {
        $route = $this->getRouteName() === 'blog' ? 'articles' : $this->getRouteName();
        $element = $this->GetByDataId($route, $id);
        $elements = $this->GetAll($route);
        $sectors = $this->getSectors(true, true);
        $categories = $this->getCategories(true, true);
        // $tags = $this->getTags(true, true);

        $path = 'Front_End/' . ucfirst($this->getRouteName()) . '/' . ucfirst(Str::singular($route)) . 'Details';

        if ($route === 'filieres') return Inertia::render(
            $path,
            ['filiere' => $element, 'filieres' => $elements, 'sectors' => $sectors]
        );
        if ($route === 'articles') return Inertia::render(
            $path,
            [
                'article' => $element, 'articles' => $elements, 'categories' => $categories,
                //  'tags' => $tags
            ]
        );
        return Inertia::render($path, ['event' => $element, 'events' => $elements]);
    }
}
