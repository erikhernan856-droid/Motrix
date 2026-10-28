<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id('empleado_id');
            $table->string('documento', 30)->unique();
            $table->string('nombre', 45);
            $table->string('apellido', 45);
            $table->string('cargo', 45);
            $table->string('telefono', 45)->nullable();
            $table->foreignId('agencia_id')->constrained('agencias', 'agencia_id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('empleados'); }
};