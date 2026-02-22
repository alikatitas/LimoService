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
        Schema::create('cars', function (Blueprint $table) {
$table->id();
        $table->string('model_name'); // Örn: Mercedes S-Class
        $table->integer('capacity');   // Kişi sayısı
        $table->decimal('price_per_km', 8, 2); // KM başı ücret
        $table->string('image')->nullable();   // Araç görseli
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
