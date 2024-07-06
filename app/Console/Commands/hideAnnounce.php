<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class hideAnnounce extends Command
{
    protected $signature = 'hideAnnounce';

    protected $description = 'Command description';
    public function handle(){
        $passedAnnounce = \App\Models\Announce::where('endDate', '<', now())->get();
        foreach($passedAnnounce as $announce){
            $announce->visibility = 'false';
            $announce->save();
        }
        return 0;
    }
}
