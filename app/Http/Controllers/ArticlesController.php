<?php
namespace App\Http\Controllers;

use App\Traits\Delete;
use App\Traits\Get;
use App\Traits\Restore;
use App\Traits\Store;
use App\Models\User;
use App\Models\Article;
use Illuminate\Http\Request;
use App\Models\Year;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    use  Get,Store,Restore,Delete;

    public function index(Request $request){
        //table all articles
        $articles = $this->GetAll('articles');
        $trashedArticles = Article::onlyTrashed()->get();
        return Inertia::render('Articles/Index', [$articles,$trashedArticles]);
    }
    public function create(){
    //form to add article
        $years = Year::all();
        $users = User::all();
         $activeYears = Year::active()->get()[0];
        if  (session::missing('YearActive')) {
        session(['YearActive' => $activeYears]);
        }
        return Inertia::render('Articles/Create', [$years,$users,$activeYears]);
    }
    public function store(Request $request){
        $this->storeArticle($request);
        return response()->json(['message' => 'article stored successffuly']);
        }
    public function show($id){
    //showArticle           
        $article = $this->GetByDataId('articles',$id);
        return Inertia::render('Articles/Show', [$article]);
    }
    public function edit($id){
    //GET ARTICLE TO MODIFIE
        $article = $this->GetByDataId('articles',$id);
        $years = Year::all();
        $users = User::all();
        return Inertia::render('Articles/Edit', [$article,$years,$users]);
    }
    public function update(Request $request, string $id){
    //MODIFIE ARTICLE
        return response()->json(['message' => 'article updated successffuly']);
    }
    public function destroy(string $id){
        $this->destroyElement(Article::class, $id);
        return redirect()->route('articles.index');
    }
    public function trash(Request $request){
        $articles = Article::all();
        $trashedArticles = Article::onlyTrashed()->get();
        return Inertia::render('Articles/Trash', [$articles,$trashedArticles]);
    }
    public function forceDelete(string $id){
        $this->forceDeleteData(Article::class, $id);
        return redirect()->route('articles.trash');
    }
    public function restore(string $id){
        $this->restoreData(Article::class, $id);
        return redirect()->route('articles.index');
    }

}
