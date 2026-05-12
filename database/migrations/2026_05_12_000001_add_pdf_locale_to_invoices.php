<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            // Per-invoice PDF language. Drives layout direction (rtl/ltr) and
            // which side of the bilingual label set the Blade templates use.
            $table->string('pdf_locale', 2)->default('en')->after('pdf_template');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('pdf_locale');
        });
    }
};
