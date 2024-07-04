<?php

namespace App\Http\Controllers;

use App\Models\Event;
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

        $upcomingEvents = $this->refactorManyElements(Event::where('upcoming','true')->get(),'events');
        $otherEvents = $this->refactorManyElements(Event::where('upcoming','false')->get(),'events');
        if (count($upcomingEvents) < 4) {
            $events = array_slice(array_merge($upcomingEvents, $otherEvents), 0, 4);
        }else{
            $events = array_slice($upcomingEvents,0,4) ;
        }
        $activeFilieres = $this->refactorManyElements(Filiere::where('isActive','true')->get(),'filieres');
        $otherfilieres = $this->refactorManyElements(Filiere::where('isActive','false')->get(),'filieres');
        if (count($activeFilieres) < 8) {
            $filieres = array_slice(array_merge($activeFilieres, $otherfilieres), 0, 8);
        }else{
            $filieres = array_slice($activeFilieres,0,8) ;
        }
        $sectors = $this->getSectors();
        $stats = $this->getStats("homepage");
        $sectorsWithCount = [];
        foreach ($sectors??[] as $sector) {
             $sectorsWithCount[] = ["name" => $sector, "count" =>  Filiere::where('sector', $sector)->count()];
        }
        usort($sectorsWithCount, function($a, $b) {    return $b['count'] - $a['count'];});
        $sectorsWithCount = array_slice($sectorsWithCount, 0, 8);
        return Inertia::render('Front_End/HomePage', compact('articles', 'events', 'filieres', 'sectors', 'sectorsWithCount',));
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
        $sectors = $this->getSectors(true, false);
        $categories = $this->getCategories(true, false);

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
        $sectors = $this->getSectors(true, false);
        $categories = $this->getCategories(true, false);
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
