<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        User::firstOrCreate(
            ['email' => 'erikhernan856@gmail.com'], 
            [
                'name' => 'Erik',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
            ]
        );

    $this->call([
        ClientSeeder::class,
        VehicleSeeder::class,
        AgencySeeder::class,
        EmpleadoSeeder::class,
        ServiceSeeder::class,
    ]);
    }
}