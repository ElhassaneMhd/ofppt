<?php

namespace App\Observers;

use App\Models\Filiere;
use App\Traits\Store;

class FiliereObserver
{
    use Store;
    public function created(Filiere $filiere): void{
        $data = [
            'action' => 'Create',
            'model' => 'Filiere',
            'activity'=>'A new filiere has been created',
            'object'=>$filiere->title
        ];
        $this->storeActivite($data);
    }

    public function updated(Filiere $filiere): void
    {
        $data = [
            'action' => 'Update',
            'model' => 'Filiere',
            'activity'=>'A filiere has been updated',
            'object'=>$filiere->title
        ];
        $this->storeActivite($data);
    }

    public function deleted(Filiere $filiere): void
    {
        $data = [
            'action' => 'Delete',
            'model' => 'Filiere',
            'activity'=>'A filiere has been deleted ',
            'object'=>$filiere->title
        ];
        $this->storeActivite($data);
    }


    public function restored(Filiere $filiere): void
    {
        $data = [
            'action' => 'Restore',
            'model' => 'Filiere',
            'activity'=>'A filiere has been restored',
            'object'=>$filiere->title
        ];
        $this->storeActivite($data);
    }

    public function forceDeleted(Filiere $filiere): void
    {
        $data = [
            'action' => 'Force Delete',
            'model' => 'Filiere',
            'activity'=>'A filiere has been deleted permanently',
            'object'=>$filiere->title
        ];
        $this->storeActivite($data);
    }
}

