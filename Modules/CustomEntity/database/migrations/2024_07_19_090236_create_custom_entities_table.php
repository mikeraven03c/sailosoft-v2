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
        Schema::create('custom_entities', function (Blueprint $table) {
            $table->id();
            $table->string('entity', 126)->nullable();
            $table->string('slug', 126)->nullable();
            $table->string('name', 126)->nullable();
            $table->string('navigation', 126)->nullable();
            $table->string('group', 126)->nullable();
            $table->integer('priority')->default(1);
            $table->boolean('is_active')->default(true);
            $table->json('data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_entities');
    }
};
