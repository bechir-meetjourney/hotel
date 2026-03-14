<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_texts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('section'); // hero, about, services, rooms, contact, footer
            $table->string('key');     // title, subtitle, description, cta_text
            $table->text('value_ar')->nullable();
            $table->text('value_en')->nullable();
            $table->timestamps();

            $table->unique(['tenant_id', 'section', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_texts');
    }
};
