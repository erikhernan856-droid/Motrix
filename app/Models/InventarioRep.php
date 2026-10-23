<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventarioRep extends Model
{
    use HasFactory;

    protected $table = 'Inventario_Rep';
    protected $primaryKey = 'id_repuesto';
    protected $guarded = [];

    // Pertenece a una descripción de cambios
    public function descripCambios()
    {
        return $this->belongsTo(DescripCambios::class, 'fk_descrip', 'id_Camb_vehiculo');
    }
}
