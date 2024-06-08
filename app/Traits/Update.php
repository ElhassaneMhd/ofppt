<?php
namespace App\Traits;
use App\Models\Article;
use Illuminate\Support\Facades\Session;

trait Update{
    use Store;
    protected function updateArticle($request,$id){
        $article = Article::findOrfail($id);
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
                $this->storeOneFile($image, $article, 'pdf');
            }   
        }

    }
}
