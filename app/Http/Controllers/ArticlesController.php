<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Year;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    public function index(Request $request){
        //table all articles
        $articles = Article::all();
        $articles = $this->refactorManyElements($articles,'articles');
        $trashedArticles = Article::onlyTrashed()->get();
        $trashedArticles = $this->refactorManyElements($trashedArticles,'articles');
        return Inertia::render('Articles/Index', compact('articles','trashedArticles'));
    }
    public function create(){
    //form to add article
        $years = Year::all();
        $users = User::all();
        $activeYears = Year::active()->get()[0];
        if  (session::missing('YearActive')) {
            session(['YearActive' => $activeYears]);
        }
        return Inertia::render('Articles/Create', compact('years','users','activeYears'));
    }
    public function store(Request $request){
        $this->storeArticle($request);
        return response()->json(['message' => 'article stored successffuly']);
    }
    public function show($id){
    //showArticle
        $article = Article::find($id);
        $article = $this->refactorArticle($article);
        return Inertia::render('Articles/Show',compact( 'article'));
    }
    public function edit($id){
    //GET ARTICLE TO MODIFIE
        $article = Article::find($id);
        $article = $this->refactorArticle($article);
        $years = Year::all();
        $users = User::all();
        return Inertia::render('Articles/Edit', compact('article','years','users'));
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
    public function trash(Request $request){
        $articles = Article::all();
        $trashedArticles = Article::onlyTrashed()->get();
        return Inertia::render('Articles/Trash', compact('articles','trashedArticles'));
    }
    public function forceDelete(string $id){
        $this->forceDeleteData(Article::class, $id);
           return to_route('articles.index');
    }
    public function restore(string $id){
        $this->restoreData(Article::class, $id);
        return redirect()->route('articles.index');
    }

}
