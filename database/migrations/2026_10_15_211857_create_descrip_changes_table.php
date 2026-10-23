<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('Descrip_cambios', function (Blueprint $table) {
            $table->id('Camb_vehiculo_id');
            $table->integer('Cod_camb_vehi');
            $table->string('Descripcion_camb', 255);
            $table->unsignedBigInteger('fk_vehiculo_camb');
            $table->unsignedBigInteger('fk_cliente_camb');
            
            $table->foreign('fk_vehiculo_camb')->references('id_matricula')->on('Vehiculos')->onDelete('cascade');
            $table->foreign('fk_cliente_camb')->references('cod_cliente')->on('Cliente')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('Descrip_cambios'); }
};
