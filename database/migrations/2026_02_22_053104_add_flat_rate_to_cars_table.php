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
        $table->decimal('base_fare', 8, 2)->default(50.00); // Sabit ücret (Örn: 50 CAD)
        $table->integer('base_km_limit')->default(10);      // Kaç KM'ye kadar sabit? (Örn: 10 KM)
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
