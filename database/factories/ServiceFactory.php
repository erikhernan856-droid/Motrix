<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Cambio de Aceite y Filtro',
                'Alineación y Balanceo',
                'Revisión del Sistema de Frenos',
                'Mantenimiento General',
                'Diagnóstico Escáner Computarizado',
                'Carga de Aire Acondicionado',
                'Lavado Técnico de Motor',
                'Cambio de Pastillas de Freno',
            ]),
            'description' => fake()->sentence(10),
            'price' => fake()->randomFloat(2, 10000, 250000), 
            'is_active' => fake()->boolean(70), 
        ];
    }
}