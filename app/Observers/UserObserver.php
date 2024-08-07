<?php

namespace App\Observers;

use App\Models\User;
use App\Traits\Store;

class UserObserver
{
    use Store   ;
    public function created(User $user): void
    {
        $data = [
            'action' => 'Create',
            'model' => 'User',
            'activity'=>'A new ' .( request()->input('role')??'user').' account has been created',
            'object'=> $user->firstName . ' ' . $user->lastName
        ];
        $this->storeActivite($data);
    }
    public function updated(User $user): void
    {
        $data = [
            'action' => 'Update',
            'model' => 'User',
            'activity'=>'A User has been updated',
            'object'=>$user->firstName . ' ' . $user->lastName
        ];
        $this->storeActivite($data);
    }
    public function deleted(User $user): void
    {
        $data = [
            'action' => 'Delete',
            'model' => 'User',
            'activity'=>'A User has been deleted ',
            'object'=>$user->firstName . ' ' . $user->lastName
        ];
        $this->storeActivite($data);
    }
    public function restored(User $user): void
    {
        $data = [
            'action' => 'Restore',
            'model' => 'User',
            'activity'=>'A User has been restored',
            'object'=>$user->firstName . ' ' . $user->lastName
        ];
        $this->storeActivite($data);
    }
    public function forceDeleted(User $user): void
    {
        $data = [
            'action' => 'Force Delete',
            'model' => 'User',
            'activity'=>'A User has been deleted permanently',
            'object'=>$user->firstName . ' ' . $user->lastName
        ];
        $this->storeActivite($data);
    }
}
