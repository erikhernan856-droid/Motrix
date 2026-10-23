<?php

namespace App\Http\Requests;

use App\Models\Client;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $client = $this->route('client');
        $clientId = $client instanceof \App\Models\Client ? $client->id : $client;

        return [
            'doc_type' => ['required', Rule::in(array_keys(Client::DOC_TYPES))],
            'id_number' => [
                'required', 'integer', 'min:1',
                Rule::unique('clients')
                ->where('doc_type', $this->doc_type)
            ],
            'first_name' => ['required', 'string', 'max:80'],
            'middle_name' => ['nullable', 'string', 'max:80'],
            'first_last_name' => ['required', 'string', 'max:80'],
            'second_last_name' => ['nullable', 'string', 'max:80'],
            'gender' => ['nullable', Rule::in(array_keys(Client::GENDERS))],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => [
                'nullable', 'email', 'max:150',
                Rule::unique('clients', 'email')->ignore($clientId),
            ],
            'address' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'loyalty_pts' => ['integer', 'min:0'],
            'is_active' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'string' => 'El campo :attribute debe ser texto.',
            'integer' => 'El campo :attribute debe ser un número entero.',
            'min' => 'El campo :attribute debe ser al menos :min.',
            'max' => 'El campo :attribute no puede exceder :max caracteres.',
            'email' => 'El campo :attribute debe ser un correo electrónico válido.',
            'unique' => 'El :attribute ya se encuentra registrado en el sistema.',
            'in' => 'El valor seleccionado para :attribute no es válido.',
            'date' => 'El campo :attribute debe ser una fecha válida.',
            'before' => 'La :attribute debe ser una fecha anterior a hoy.',
            'boolean' => 'El campo :attribute debe ser verdadero o falso.',
        ];
    }

    public function attributes(): array
    {
        return [
            'doc_type' => 'tipo de documento',
            'id_number' => 'número de identificación',
            'first_name' => 'primer nombre',
            'middle_name' => 'segundo nombre',
            'first_last_name' => 'primer apellido',
            'second_last_name' => 'segundo apellido',
            'gender' => 'género',
            'phone' => 'teléfono',
            'email' => 'correo electrónico',
            'address' => 'dirección',
            'birth_date' => 'fecha de nacimiento',
            'loyalty_pts' => 'puntos de lealtad',
            'is_active' => 'estado',
        ];
    }
}
