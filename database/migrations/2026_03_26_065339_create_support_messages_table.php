<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('support_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('client_name');
            $table->string('client_email')->nullable();
            $table->string('type')->default('support'); // support, complaint, inquiry, technical
            $table->string('subject');
            $table->text('message');
            $table->string('status')->default('open'); // open, in_progress, closed
            $table->string('assigned_to')->nullable();
            $table->text('reply')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('support_messages');
    }
};
