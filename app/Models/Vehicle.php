<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vehiculos extends Model
{
    use HasFactory;

    protected $table = 'Vehiculos';
    protected $primaryKey = 'id_matricula';

    protected $fillable = [
        'num_basti',
        'id_color',
        'id_marca',
        'modelo',
        'cliente_cod_cliente',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class, 'cliente_cod_cliente', 'cod_cliente');
    }
}