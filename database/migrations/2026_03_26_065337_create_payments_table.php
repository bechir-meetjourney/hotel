<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('client_name');
            $table->decimal('amount', 12, 2);
            $table->string('payment_type')->default('bank_transfer'); // cash, bank_transfer, card, online
            $table->decimal('discount', 12, 2)->default(0);
            $table->string('status')->default('pending'); // pending, paid, overdue, refunded
            $table->text('notes')->nullable();
            $table->string('reference')->nullable();
            $table->date('payment_date')->nullable();
            $table->date('due_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
