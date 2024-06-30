<?php

namespace App\Observers;

use App\Models\Article;
use App\Traits\Store;

class ArticleObserver
{
    use Store;
    public function created(Article $article): void
    {
        $data = [
            'action' => 'Create',
            'model' => 'Article',
            'activity'=>'A new article has been created',
            'object'=>$article->title
        ];
        $this->storeActivite($data);
    }

    public function updated(Article $article): void
    {
        $data = [
            'action' => 'Update',
            'model' => 'Article',
            'activity'=>'An article has been updated',
            'object'=>$article->title
        ];
        $this->storeActivite($data);
    }

    public function deleted(Article $article): void
    {
        $data = [
            'action' => 'Delete',
            'model' => 'Article',
            'activity'=>'An article has been deleted permanently',
            'object'=>$article->title
        ];
        $this->storeActivite($data);
    }
   public function restored(Article $article): void
    {
        $data = [
            'action' => 'Restore',
            'model' => 'Article',
            'activity'=>'An article has been restored',
            'object'=>$article->title
        ];
        $this->storeActivite($data);
    }
    public function forceDeleted(Article $article): void
    {
        $data = [
            'action' => 'Force Delete',
            'model' => 'Article',
            'activity'=>'An article has been deleted definitively',
            'object'=>$article->title
        ];
        $this->storeActivite($data);
    }
}
