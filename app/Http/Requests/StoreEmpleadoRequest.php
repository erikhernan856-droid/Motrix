<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmpleadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'documento'  => ['required', 'string', 'max:30', 'unique:empleados,documento'],
            'nombre'     => ['required', 'string', 'max:45'],
            'apellido'   => ['required', 'string', 'max:45'],
            'cargo'      => ['required', 'string', 'max:45'],
            'telefono'   => ['nullable', 'string', 'max:45'],
            'agencia_id' => ['required', 'exists:agencias,agencia_id'],
        ];
    }
}