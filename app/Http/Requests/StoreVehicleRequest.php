<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'client_id' => ['required', 'exists:clients,client_id'],
            'plate'     => ['required', 'string', 'max:20', 'unique:vehicles,plate'],
            'brand'     => ['required', 'string', 'max:50'],
            'model'     => ['required', 'string', 'max:50'],
            'year'      => ['required', 'integer', 'min:1950', 'max:' . (date('Y') + 1)],
            'tipo'        => ['required', 'in:moto,carro'],
            'color'       => ['nullable', 'string', 'max:30'],
            'kilometraje' => ['required', 'integer', 'min:0'],
            'estado'      => ['required', 'in:en_taller,listo,entregado'],
        ];
    }

}
