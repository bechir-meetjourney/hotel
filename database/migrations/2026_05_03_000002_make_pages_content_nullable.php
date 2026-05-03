<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->longText('content_ar')->nullable()->change();
            $table->longText('content_en')->nullable()->change();
        });
    }

    public function down(): void
    {
        // Revert: only safe if no rows have null content. Skip backfill —
        // re-tightening the constraint is the operator's call when restoring.
        Schema::table('pages', function (Blueprint $table) {
            $table->longText('content_ar')->nullable(false)->change();
            $table->longText('content_en')->nullable(false)->change();
        });
    }
};
