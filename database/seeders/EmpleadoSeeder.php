<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\City;
use App\Models\Empleados;
use Illuminate\Database\Seeder;

class EmpleadoSeeder extends Seeder
{
    public function run(): void
{
    $agencias = Agency::all();

    if ($agencias->isEmpty()) {
        return;
    }

    $empleados = [
        ['documento' => '1010101010', 'nombre' => 'Carlos',  'apellido' => 'Ramírez', 'cargo' => 'Mecánico',      'telefono' => '3001112233'],
        ['documento' => '1020202020', 'nombre' => 'Laura',   'apellido' => 'Gómez',   'cargo' => 'Recepcionista', 'telefono' => '3002223344'],
        ['documento' => '1030303030', 'nombre' => 'Andrés',  'apellido' => 'Torres',  'cargo' => 'Mecánico',      'telefono' => '3003334455'],
        ['documento' => '1040404040', 'nombre' => 'Marta',   'apellido' => 'Pérez',   'cargo' => 'Administradora','telefono' => '3004445566'],
        ['documento' => '1050505050', 'nombre' => 'Julián',  'apellido' => 'Castro',  'cargo' => 'Mecánico',      'telefono' => '3005556677'],
        ['documento' => '1060606060', 'nombre' => 'Sofía',   'apellido' => 'Herrera', 'cargo' => 'Electricista',  'telefono' => '3006667788'],
    ];

    foreach ($empleados as $i => $data) {
        Empleados::firstOrCreate(
            ['documento' => $data['documento']],
            $data + ['agencia_id' => $agencias[$i % $agencias->count()]->agencia_id]
        );
    }
}
}