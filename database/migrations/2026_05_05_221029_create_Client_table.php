<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id('client_id')->unique();
            $table->string('first_name', 50);
            $table->string('middle_name', 50)->nullable();
            $table->string('first_last_name', 50);
            $table->string('second_last_name', 50)->nullable();
            $table->string('email', 100)->nullable()->unique();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->string('gender')->nullable();
            $table->string('place_exp')->nullable();
            $table->string('grupo_sanguineo')->nullable();
            $table->date('fecha_exp_doc')->nullable();
            $table->integer('loyalty_pts')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('doc_type', 10)->default('CC');
            $table->date('birth_date')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};