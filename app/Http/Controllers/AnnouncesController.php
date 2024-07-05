<?php

namespace App\Http\Controllers;

use App\Models\Announce;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncesController extends Controller
{

    public function store(Request $request){
        $this->storeAnnounce($request);
            return redirect()->back();
    }
    public function update(Request $request, string $id){
        $announce = Announce::find($id);
        $announce->text = $request->text;
        $announce->visibility = $request->visibility;
        $announce->save();
        return redirect()->back();
    }
    public function destroy(string $id){
        $this->destroyElement(Announce::class, $id);
        return redirect()->back();
    }
}
