<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Traits\Delete;
use App\Traits\Get;
use App\Traits\Refactor;
use App\Traits\Restore;
use App\Traits\Store;
use App\Traits\Update;


class Controller extends BaseController{
    use AuthorizesRequests, DispatchesJobs,ValidatesRequests,Get,Store,Restore,Delete,Refactor,Update;

}
