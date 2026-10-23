<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
     
        Client::factory(49)->create();

        Client::factory()->create([
            'first_name'       => 'John',
            'middle_name'      => 'Doe',
            'first_last_name'  => 'Smith',
            'second_last_name' => 'Johnson',
            'gender'           => 'Masculino',
            'grupo_sanguineo'  => 'A+',
            'doc_type'         => 'CC',
            'email'            => 'john.smith@example.com',
            'id_number'        => '1234567890', 
            'birth_date'       => '1990-01-01',
            'fecha_exp_doc'    => '2020-01-01',
            'place_exp'        => 'Bogotá',
            'phone'            => '3001234567',
            'is_active'        => true,
        ]);
    }
}