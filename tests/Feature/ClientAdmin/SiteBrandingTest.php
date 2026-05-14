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

    // hero exposes the canonical keys (title, subtitle, cta, title_2, subtitle_2)
    // with the seeded title value merged in; contact exposes the canonical keys
    // plus an extra for the tenant-added 'phone' row, so the editor can edit either.
    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->has('siteTexts.hero', 5)
            ->where('siteTexts.hero.0.key', 'title')
            ->where('siteTexts.hero.0.value_en', 'Hi')
            ->has('siteTexts.contact', 3)
        );
});

// ─── Update: text fields ───────────────────────────────────

test('client admin can update hero text via the site_texts pathway', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'texts' => [
                ['section' => 'hero', 'key' => 'title', 'value_ar' => 'إقامتك المثالية', 'value_en' => 'Your Perfect Stay'],
                ['section' => 'hero', 'key' => 'subtitle', 'value_ar' => 'وصف عربي', 'value_en' => 'English description'],
                ['section' => 'hero', 'key' => 'title_2', 'value_ar' => 'الشريحة الثانية', 'value_en' => 'Slide Two'],
            ],
        ])
        ->assertRedirect();

    expect(SiteText::where('tenant_id', $tenant->id)->where('section', 'hero')->where('key', 'title')->value('value_en'))->toBe('Your Perfect Stay');
    expect(SiteText::where('tenant_id', $tenant->id)->where('section', 'hero')->where('key', 'title_2')->value('value_ar'))->toBe('الشريحة الثانية');
});

test('client admin can update social links', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'social_twitter' => 'https://x.com/diafa',
            'social_facebook' => 'https://fb.com/diafa',
        ])
        ->assertRedirect();

    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'social_twitter')->value('value'))->toBe('https://x.com/diafa');
    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'social_facebook')->value('value'))->toBe('https://fb.com/diafa');
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
            ->has('siteTexts.hero', 5)        // title, subtitle, cta, title_2, subtitle_2
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

// ─── Footer ────────────────────────────────────────────────

test('footer section is part of the canonical site_texts skeleton', function () {
    [$user] = brandingAdmin();

    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->has('siteTexts.footer', 2)
            ->where('siteTexts.footer.0.key', 'title')
            ->where('siteTexts.footer.0.value_ar', '')
            ->where('siteTexts.footer.1.key', 'description')
            ->where('siteTexts.footer.1.value_ar', '')
        );
});

test('client admin can save footer title and description via site-branding update', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'texts' => [
                ['section' => 'footer', 'key' => 'title', 'value_ar' => 'فندقنا', 'value_en' => 'Our Hotel'],
                ['section' => 'footer', 'key' => 'description', 'value_ar' => 'وصف الفوتر', 'value_en' => 'Footer description'],
            ],
        ])
        ->assertRedirect();

    $title = SiteText::where('tenant_id', $tenant->id)->where('section', 'footer')->where('key', 'title')->first();
    expect($title->value_ar)->toBe('فندقنا');
    expect($title->value_en)->toBe('Our Hotel');

    $description = SiteText::where('tenant_id', $tenant->id)->where('section', 'footer')->where('key', 'description')->first();
    expect($description->value_ar)->toBe('وصف الفوتر');
    expect($description->value_en)->toBe('Footer description');
});

test('the orphan footer_text_ar/_en fields are no longer persisted', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            // These keys used to write to tenant_site_settings; they're now
            // outside the controller's validate() ruleset so the request
            // ignores them. Nothing should land in the DB for them.
            'footer_text_ar' => 'حقوق محفوظة',
            'footer_text_en' => 'All rights reserved',
        ])
        ->assertRedirect();

    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'footer_text_ar')->exists())->toBeFalse();
    expect(TenantSiteSetting::where('tenant_id', $tenant->id)->where('key', 'footer_text_en')->exists())->toBeFalse();
});

test('updating footer with empty texts does not pollute the DB', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'texts' => [
                ['section' => 'footer', 'key' => 'title', 'value_ar' => '', 'value_en' => ''],
                ['section' => 'footer', 'key' => 'description', 'value_ar' => 'مهم', 'value_en' => ''],
            ],
        ])
        ->assertRedirect();

    // Empty title should be skipped; description with one filled side persists.
    expect(SiteText::where('tenant_id', $tenant->id)->where('section', 'footer')->count())->toBe(1);
    expect(SiteText::where('tenant_id', $tenant->id)->where('key', 'description')->value('value_ar'))->toBe('مهم');
});

// ─── Additional Services ──────────────────────────────────

test('additional_services canonical skeleton exposes section + 4 items', function () {
    [$user] = brandingAdmin();

    // 2 section keys (title, description) + 4 items × 2 keys (title, description) = 10
    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->has('siteTexts.additional_services', 10)
            ->where('siteTexts.additional_services.0.key', 'title')
            ->where('siteTexts.additional_services.1.key', 'description')
            ->where('siteTexts.additional_services.2.key', 'service_1_title')
        );
});

test('additional_services media slots are exposed in settings.media', function () {
    [$user] = brandingAdmin();

    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->has('settings.media.additional_service_1_image')
            ->has('settings.media.additional_service_2_image')
            ->has('settings.media.additional_service_3_image')
            ->has('settings.media.additional_service_4_image')
        );
});

test('client admin can upload a per-item additional_services image', function () {
    Storage::fake('public');
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'additional_service_1_image' => UploadedFile::fake()->image('svc1.jpg', 1200, 800),
        ])
        ->assertRedirect();

    $stored = TenantSiteSetting::where('tenant_id', $tenant->id)
        ->where('key', 'additional_service_1_image')
        ->value('value');
    expect($stored)->not->toBeNull();
    Storage::disk('public')->assertExists($stored);
});

test('client admin can save additional_services section title/description and per-item texts', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'texts' => [
                ['section' => 'additional_services', 'key' => 'title', 'value_ar' => 'خدماتنا', 'value_en' => 'Our services'],
                ['section' => 'additional_services', 'key' => 'description', 'value_ar' => 'تفاصيل', 'value_en' => 'Details'],
                ['section' => 'additional_services', 'key' => 'service_1_title', 'value_ar' => 'الواحد', 'value_en' => 'One'],
                ['section' => 'additional_services', 'key' => 'service_4_description', 'value_ar' => 'الرابع', 'value_en' => 'Fourth'],
            ],
        ])
        ->assertRedirect();

    $title = SiteText::where('tenant_id', $tenant->id)
        ->where('section', 'additional_services')->where('key', 'title')->first();
    expect($title->value_en)->toBe('Our services');

    $svc1 = SiteText::where('tenant_id', $tenant->id)
        ->where('section', 'additional_services')->where('key', 'service_1_title')->first();
    expect($svc1->value_ar)->toBe('الواحد');

    $svc4 = SiteText::where('tenant_id', $tenant->id)
        ->where('section', 'additional_services')->where('key', 'service_4_description')->first();
    expect($svc4->value_en)->toBe('Fourth');
});

// ─── Services (mock items) ────────────────────────────────

test('services canonical skeleton exposes header + 6 mock items', function () {
    [$user] = brandingAdmin();

    // 3 header keys (title, subtitle, background_title) + 6 items × 2 keys = 15
    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->has('siteTexts.services', 15)
            ->where('siteTexts.services.0.key', 'title')
            ->where('siteTexts.services.1.key', 'subtitle')
            ->where('siteTexts.services.2.key', 'background_title')
            ->where('siteTexts.services.3.key', 'item_1_title')
        );
});

test('services media slots are exposed in settings.media', function () {
    [$user] = brandingAdmin();

    $this->actingAs($user)
        ->get('/client-admin/site-branding')
        ->assertInertia(fn ($page) => $page
            ->has('settings.media.services_item_1_image')
            ->has('settings.media.services_item_6_image')
        );
});

test('client admin can upload a services mock item image', function () {
    Storage::fake('public');
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'services_item_3_image' => UploadedFile::fake()->image('svc3.jpg', 1200, 800),
        ])
        ->assertRedirect();

    $stored = TenantSiteSetting::where('tenant_id', $tenant->id)
        ->where('key', 'services_item_3_image')
        ->value('value');
    expect($stored)->not->toBeNull();
    Storage::disk('public')->assertExists($stored);
});

test('client admin can save services header and per-item texts', function () {
    [$user, $tenant] = brandingAdmin();

    $this->actingAs($user)
        ->post('/client-admin/site-branding', [
            'texts' => [
                ['section' => 'services', 'key' => 'title', 'value_ar' => 'العنوان', 'value_en' => 'Title'],
                ['section' => 'services', 'key' => 'subtitle', 'value_ar' => 'العنوان الفرعي', 'value_en' => 'Subtitle'],
                ['section' => 'services', 'key' => 'background_title', 'value_ar' => 'خلف', 'value_en' => 'BG'],
                ['section' => 'services', 'key' => 'item_1_title', 'value_ar' => 'بند ١', 'value_en' => 'Item 1'],
                ['section' => 'services', 'key' => 'item_6_description', 'value_ar' => 'وصف ٦', 'value_en' => 'Desc 6'],
            ],
        ])
        ->assertRedirect();

    expect(SiteText::where('tenant_id', $tenant->id)
        ->where('section', 'services')->where('key', 'background_title')->value('value_ar'))->toBe('خلف');
    expect(SiteText::where('tenant_id', $tenant->id)
        ->where('section', 'services')->where('key', 'item_1_title')->value('value_en'))->toBe('Item 1');
    expect(SiteText::where('tenant_id', $tenant->id)
        ->where('section', 'services')->where('key', 'item_6_description')->value('value_ar'))->toBe('وصف ٦');
});

// ─── Auth gate ─────────────────────────────────────────────

test('guests are redirected to login', function () {
    $this->get('/client-admin/site-branding')->assertRedirect('/login');
});
