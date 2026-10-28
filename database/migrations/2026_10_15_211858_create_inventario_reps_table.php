<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('Inventario_Rep', function (Blueprint $table) {
            $table->id('repuesto_id');
            $table->string('Code_piece', 45);
            $table->string('Name_piece', 45);
            $table->text('Description');
            $table->integer('Stock');
            $table->decimal('Price_unit', 10, 2);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('Inventario_Rep'); }
};
