<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'Cambio de Aceite y Filtro',
                'description' => 'Reemplazo de aceite de motor sintético/semisintético y filtro de aceite estándar.',
                'price' => 120000,
                'is_active' => true,
            ],
            [
                'name' => 'Alineación y Balanceo',
                'description' => 'Alineación computarizada del tren delantero y balanceo de las 4 ruedas.',
                'price' => 85000,
                'is_active' => true,
            ],
            [
                'name' => 'Revisión del Sistema de Frenos',
                'description' => 'Inspección de pastillas, discos, bandas y rectificación técnica de líquido de frenos.',
                'price' => 60000,
                'is_active' => true,
            ],
            [
                'name' => 'Diagnóstico Escáner Computarizado',
                'description' => 'Lectura de códigos de falla del sistema OBD-II y escaneo general de módulos.',
                'price' => 70000,
                'is_active' => true,
            ],
            [
                'name' => 'Carga de Aire Acondicionado',
                'description' => 'Recarga de gas refrigerante R134a y prueba de fugas en la tubería.',
                'price' => 110000,
                'is_active' => true,
            ],
            [
                'name' => 'Lavado Técnico de Motor',
                'description' => 'Limpieza desengrasante a presión con vapor y recubrimiento protector dieléctrico.',
                'price' => 50000,
                'is_active' => true,
            ],
            [
                'name' => 'Cambio de Pastillas de Freno',
                'description' => 'Instalación de pastillas de freno delanteras/traseras y revisión de mordazas.',
                'price' => 95000,
                'is_active' => true,
            ],
            [
                'name' => 'Sincronización de Motor',
                'description' => 'Limpieza de inyectores por ultrasonido, cuerpo de aceleración y cambio de bujías.',
                'price' => 180000,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['name' => $service['name']], 
                $service
            );
        }
    }
}