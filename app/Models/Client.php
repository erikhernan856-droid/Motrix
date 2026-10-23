<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'Clients';

    public const DOC_TYPES = [
        'CC' => 'Cédula de Ciudadanía',
        'CE' => 'Cédula de Extranjería',
        'NIT' => 'Numero de Identificación Tributaria',
        'PP' => 'Pasaporte',
    ];

    public const GENDERS = [
        'M' => 'Masculino',
        'F' => 'Femenino',
        'O' => 'Otro',
    ];

    protected $fillable = [
        'doc_type',
        'id_number',
        'first_name',
        'middle_name',
        'first_last_name',
        'second_last_name',
        'place_exp',
        'phone',
        'loyalty_pts',
        'is_active',
        'email',
        'address',
        'birth_date',
        'grupo_sanguineo',
        'fecha_exp_doc',
    ];

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('first_name', 'like', "%{$search}%")
                ->orWhere('first_last_name', 'like', "%{$search}%")
                ->orWhere('id_number', 'like', "%{$search}%");
        });
    }

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'client_id', 'id'); 
    
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'client_id', 'id');
    }
}