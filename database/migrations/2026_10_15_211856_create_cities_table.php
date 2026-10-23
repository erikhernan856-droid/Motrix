<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('City', function (Blueprint $table) {
            $table->id('city_id');
            $table->string('cod_postal', 45);
            $table->string('province', 45);
            $table->string('num_habits', 45)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('City'); }
    
};
