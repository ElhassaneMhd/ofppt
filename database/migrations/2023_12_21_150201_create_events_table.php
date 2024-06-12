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
        Schema::disableForeignKeyConstraints();
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('date');
            $table->string('location');
            $table->integer('duration');
            $table->text('details');
            $table->string('upcoming');
            $table->string('visibility');
            $table->text('tags')->nullable();
            $table->foreignId('year_id')->nullable()->constrained()->nullOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
