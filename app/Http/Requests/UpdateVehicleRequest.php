<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tipo'        => ['required', 'in:moto,carro'],
            'color'       => ['nullable', 'string', 'max:30'],
            'kilometraje' => ['required', 'integer', 'min:0'],
            'estado'      => ['required', 'in:en_taller,listo,entregado'],
        ];
    }
}
