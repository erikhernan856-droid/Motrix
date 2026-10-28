<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $clients = Client::all();

        if ($clients->isEmpty()){
            return;
        }

        $vehicles =  [
            ['plate' => 'ABC123', 'brand' => 'Yamaha',    'model' => 'FZ 150',       'year' => 2021, 'tipo' => 'moto',  'color' => 'Negro',  'kilometraje' => 18500, 'estado' => 'en_taller'],
            ['plate' => 'DEF456', 'brand' => 'Honda',     'model' => 'CB 190R',      'year' => 2022, 'tipo' => 'moto',  'color' => 'Rojo',   'kilometraje' => 9200,  'estado' => 'listo'],
            ['plate' => 'GHI789', 'brand' => 'Suzuki',    'model' => 'Gixxer 150',   'year' => 2020, 'tipo' => 'moto',  'color' => 'Azul',   'kilometraje' => 25400, 'estado' => 'entregado'],
            ['plate' => 'JKL012', 'brand' => 'Bajaj',     'model' => 'Pulsar NS200', 'year' => 2023, 'tipo' => 'moto',  'color' => 'Blanco', 'kilometraje' => 3100,  'estado' => 'en_taller'],
            ['plate' => 'MNO345', 'brand' => 'Renault',   'model' => 'Logan',        'year' => 2018, 'tipo' => 'carro', 'color' => 'Gris',   'kilometraje' => 72000, 'estado' => 'entregado'],
            ['plate' => 'PQR678', 'brand' => 'Chevrolet', 'model' => 'Spark GT',     'year' => 2019, 'tipo' => 'carro', 'color' => 'Rojo',   'kilometraje' => 54000, 'estado' => 'listo'],
            ['plate' => 'STU901', 'brand' => 'Mazda',     'model' => 'Mazda 3',      'year' => 2021, 'tipo' => 'carro', 'color' => 'Negro',  'kilometraje' => 38000, 'estado' => 'en_taller'],
            ['plate' => 'VWX234', 'brand' => 'Kia',       'model' => 'Picanto',      'year' => 2020, 'tipo' => 'carro', 'color' => 'Blanco', 'kilometraje' => 41000, 'estado' => 'entregado'],
            ];

            foreach ($vehicles as $data){
            Vehicle::firstOrCreate(
                ['plate' => $data['plate']],
                $data + ['client_id' => $clients->random()->client_id]
            );
        }
    }
}