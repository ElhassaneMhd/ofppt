<?php

namespace App\Http\Middleware;

use App\Traits\Get;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    use Get;
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => auth()->check() ? ([
                "id" => $request->user()->id,
                "firstName" => $request->user()->firstName,
                "lastName" => $request->user()->lastName,
                "email" => $request->user()->email,
                "phone" => $request->user()->phone,
                "role" => $request->user()->getRoleNames()[0],
                "files" => $this->getElementFiles($request->user()) ?? [],
            ]) : null,
            'year' => Session::get('activeYear'),
            'formationYears' => $this->GetAll('years'),
            'count'=>[
                'users' => $this->GetCount('users'),
                'filieres' => $this->GetCount('filieres'),
                'events' => $this->GetCount('events'),
                'articles' => $this->GetCount('articles'),
                'demands' => $this->GetCount('demands'),
            ]
        ];
    }
}
