<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('Facturacion', function (Blueprint $table) {
            $table->id('factura_id');
            $table->integer('fk_reserva');
            $table->unsignedBigInteger('fk_cliente');
            $table->dateTime('fecha_emision');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('impuestos', 10, 2);
            $table->decimal('Total', 10, 2);
            $table->string('metodo_pago', 45);
            
            $table->foreign('fk_cliente')->references('cod_cliente')->on('Cliente')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('Facturacion'); }
};
