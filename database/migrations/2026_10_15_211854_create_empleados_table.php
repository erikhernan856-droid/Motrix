<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id('empleado_id');
            $table->string('DNI', 45);
            $table->string('Name', 45);
            $table->string('Last_name', 45);
            $table->string('Cargo', 45);
            $table->string('Phone', 45);
            $table->unsignedBigInteger('Fk_Agencia');
            $table->foreign('Fk_Agencia')->references('id')->on('Agencia')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('empleados'); }
};
