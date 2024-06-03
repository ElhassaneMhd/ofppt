<?php

namespace App\Console\Commands;

use App\Models\Admin;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateSuperAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:superadmin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a Super Admin user with the provided details.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $firstName = $this->ask('Enter First Name:');
        $lastName = $this->ask('Enter Last Name:');
        $email = $this->ask('Enter Email:');
        $validator = Validator::make(['email' => $email], [
            'email' => 'required|unique:profiles|email',
        ]);
        if ($validator->fails()) {
            $this->error($validator->messages()->first());
            return 1; 
        }
        $password = $this->secret('Enter Password (will not be shown):');
        $phone = $this->ask('Enter Phone Number (optional):');

        $profile = new User();
        $profile->firstName = $firstName;
        $profile->lastName = $lastName;
        $profile->email = $email;
        $profile->password = Hash::make($password);
        $profile->phone = $phone;
        $profile->save();
        $profile->assignRole('super-admin');
        $this->info("Super Admin created successfully!");
        $this->info("Email: $email"); 

        return 0; 
    }
}
