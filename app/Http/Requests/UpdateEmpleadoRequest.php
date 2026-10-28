<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmpleadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'documento'  => [
                'required', 'string', 'max:30',
                Rule::unique('empleados', 'documento')
                    ->ignore($this->route('empleado')->empleado_id, 'empleado_id'),
            ],
            'nombre'     => ['required', 'string', 'max:45'],
            'apellido'   => ['required', 'string', 'max:45'],
            'cargo'      => ['required', 'string', 'max:45'],
            'telefono'   => ['nullable', 'string', 'max:45'],
            'agencia_id' => ['required', 'exists:agencias,agencia_id'],
        ];
    }
}