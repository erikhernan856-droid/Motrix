<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
    $table->id(); 
    $table->unsignedBigInteger('client_id');
    $table->string('plate', 20)->unique();
    $table->string('brand', 50);
    $table->string('model', 50);
    $table->integer('year');
    $table->timestamps();

    $table->foreign('client_id')->references('client_id')->on('clients')->onDelete('cascade');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
