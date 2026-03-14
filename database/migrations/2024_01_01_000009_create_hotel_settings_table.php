<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hotel_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('hotel_name_ar');
            $table->string('hotel_name_en');
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();
            $table->integer('star_rating')->default(5);
            $table->string('currency')->default('SAR');
            $table->string('timezone')->default('Asia/Riyadh');
            $table->string('check_in_time')->default('14:00');
            $table->string('check_out_time')->default('12:00');
            $table->json('primary_color')->nullable();   // {"light": "#A67D5F", "dark": "#C9A882"}
            $table->json('secondary_color')->nullable();
            $table->json('meta_tags')->nullable(); // SEO meta tags
            $table->timestamps();

            $table->unique('tenant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotel_settings');
    }
};
