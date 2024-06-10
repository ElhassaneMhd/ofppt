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
        Schema::create('filieres', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('details');
            $table->boolean('isActive')->nullable();
            $table->string('visibility')->nullable();
            $table->integer('maxStg');
            $table->text('tags')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('year_id')->constrained()->onDelete('cascade');
            $table->string('sector');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filieres');
    }
};
