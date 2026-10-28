<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historial_Veh extends Model
{
    use HasFactory;

    protected $table = 'historial_vehiculos';
    protected $primaryKey = 'historial_id';

    protected $fillable = [
        'client_id', 'vehicle_id', 'empleado_id',
        'descripcion', 'precio', 'fecha_cambio',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'client_id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id', 'vehicle_id');
    }

    public function empleado()
    {
        return $this->belongsTo(Empleados::class, 'empleado_id', 'empleado_id');
    }
}