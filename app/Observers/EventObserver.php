<?php

namespace App\Observers;

use App\Models\Event;
use App\Traits\Store;

class EventObserver
{
    use Store;
    public function created(Event $event): void
    {
        $data = [
            'action' => 'Create',
            'model' => 'Event',
            'activity'=>'A new event has been created',
            'object'=>$event->title
        ];
        $this->storeActivite($data);
    }
    public function updated(Event $event): void
    {
        $data = [
            'action' => 'Update',
            'model' => 'Event',
            'activity'=>'An event has been updated',
            'object'=>$event->title
        ];
        $this->storeActivite($data);
    }

    public function deleted(Event $event): void
    {
        $data = [
            'action' => 'Delete',
            'model' => 'Event',
            'activity'=>'An event has been deleted ',
            'object'=>$event->title
        ];
        $this->storeActivite($data);
    }
    public function restored(Event $event): void
    {
        $data = [
            'action' => 'Restore',
            'model' => 'Event',
            'activity'=>'An event has been restored',
            'object'=>$event->title
        ];
        $this->storeActivite($data);
    }
    public function forceDeleted(Event $event): void
    {
        $data = [
            'action' => 'Force Delete',
            'model' => 'Event',
            'activity'=>'An event has been deleted permanently',
            'object'=>$event->title
        ];
        $this->storeActivite($data);
    }
}
