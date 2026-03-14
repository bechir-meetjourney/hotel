<?php

use App\Models\Room;
use App\Models\SiteSection;
use App\Models\Tenant;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('public hotel site renders with madina template', function () {
    $tenant = Tenant::factory()->create([
        'slug' => 'test-hotel',
        'template' => 'madina',
        'is_active' => true,
    ]);

    $tenant->hotelSettings()->create([
        'hotel_name_ar' => 'فندق تجريبي',
        'hotel_name_en' => 'Test Hotel',
    ]);

    $this->get('/hotel/test-hotel')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('templates/Madina/index')
            ->has('tenant')
            ->has('hotelSettings')
            ->has('templateTranslations')
        );
});

test('public hotel site renders with riyadh template', function () {
    $tenant = Tenant::factory()->create([
        'slug' => 'riyadh-hotel',
        'template' => 'riyadh',
        'is_active' => true,
    ]);

    $this->get('/hotel/riyadh-hotel')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('templates/Riyadh/index')
        );
});

test('public hotel site returns 404 for non-existent slug', function () {
    $this->get('/hotel/does-not-exist')
        ->assertNotFound();
});

test('public hotel site returns 404 for inactive tenant', function () {
    Tenant::factory()->create([
        'slug' => 'inactive-hotel',
        'is_active' => false,
    ]);

    $this->get('/hotel/inactive-hotel')
        ->assertNotFound();
});

test('public hotel site includes rooms data', function () {
    $tenant = Tenant::factory()->create(['slug' => 'rooms-hotel', 'template' => 'madina']);

    Room::unguard();
    Room::create(['tenant_id' => $tenant->id, 'name_ar' => 'غرفة 1', 'name_en' => 'Room 1', 'type' => 'standard', 'price' => 200, 'capacity' => 2, 'is_active' => true]);
    Room::create(['tenant_id' => $tenant->id, 'name_ar' => 'غرفة 2', 'name_en' => 'Room 2', 'type' => 'deluxe', 'price' => 400, 'capacity' => 2, 'is_active' => true]);
    Room::create(['tenant_id' => $tenant->id, 'name_ar' => 'غرفة 3', 'name_en' => 'Room 3', 'type' => 'suite', 'price' => 600, 'capacity' => 2, 'is_active' => false]);
    Room::reguard();

    $this->get('/hotel/rooms-hotel')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('rooms', 2) // Only active rooms
        );
});

test('public hotel site includes active sections', function () {
    $tenant = Tenant::factory()->create(['slug' => 'sections-hotel', 'template' => 'madina']);

    SiteSection::unguard();
    SiteSection::create(['tenant_id' => $tenant->id, 'section_name' => 'hero', 'is_active' => true, 'sort_order' => 0]);
    SiteSection::create(['tenant_id' => $tenant->id, 'section_name' => 'rooms', 'is_active' => true, 'sort_order' => 1]);
    SiteSection::create(['tenant_id' => $tenant->id, 'section_name' => 'gallery', 'is_active' => false, 'sort_order' => 2]);
    SiteSection::reguard();

    $this->get('/hotel/sections-hotel')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('activeSections', 2) // hero + rooms, not gallery
        );
});
