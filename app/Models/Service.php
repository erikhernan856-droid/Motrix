<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use HasFactory;

    protected $table = 'Service';
    protected $primaryKey = 'idService';

    protected $fillable = [
        'Servicio_1',
        'Servicio_2',
        'Servicio_3',
        'Servicio_4',
        'Id_agencia_servicios',
    ];

    public function agencia(): BelongsTo
    {
        return $this->belongsTo(Agencia::class, 'Id_agencia_servicios', 'id_name');
    }
}