<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->string('payment_status')->default('pending'); // pending, approved, rejected
            $table->string('payment_method')->default('bank_transfer');
            $table->string('bank_transfer_receipt')->nullable();
            $table->text('payment_notes')->nullable();
            $table->string('org_name_ar')->nullable();
            $table->string('org_name_en')->nullable();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('otp_code')->nullable();
            $table->timestamp('otp_expires_at')->nullable();
            $table->boolean('otp_verified')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('tenants', function (Blueprint $table) {
            $table->dropColumn(['payment_status', 'payment_method', 'bank_transfer_receipt', 'payment_notes', 'org_name_ar', 'org_name_en']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['otp_code', 'otp_expires_at', 'otp_verified']);
        });
    }
};
