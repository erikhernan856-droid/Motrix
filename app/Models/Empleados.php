<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleados extends Model
{
    use HasFactory;

    protected $table = 'empleados';
    protected $primaryKey = 'empleado_id';

    protected $fillable = ['documento', 'nombre', 'apellido', 'cargo', 'telefono', 'agencia_id'];

    public function getRouteKeyName(): string
    {
        return 'empleado_id';
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('nombre', 'like', "%{$search}%")
                ->orWhere('apellido', 'like', "%{$search}%")
                ->orWhere('documento', 'like', "%{$search}%")
                ->orWhere('cargo', 'like', "%{$search}%");
        });
    }

    public function agencia()
    {
        return $this->belongsTo(Agency::class, 'agencia_id', 'agencia_id');
    }
}