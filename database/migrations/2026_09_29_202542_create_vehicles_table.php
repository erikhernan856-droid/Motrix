<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id('vehicle_id');
            $table->foreignId('client_id')->constrained('clients', 'client_id')->onDelete('cascade');
            $table->string('plate', 20)->unique();
            $table->string('brand', 50);
            $table->string('model', 50);
            $table->integer('year');
            $table->string('tipo', 10)->default('moto');
            $table->string('color', 30)->nullable();
            $table->unsignedInteger('kilometraje')->default(0);
            $table->string('estado', 20)->default('entregado');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};