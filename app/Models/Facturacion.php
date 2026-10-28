<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facturacion extends Model
{
    use HasFactory;

    protected $table = 'Facturacion';
    protected $primaryKey = 'id_factura';
    protected $guarded = [];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'fk_cliente', 'cod_cliente');
    }
}
