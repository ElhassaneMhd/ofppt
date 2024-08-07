<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Year;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    public function index(Request $request){
        //table all articles
        $articles = $this->refactorManyElements(Article::all(),'articles');
        $categories = $this->getCategories();
        return Inertia::render('Back_Office/Articles/Index', compact('articles','categories'));
    }
    public function create(){
    //form to add article
        $years = Year::all();
        $users = User::all();
        $categories = $this->getCategories();
        return Inertia::render('Back_Office/Articles/Create', compact('years','users','categories'));
    }
    public function store(Request $request){
        $this->storeArticle($request);
        return to_route('articles.index');
    }
    public function show($id){
    //showArticle
        $article = Article::find($id);
        $article = $this->refactorArticle($article);
        return Inertia::render('Back_Office/Articles/Show',compact('article'));
    }
    public function edit($id){
    //GET ARTICLE TO MODIFIE
        $article = Article::find($id);
        $article = $this->refactorArticle($article);
        $users = User::all();
        $categories = $this->getCategories();
        return Inertia::render('Back_Office/Articles/Edit', compact('article','users','categories'));
    }
    public function update(Request $request, string $id){
        $article = Article::findOrfail($id);
        $this->updateArticle($request, $article);
        return to_route('articles.index');
    }
    public function destroy(string $id){
        $this->destroyElement(Article::class, $id);
        return redirect()->route('articles.index');
    }
    public function forceDelete(string $id){
        $this->forceDeleteData(Article::class, $id);
           return to_route('articles.index');
    }
    public function restore(string $id){
        $this->restoreData(Article::class, $id);
    }
}
