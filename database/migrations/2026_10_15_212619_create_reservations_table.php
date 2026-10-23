<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('Reserva', function (Blueprint $table) {
            $table->id('reserva_id');
            $table->string('id_moto', 45);
            $table->string('id_agencia', 45);
            $table->string('id_precio', 45);
            $table->string('id_pago', 45);
            $table->string('id_fecha', 45);
            $table->string('id_fechafin', 45);
            $table->string('fech_reserv', 45);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('Reserva'); }
};
