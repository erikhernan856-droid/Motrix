<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historial_vehiculos', function (Blueprint $table) {
            $table->id('historial_id');
            $table->foreignId('client_id')->constrained('clients', 'client_id')->onDelete('cascade');
            $table->foreignId('vehicle_id')->constrained('vehicles', 'vehicle_id')->onDelete('cascade');
            $table->foreignId('empleado_id')->constrained('empleados', 'empleado_id');
            $table->string('descripcion', 255);
            $table->decimal('precio', 12, 2);
            $table->date('fecha_cambio');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historial_vehiculos');
    }
};