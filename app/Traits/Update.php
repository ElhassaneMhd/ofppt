<?php

namespace App\Traits;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules\Password;

trait Update
{
     protected function updateEvent($request, $event)
    {
        $event->update($request->all());
        $this->updateFiles($request, $event, 'event');
     }
    protected function updateArticle($request, $article)
    {
        $article->update($request->all());
        $this->updateFiles($request, $article, 'article');
    }

    protected function updateFiliere($request, $filiere)
    {
        $filiere->update($request->all());
       $this->updateFiles($request, $filiere,'filiere');
    }
    protected function updateUser($request, $user)
    {
        if ($request->input('email') !== $user->email) {
            $request->validate(['email' => 'email|unique:users,email']);
        }
        if ($request->input('phone') !== $user->phone) {
            $request->validate(['phone' => 'unique:users,phone']);
        }
        $request->validate([
            'password' => 'nullable|confirmed|min:6',
            'role' => 'exists:roles,name',
        ]);
        $user->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
        ]);

        if ($request->has('role')) {
            $user->syncRoles($request->input('role'));
        }

        $oldAvatar = $user->files->first();
        if ($request->has('files') && count($request->files) > 0) {
            foreach ($request['files'] as $file) {
                $this->storeOneFile($file, $user, 'avatar');
            }
            $oldAvatar && $this->deletOldElementFile($user, $oldAvatar->id);
        }

        if (count($request['files']) > 0 && $request['files'][0] === null) {
            $oldAvatar && $this->deletOldElementFile($user, $oldAvatar->id);
        }
    }
    protected function updateFiles($request, $element, $module)
    {
        $ids = $element->files->pluck('id')->toArray();
        $oldImagesIds = [];
        if (count($request['files']) > 0) {
            foreach ($request['files'] as $file) {
                if (gettype($file) === 'integer' || gettype($file) === 'string') {
                    $oldImagesIds[] = $file;
                } else {
                    $files[] = $file;
                }
            }
        }
        foreach ($ids as $id) {
            if (!in_array($id, $oldImagesIds ?? [])) {
                $this->deletOldElementFile($element, $id);
            }
        }
        foreach ($files ?? [] as $file) {
            $this->storeOneFile($file, $element, $module);
        }
    }
    public function updateUserPassword($request)
    {
        $user = auth()->user();
        $validatedData = $request->validate([
            'currentPassword' => ['required', Password::min(6)->numbers()],
            'password' => ['string', 'required', Password::min(6)->numbers(), 'confirmed']
        ]);
        if (Hash::check($validatedData['currentPassword'], $user->password)) {
            if (Hash::check($validatedData['password'], $user->password)) {
                return 'same';
            }
            $hashedPassword = Hash::make($validatedData['password']);
            $user->password = $hashedPassword;
            $user->save();
            return true;
        }
        return 'wrong';
    }
}
