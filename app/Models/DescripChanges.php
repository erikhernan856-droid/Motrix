<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DescripCambios extends Model
{
    use HasFactory;

    protected $table = 'Descrip_cambios';
    protected $primaryKey = 'id_Camb_vehiculo';
    protected $guarded = [];

    // Pertenece a un vehículo
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculos::class, 'fk_vehiculo_camb', 'id_matricula');
    }

    // Pertenece a un cliente
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'fk_cliente_camb', 'cod_cliente');
    }

    // Una descripción de cambios puede tener repuestos asociados
    public function inventarioRepuestos()
    {
        return $this->hasMany(InventarioRep::class, 'fk_descrip', 'id_Camb_vehiculo');
    }
}
