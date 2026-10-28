<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'City';
    protected $primaryKey = 'city_id';
    protected $fillable = ['cod_postal', 'province', 'num_habits'];

    // Una ciudad tiene muchas agencias
    public function agencias()
    {
        return $this->hasMany(Agencia::class, 'city_name_city', 'name_city');
    }
}