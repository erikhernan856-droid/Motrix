<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Client>
 */
class ClientFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name'        => fake('es_CO')->firstName(),
            'middle_name'       => fake()->boolean(70) ? fake('es_CO')->firstName() : null,
            'first_last_name'   => fake('es_CO')->lastName(),
            'second_last_name'  => fake()->boolean(70) ? fake('es_CO')->lastName() : null,
            'gender'            => fake()->randomElement(['Masculino', 'Femenino', 'Otro', 'Prefiero no decir']),
            'grupo_sanguineo'   => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'doc_type'          => fake()->randomElement(['CC', 'TI', 'CE', 'PA', 'RC', 'NIT']),
            'email'             => $this->faker->unique()->safeEmail(),
            'id_number'         => fake()->unique()->numerify('##########'),
            'birth_date'        => fake()->date('Y-m-d', '-18 years'),
            'fecha_exp_doc'     => fake()->date('Y-m-d', 'now'),
            'place_exp'         => fake('es_CO')->city(),
            'phone'             => fake('es_CO')->phoneNumber(),
            'address'           => fake('es_CO')->address(),
            'is_active'         => true,
        ];
    }
}
