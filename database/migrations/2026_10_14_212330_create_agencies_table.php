<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('agencias', function (Blueprint $table) {
            $table->id('agencia_id');
            $table->string('id_direc', 45);
            $table->string('id_telefono', 45);
            $table->unsignedBigInteger('city_id');
            $table->foreign('city_id')->references('city_id')->on('City')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('agencias'); }
};