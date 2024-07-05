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
            $table->string('email')->nullable()->default('ofppt.contact@gmail.com');
            $table->string('phone')->nullable()->default('0636456789');
            $table->string('facebook')->nullable()->default('https://www.facebook.com/ofppt.page.officielle/');
            $table->string('instagram')->nullable()->default('https://www.instagram.com/ofppt.officiel/');
            $table->string('twitter')->nullable()->default('https://twitter.com/OFPPT_Officiel/');
            $table->string('youtube')->nullable()->default('https://www.youtube.com/c/ofpptchaineofficielle/');
            $table->string('linkedin')->nullable()->default('https://www.linkedin.com/company/ofpptpageofficielle/');
            $table->text('maps')->nullable();
            $table->string('location')->nullable()->default('Maroc, Sale');
            $table->text('aboutDescription')->nullable();
            $table->enum('announcementBanner',['true','false'])->default('true');
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
