<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agencia extends Model
{
    use HasFactory;

    protected $table = 'Agencia';
    protected $primaryKey = 'id_name';
    protected $guarded = [];

    
    public function city()
    {
        return $this->belongsTo(City::class, 'city_name_city', 'name_city');
    }

    public function empleados()
    {
        return $this->hasMany(Empleados::class, 'Fk_Agencia', 'id_name');
    }

    public function servicios()
    {
        return $this->hasMany(Servicios::class, 'Id_agencia_servicios', 'id_name');
    }

    public function garages()
    {
        return $this->hasMany(Garage::class, 'agencia_id_name', 'id_name');
    }
}   
