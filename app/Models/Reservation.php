<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $table = 'Reserva';
    protected $primaryKey = 'reserva_id';
    protected $guarded = [];

     public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'client_id');
    }
}