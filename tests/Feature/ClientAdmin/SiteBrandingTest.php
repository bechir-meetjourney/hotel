<?php

use App\Models\SiteText;
use App\Models\Tenant;
use App\Models\TenantSiteSetting;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

function brandingAdmin(): array
{
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();
    return [$user, $tenant];
}

// ─── Index ─────────────────────────────────────────────────

test('client admin can view site branding page', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('client-admin/site-branding/index')
            ->where('tenant.id', $tenant->id)
            ->where('tenant.slug', $tenant->slug)
            ->has('settings.identity')
            ->has('settings.colors')
            ->has('settings.hero')
            ->has('settings.media')
            ->has('settings.footer')
            ->has('settings.social')
            ->has('siteTexts')
        );
});

test('index exposes the hero_image media slot', function () {
    [$user, $tenant] = brandingAdmin();

    TenantSiteSetting::unguard();
    TenantSiteSetting::create(['tenant_id' => $tenant->id, 'key' => 'hero_image', 'value' => 'tenant-site/hero.jpg']);
    TenantSiteSetting::reguard();

    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page->where('settings.media.hero_image', 'tenant-site/hero.jpg'));
});

test('index returns existing site_texts merged into the canonical skeleton', function () {
    [$user, $tenant] = brandingAdmin();

    SiteText::unguard();
    SiteText::create(['tenant_id' => $tenant->id, 'section' => 'hero', 'key' => 'title', 'value_ar' => 'مرحبا', 'value_en' => 'Hi']);
    SiteText::create(['tenant_id' => $tenant->id, 'section' => 'contact', 'key' => 'phone', 'value_ar' => '123', 'value_en' => '123']);
    SiteText::reguard();

    // hero exposes the canonical keys (title, subtitle, cta) with the seeded
    // title value merged in; contact exposes the canonical keys plus an extra
    // for the tenant-added 'phone' row, so the editor can edit either.
    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->has('siteTexts.hero', 3)
            ->where('siteTexts.hero.0.key', 'title')
            ->where('siteTexts.hero.0.value_en', 'Hi')
            ->has('siteTexts.contact', 3)
        );
});

// ─── Update: text fields ───────────────────────────────────

test('client admin can update hero text fields', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'hero_title_ar' => 'إقامتك المثالية',
            'hero_title_en' => 'Your Perfect Stay',
            'hero_subtitle_ar' => 'وصف عربي',
            'hero_subtitle_en' => 'English description',
        ])
        ->assertRedirect();

    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'hero_title_ar')->value('value'))->toBe('إقامتك المثالية');
    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'hero_title_en')->value('value'))->toBe('Your Perfect Stay');
    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'hero_subtitle_en')->value('value'))->toBe('English description');
});

test('client admin can update colors and font', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'primary_color' => '#0E1738',
            'secondary_color' => '#B48A4A',
            'accent_color' => '#FF0000',
            'font_family' => 'Tajawal',
        ])
        ->assertRedirect();

    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'primary_color')->value('value'))->toBe('#0E1738');
    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'font_family')->value('value'))->toBe('Tajawal');
});

test('client admin can update footer and social links', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'footer_text_ar' => 'حقوق محفوظة',
            'footer_text_en' => 'All rights reserved',
            'social_twitter' => 'https://x.com/diafa',
            'social_facebook' => 'https://fb.com/diafa',
        ])
        ->assertRedirect();

    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'footer_text_ar')->value('value'))->toBe('حقوق محفوظة');
    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'social_twitter')->value('value'))->toBe('https://x.com/diafa');
});

// ─── Update: file uploads ──────────────────────────────────

test('client admin can upload site logo', function () {
    Storage::fake('public');
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'site_logo' => UploadedFile::fake()->image('logo.png', 400, 120),
        ])
        ->assertRedirect();

    $stored = TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'site_logo')->value('value');
    expect($stored)->not->toBeNull();
    Storage::disk('public')->assertExists($stored);
});

test('client admin can upload hero image', function () {
    Storage::fake('public');
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'hero_image' => UploadedFile::fake()->image('hero.jpg', 1600, 900),
        ])
        ->assertRedirect();

    $stored = TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'hero_image')->value('value');
    expect($stored)->not->toBeNull();
    Storage::disk('public')->assertExists($stored);
});

test('uploading a replacement file deletes the previous one', function () {
    Storage::fake('public');
    [$user, $tenant] = brandingAdmin();

    // First upload
    $this->actingAs($user)
        ->post('/client-admin/site-branding', ['site_logo' => UploadedFile::fake()->image('old.png', 400, 120)])
        ->assertRedirect();
    $firstPath = TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'site_logo')->value('value');
    Storage::disk('public')->assertExists($firstPath);

    // Replace
    $this->actingAs($user)
        ->post('/client-admin/site-branding', ['site_logo' => UploadedFile::fake()->image('new.png', 400, 120)])
        ->assertRedirect();
    $secondPath = TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'site_logo')->value('value');

    expect($secondPath)->not->toBe($firstPath);
    Storage::disk('public')->assertMissing($firstPath);
    Storage::disk('public')->assertExists($secondPath);
});

// ─── Update: site texts ────────────────────────────────────

test('client admin can upsert site texts via site-branding update', function () {
    [$user, $tenant] = brandingAdmin();

    SiteText::unguard();
    SiteText::create(['tenant_id' => $tenant->id, 'section' => 'hero', 'key' => 'title', 'value_ar' => 'قديم', 'value_en' => 'Old']);
    SiteText::reguard();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'texts' => [
                ['section' => 'hero', 'key' => 'title', 'value_ar' => 'جديد', 'value_en' => 'New'],
                ['section' => 'contact', 'key' => 'phone', 'value_ar' => '0500', 'value_en' => '0500'],
            ],
        ])
        ->assertRedirect();

    $hero = SiteText::where('tenant_id', $tenant->id)->where('section', 'hero')->where('key', 'title')->first();
    expect($hero->value_ar)->toBe('جديد');
    expect($hero->value_en)->toBe('New');
    expect(SiteText::where('tenant_id', $tenant->id)->count())->toBe(2);
});

// ─── Canonical skeleton ────────────────────────────────────

test('index returns a pre-filled canonical skeleton for fresh tenants', function () {
    [$user] = brandingAdmin();

    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->has('siteTexts.hero', 3)        // title, subtitle, cta
            ->has('siteTexts.about', 3)        // title, subtitle, description
            ->has('siteTexts.contact', 2)      // title, subtitle
            ->has('siteTexts.footer', 2)
            ->where('siteTexts.hero.0.key', 'title')
            ->where('siteTexts.hero.0.value_ar', '')
        );
});

test('update skips empty text rows so the canonical skeleton does not pollute the DB', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'texts' => [
                ['section' => 'hero', 'key' => 'title', 'value_ar' => '', 'value_en' => ''],
                ['section' => 'hero', 'key' => 'subtitle', 'value_ar' => 'فقط هذا', 'value_en' => 'Only this'],
            ],
        ])
        ->assertRedirect();

    expect(SiteText::where('tenant_id', $tenant->id)->count())->toBe(1);
    expect(SiteText::where('tenant_id', $tenant->id)->where('key', 'subtitle')->value('value_en'))->toBe('Only this');
});

// ─── Contact ───────────────────────────────────────────────

test('index exposes contact settings', function () {
    [$user, $tenant] = brandingAdmin();
    \App\Models\ContactSetting::unguard();
    \App\Models\ContactSetting::create(['tenant_id' => $tenant->id, 'phone' => '+966500000000', 'email' => 'hi@hotel.sa']);
    \App\Models\ContactSetting::reguard();

    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->where('contact.phone', '+966500000000')
            ->where('contact.email', 'hi@hotel.sa')
        );
});

test('client admin can save contact settings via site-branding update', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'contact' => [
                'whatsapp' => '+966500000001',
                'phone' => '+966500000002',
                'email' => 'contact@hotel.sa',
                'address_ar' => 'الرياض',
                'address_en' => 'Riyadh',
                'google_maps_url' => 'https://maps.google.com/?q=riyadh',
                'instagram' => 'hotel_diafa',
            ],
        ])
        ->assertRedirect();

    $row = \App\Models\ContactSetting::where('tenant_id', $tenant->id)->first();
    expect($row)->not->toBeNull();
    expect($row->phone)->toBe('+966500000002');
    expect($row->email)->toBe('contact@hotel.sa');
    expect($row->google_maps_url)->toBe('https://maps.google.com/?q=riyadh');
});

test('saving contact upserts instead of duplicating', function () {
    [$user, $tenant] = brandingAdmin();
    \App\Models\ContactSetting::unguard();
    \App\Models\ContactSetting::create(['tenant_id' => $tenant->id, 'phone' => 'old', 'email' => 'old@hotel.sa']);
    \App\Models\ContactSetting::reguard();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'contact' => ['phone' => 'new', 'email' => 'new@hotel.sa'],
        ])
        ->assertRedirect();

    expect(\App\Models\ContactSetting::where('tenant_id', $tenant->id)->count())->toBe(1);
    expect(\App\Models\ContactSetting::where('tenant_id', $tenant->id)->value('phone'))->toBe('new');
});

// ─── Auth gate ─────────────────────────────────────────────

test('guests are redirected to login', function () {
    $this->get('/client-admin/site-branding')->assertRedirect('/login');
});
