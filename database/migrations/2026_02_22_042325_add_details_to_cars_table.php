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
        Schema::table('cars', function (Blueprint $table) {
        $table->text('description')->nullable(); // Araç açıklaması
        $table->json('features')->nullable();    // Wi-Fi, Deri koltuk gibi özellikler listesi
        $table->integer('luggage_capacity')->default(2); // Bagaj kapasitesi
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            //
        });
    }
};
