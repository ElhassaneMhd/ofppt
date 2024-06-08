<?php
namespace App\Http\Controllers;

use App\Traits\Get;
use App\Traits\Store;
use App\Models\User;
use App\Models\Article;
use App\Traits\filterTrait;
use Illuminate\Http\Request;
use App\Models\Year;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Traits\destroyTrait;
use App\Traits\forceDeleteTrait;
use App\Traits\restoreTrait;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    use filterTrait,destroyTrait, forceDeleteTrait, restoreTrait, Get,Store;

public function index(Request $request){
        //table all articles
        $articles = $this->GetAll('articles');
        $trashedArticles = Article::onlyTrashed()->get();
        return Inertia::render('articlesIndex', [$articles,$trashedArticles]);
}
public function create(){
//form to add article
        $years = Year::all();
        $users = User::all();
         $activeYears = Year::active()->get()[0];
        if  (session::missing('YearActive')) {
        session(['YearActive' => $activeYears]);
        }
        return Inertia::render('articlesCreate', [$years,$users,$activeYears]);
    }
public function store(Request $request){
        $this->storeArticle($request);     
       return to_route('articles.index');
    }
public function show($id){
//showArticle           
        $article = $this->GetByDataId('articles',$id);
        return Inertia::render('articlesShow', [$article]);
    }

public function edit($id){
//GET ARTICLE TO MODIFIE
        $article = $this->GetByDataId('articles',$id);
        $years = Year::all();
        $users = User::all();
        return Inertia::render('articlesEdit', [$article,$years,$users]);
    }

public function update(Request $request, string $id){
//MODIFIE ARTICLE
        $article = Article::findOrfail($id);

        // $oldDom = new DOMDocument();
        // $oldDom->loadHTML($article->details, 9);
        // $oldImages = $oldDom->getElementsByTagName('img');


        // $newDom = new DOMDocument();
        // @$newDom->loadHTML($request->description,9);
        // $newImages = $newDom->getElementsByTagName('img');

        // $newImagesSrc = [];

    //     foreach( $newImages as $key => $newImg ){

    //     if (str_starts_with($newImg->getAttribute('src'), 'data:image')) {
    //         $data = base64_decode(explode(',', explode(';', $newImg->getAttribute('src'))[1])[1]);
    //         $image_name = '/storage/upload/' . str_replace(' ', '_', explode('.', $newImg->getAttribute('data-filename'))[0]) . time() . '.png';
    //         file_put_contents(public_path() . $image_name, $data);
    //         $newImg->removeAttribute('src');
    //         $newImg->setAttribute('src', $image_name);
    //     }
    //     array_push( $newImagesSrc, $newImg->getAttribute('src'));
    //    }

    //     foreach ($oldImages as $oldImg) {

    //         if (in_array($oldImg->getAttribute('src'), $newImagesSrc)){
    //             continue;
    //         }

    //         $path = str_replace('/storage', '', $oldImg->getAttribute('src'));

    //         if (Storage::disk('public')->exists($path)) {
    //             Storage::disk('public')->delete($path);
    //         }
    //     }

    //     $description = $newDom->saveHTML();

        $article->title = $request->title;
        $article->details = $request->description;
        $article->date = $request->date_publication;
        if(isset($request->user)){
            $article->user_id = $request->user;
        }else{
            $article->user_id = Session::get('user')->id;
        }
        $article->categorie_id = $request->categorie;
        $article->year_id = $request->year;
        $article->save();
//modify old files
        if ($request->has('oldImages')){
            foreach($article->files as $file) {
                if (in_array( $file->id, $request->oldImages)===false){
                    $filePath = public_path('article/'. $file->url);
                    if (\Illuminate\Support\Facades\File::exists($filePath)) {
                        \Illuminate\Support\Facades\File::delete($filePath);
                    }
                   $file->delete();
                }
            }
        } else {
            foreach($article->files as $pj) {$pj->delete();}
        }
//add new file
          if ($request->hasfile('images') && count($request->images) > 0) {
            foreach ($request->images as $image) {
            $imageURL =$image->getClientOriginalName();
            $article->files()->create([
                'nom'=>$request->title,
                'taille'=> 11,
                'emplacement'=>'file:///C:/laravel/OFPPT/public/images/articles',
                'URL'=>$imageURL,
            ]);
            $image->move('../public_html/images/article',$imageURL);
        }   
        }

        return redirect()->route('articles.index');
    }
public function destroy(string $id){
    //move  to trash

    $this->destroyData(Article::class, $id);

    return redirect()->route('articles.index');

    }

public function filter(Request $request){
    return $this->filterData($request, Article::class);
}

public function trash(Request $request){
//table articles in trash
        $rowsNum = $request->rowsNum ? $request->rowsNum : 5;
        $sort = $request->sort ? $request->sort : null;
        $allPubliee = Article::all();
        $user = Auth::user();
        $admins = User::all();
        $Year = Year::all();
        $activeYears = Year::active()->get()[0];
        $allTrashed = Article::onlyTrashed()->get();
        $publieeArticles = Article::paginate(5);
        $trashedArticles = Article::onlyTrashed()->paginate(5);
        return view('articles.trash', compact(['publieeArticles','trashedArticles', 'user','activeYears','allPubliee', 'allTrashed', "admins", "Year", "rowsNum", "sort"]));
    }

public function forceDelete(string $id){
    //force delete from trash

        $this->forceDeleteData(Article::class, $id, 'article');

        return redirect()->route('articles.trash');
    }
public function restore(string $id){
    //restore Article from trash
    
        $this->restoreData(Article::class, $id);

        return redirect()->route('articles.index');
    }

}
