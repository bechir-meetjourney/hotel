<?php

use App\Http\Controllers\SuperAdmin\DashboardController;
use App\Http\Controllers\SuperAdmin\TenantController;
use App\Http\Controllers\SuperAdmin\ReportController;
use Illuminate\Support\Facades\Route;

// ─── Locale Switcher ────────────────────────────────────────
Route::get('/locale/{locale}', function ($locale) {
    if (in_array($locale, ['ar', 'en'])) {
        session()->put('locale', $locale);
    }
    return back(status: 303);
})->name('locale.switch');

// ─── Auth Routes ────────────────────────────────────────────
require __DIR__.'/auth.php';
require __DIR__.'/settings.php';

// ─── Dashboard Redirect ─────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', fn () => redirect()->route('super-admin.dashboard'));
    Route::get('dashboard', fn () => redirect()->route('super-admin.dashboard'))
        ->name('dashboard');
});

// ─── Super Admin Routes ─────────────────────────────────────
Route::middleware(['auth', 'verified', 'role:super_admin'])
    ->prefix('super-admin')
    ->name('super-admin.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('tenants', [TenantController::class, 'index'])->name('tenants.index');
        Route::get('tenants/create', [TenantController::class, 'create'])->name('tenants.create');
        Route::post('tenants', [TenantController::class, 'store'])->name('tenants.store');
        Route::get('tenants/{tenant}/edit', [TenantController::class, 'edit'])->name('tenants.edit');
        Route::put('tenants/{tenant}', [TenantController::class, 'update'])->name('tenants.update');
        Route::post('tenants/{tenant}/toggle', [TenantController::class, 'toggleStatus'])->name('tenants.toggle');
        Route::post('tenants/{tenant}/approve', [TenantController::class, 'approvePayment'])->name('tenants.approve');
        Route::post('tenants/{tenant}/reject', [TenantController::class, 'rejectPayment'])->name('tenants.reject');

        // Reports
        Route::get('reports/financial', [ReportController::class, 'financial'])->name('reports.financial');
        Route::get('reports/subscriptions', [ReportController::class, 'subscriptions'])->name('reports.subscriptions');
        Route::get('reports/messages', [ReportController::class, 'messages'])->name('reports.messages');
        Route::post('reports/messages/{id}/reply', [ReportController::class, 'replyMessage'])->name('reports.messages.reply');
        Route::post('reports/messages/{id}/status', [ReportController::class, 'updateStatus'])->name('reports.messages.status');
    });
