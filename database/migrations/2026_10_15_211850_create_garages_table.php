<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('garages', function (Blueprint $table) {
            $table->id('garage_id');
            $table->string('cod_postal', 45);
            $table->string('direccion', 45);

            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');
            $table->unsignedBigInteger('agencia_id'); // Se deja como entero simple sin clave foránea por ahora
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('garages');
    }
};