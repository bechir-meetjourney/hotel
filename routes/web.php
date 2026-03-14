<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SetupController;
use App\Http\Controllers\TenantSiteController;
use App\Http\Controllers\SuperAdmin\DashboardController as SuperAdminDashboard;
use App\Http\Controllers\SuperAdmin\TenantController;
use App\Http\Controllers\ClientAdmin\DashboardController as ClientAdminDashboard;
use App\Http\Controllers\ClientAdmin\RoomController;
use App\Http\Controllers\ClientAdmin\GalleryController;
use App\Http\Controllers\ClientAdmin\SiteTextController;
use App\Http\Controllers\ClientAdmin\SiteSectionController;
use App\Http\Controllers\ClientAdmin\ContactSettingController;
use App\Http\Controllers\ClientAdmin\HotelSettingController;

// ─── Public Routes ──────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::get('/template-test', function () {
    $templateTranslations = __('templates');
    return Inertia::render('TemplateTest', [
        'templateTranslations' => $templateTranslations
    ]);
})->name('template.test');

if (!function_exists('inertiaWithLang')) {
    function inertiaWithLang($page) {
        $lang = syncLangFiles('messages');
        return Inertia::render($page, ['lang' => $lang]);
    }
}

Route::get('/Privacy', fn () => inertiaWithLang('public/Privacy'))->name('privacy');
Route::get('/templates', fn () => inertiaWithLang('public/Templates'))->name('templates');

// ─── Template Preview Routes ────────────────────────────────
Route::prefix('template')->name('template.')->group(function () {
    Route::get('/riyadh', function () {
        return Inertia::render('templates/Riyadh/index', [
            'templateTranslations' => __('templates', [], app()->getLocale()),
        ]);
    })->name('riyadh');

    Route::get('/madina', function () {
        $locale = app()->getLocale();
        return Inertia::render('templates/Madina/index', [
            'templateTranslations' => __('madina', [], $locale),
            'locale' => $locale,
        ]);
    })->name('madina');
});

// ─── Locale Switcher ────────────────────────────────────────
Route::get('/locale/{locale}', function ($locale) {
    if (in_array($locale, ['ar', 'en'])) {
        session()->put('locale', $locale);
    }
    return back(status: 303);
})->name('locale.switch');

// ─── Setup Wizard ───────────────────────────────────────────
Route::prefix('setup')->name('setup.')->group(function () {
    Route::get('plan', [SetupController::class, 'plan'])->name('plan');
    Route::get('template', [SetupController::class, 'template'])->name('template');
    Route::get('org', [SetupController::class, 'org'])->name('org');
    Route::get('account', [SetupController::class, 'account'])->name('account');
    Route::get('review', [SetupController::class, 'review'])->name('review');
    Route::get('payment-method', [SetupController::class, 'paymentMethod'])->name('paymentMethod');
    Route::get('pay', [SetupController::class, 'pay'])->name('pay');
});

// ─── Tenant Public Site (by slug) ───────────────────────────
Route::get('/hotel/{slug}', [TenantSiteController::class, 'show'])->name('tenant.site');

// ─── Auth Routes ────────────────────────────────────────────
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// ─── Authenticated Dashboard (default) ─────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user->isSuperAdmin()) {
            return redirect()->route('super-admin.dashboard');
        }
        return redirect()->route('client-admin.dashboard');
    })->name('dashboard');
});

// ─── Super Admin Routes ─────────────────────────────────────
Route::middleware(['auth', 'verified', 'role:super_admin'])
    ->prefix('super-admin')
    ->name('super-admin.')
    ->group(function () {
        Route::get('/', [SuperAdminDashboard::class, 'index'])->name('dashboard');

        Route::get('tenants', [TenantController::class, 'index'])->name('tenants.index');
        Route::get('tenants/create', [TenantController::class, 'create'])->name('tenants.create');
        Route::post('tenants', [TenantController::class, 'store'])->name('tenants.store');
        Route::get('tenants/{tenant}/edit', [TenantController::class, 'edit'])->name('tenants.edit');
        Route::put('tenants/{tenant}', [TenantController::class, 'update'])->name('tenants.update');
        Route::post('tenants/{tenant}/toggle', [TenantController::class, 'toggleStatus'])->name('tenants.toggle');
    });

// ─── Client Admin Routes ────────────────────────────────────
Route::middleware(['auth', 'verified', 'role:client_admin', 'tenant'])
    ->prefix('client-admin')
    ->name('client-admin.')
    ->group(function () {
        Route::get('/', [ClientAdminDashboard::class, 'index'])->name('dashboard');

        // Rooms CRUD
        Route::get('rooms', [RoomController::class, 'index'])->name('rooms.index');
        Route::get('rooms/create', [RoomController::class, 'create'])->name('rooms.create');
        Route::post('rooms', [RoomController::class, 'store'])->name('rooms.store');
        Route::get('rooms/{room}/edit', [RoomController::class, 'edit'])->name('rooms.edit');
        Route::put('rooms/{room}', [RoomController::class, 'update'])->name('rooms.update');
        Route::delete('rooms/{room}', [RoomController::class, 'destroy'])->name('rooms.destroy');

        // Gallery
        Route::get('gallery', [GalleryController::class, 'index'])->name('gallery.index');
        Route::post('gallery', [GalleryController::class, 'store'])->name('gallery.store');
        Route::put('gallery/{galleryImage}', [GalleryController::class, 'update'])->name('gallery.update');
        Route::delete('gallery/{galleryImage}', [GalleryController::class, 'destroy'])->name('gallery.destroy');
        Route::post('gallery/reorder', [GalleryController::class, 'reorder'])->name('gallery.reorder');

        // Site Texts
        Route::get('site-texts', [SiteTextController::class, 'index'])->name('site-texts.index');
        Route::put('site-texts', [SiteTextController::class, 'update'])->name('site-texts.update');

        // Site Sections
        Route::get('site-sections', [SiteSectionController::class, 'index'])->name('site-sections.index');
        Route::post('site-sections/{siteSection}/toggle', [SiteSectionController::class, 'toggle'])->name('site-sections.toggle');
        Route::post('site-sections/reorder', [SiteSectionController::class, 'reorder'])->name('site-sections.reorder');

        // Contact Settings
        Route::get('contact-settings', [ContactSettingController::class, 'edit'])->name('contact-settings.edit');
        Route::put('contact-settings', [ContactSettingController::class, 'update'])->name('contact-settings.update');

        // Hotel Settings
        Route::get('hotel-settings', [HotelSettingController::class, 'edit'])->name('hotel-settings.edit');
        Route::put('hotel-settings', [HotelSettingController::class, 'update'])->name('hotel-settings.update');
    });

// ─── 404 Fallback ───────────────────────────────────────────
Route::fallback(fn () => Inertia::render('public/NotFound'));
