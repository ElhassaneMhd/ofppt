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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('email')->nullable()->default('email@gmail.com');
            $table->string('phone')->nullable()->default('0636456789');
            $table->string('facebook')->nullable()->default('https://www.facebook.com/');
            $table->string('instagram')->nullable()->default('https://www.instagram.com/');
            $table->string('twitter')->nullable()->default('https://twitter.com/');
            $table->string('youtube')->nullable()->default('https://www.youtube.com/');
            $table->string('linkedin')->nullable()->default('https://www.linkedin.com/');
            $table->text('maps')->nullable()->default('https://maps.app.goo.gl/ukHGaF5UynA1SZw3A');
            $table->string('location')->nullable()->default('Maroc, Sale');
            $table->text('aboutDescription')->nullable()->default('About Us');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
