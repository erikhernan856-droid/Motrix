<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'City';
    protected $primaryKey = 'name_city';
    protected $guarded = [];

    // Una ciudad tiene muchas agencias
    public function agencias()
    {
        return $this->hasMany(Agencia::class, 'city_name_city', 'name_city');
    }
}