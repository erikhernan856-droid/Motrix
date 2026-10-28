<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\City;
use Illuminate\Database\Seeder;

class AgencySeeder extends Seeder
{
    public function run(): void
    {
        $ciudades = [
            ['cod_postal' => '110111', 'province' => 'Bogotá',       'num_habits' => '7900000'],
            ['cod_postal' => '050001', 'province' => 'Medellín',     'num_habits' => '2600000'],
            ['cod_postal' => '760001', 'province' => 'Cali',         'num_habits' => '2300000'],
            ['cod_postal' => '080001', 'province' => 'Barranquilla', 'num_habits' => '1300000'],
            ['cod_postal' => '680001', 'province' => 'Bucaramanga',  'num_habits' => '600000'],
        ];

        $agencias = [
            ['cod_postal' => '110111', 'id_direc' => 'Calle 100 #15-20',  'id_telefono' => '6012345678'],
            ['cod_postal' => '110111', 'id_direc' => 'Av. Boyacá #72-30', 'id_telefono' => '6018765432'],
            ['cod_postal' => '050001', 'id_direc' => 'Carrera 43A #10-25', 'id_telefono' => '6044567890'],
            ['cod_postal' => '760001', 'id_direc' => 'Av. 6N #25-40',      'id_telefono' => '6023456789'],
            ['cod_postal' => '080001', 'id_direc' => 'Calle 72 #46-15',    'id_telefono' => '6053344556'],
            ['cod_postal' => '680001', 'id_direc' => 'Carrera 27 #36-10',  'id_telefono' => '6076677889'],
        ];

        foreach ($ciudades as $data) {
            City::firstOrCreate(['cod_postal' => $data['cod_postal']], $data);
        }

        foreach ($agencias as $data) {
            $city = City::where('cod_postal', $data['cod_postal'])->first();

            Agency::firstOrCreate(
                ['id_direc' => $data['id_direc']],
                ['id_telefono' => $data['id_telefono'], 'city_id' => $city->city_id]
            );
        }
    }
}