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
            $table->text('maps')->nullable()->default('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26447.838038189027!2d-6.771070757911331!3d34.044390422710094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76a365e377477%3A0x412ef7592257e154!2sISTA%20%3A%20Institut%20Sp%C3%A9cialis%C3%A9%20de%20Technologie%20Appliqu%C3%A9e_Hay%20Salam%20Sal%C3%A9!5e0!3m2!1sfr!2sma!4v1718161212834!5m2!1sfr!2sma');
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
