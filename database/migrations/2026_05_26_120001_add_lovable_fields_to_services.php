<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('short_description_ar', 500)->nullable()->after('description_en');
            $table->string('short_description_en', 500)->nullable()->after('short_description_ar');
            $table->text('internal_notes')->nullable()->after('short_description_en');
            $table->unsignedSmallInteger('capacity')->nullable()->after('price');
            $table->string('room_type', 50)->nullable()->after('capacity');
            $table->boolean('is_featured')->default(false)->after('is_active');
            $table->string('booking_channel', 20)->default('whatsapp')->after('accepts_bookings');
            $table->string('whatsapp_number', 30)->nullable()->after('booking_channel');
            $table->text('whatsapp_message_ar')->nullable()->after('whatsapp_number');
            $table->text('whatsapp_message_en')->nullable()->after('whatsapp_message_ar');
            $table->string('booking_email', 150)->nullable()->after('whatsapp_message_en');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'short_description_ar',
                'short_description_en',
                'internal_notes',
                'capacity',
                'room_type',
                'is_featured',
                'booking_channel',
                'whatsapp_number',
                'whatsapp_message_ar',
                'whatsapp_message_en',
                'booking_email',
            ]);
        });
    }
};
