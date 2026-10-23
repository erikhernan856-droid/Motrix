<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Garage extends Model
{
    use HasFactory;

    protected $table = 'Garage';
    protected $primaryKey = 'name_garage';
    protected $guarded = [];

    // Pertenece a un vehículo (motocicleta)
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculos::class, 'motosicleta_id_matricula', 'id_matricula');
    }

    // Pertenece a una agencia
    public function agencia()
    {
        return $this->belongsTo(Agencia::class, 'agencia_id_name', 'id_name');
    }

    // Pertenece a un cliente
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_cod_cliente', 'cod_cliente');
    }
}