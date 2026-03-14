<?php

use App\Models\Tenant;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('tenant can be created with required fields', function () {
    $tenant = Tenant::create([
        'name' => 'Test Hotel',
        'slug' => 'test-hotel',
        'template' => 'madina',
        'plan' => 'basic',
        'is_active' => true,
    ]);

    expect($tenant)->toBeInstanceOf(Tenant::class)
        ->and($tenant->name)->toBe('Test Hotel')
        ->and($tenant->slug)->toBe('test-hotel')
        ->and($tenant->template)->toBe('madina')
        ->and($tenant->is_active)->toBeTrue();
});

test('tenant settings are cast to array', function () {
    $tenant = Tenant::factory()->create([
        'settings' => ['color' => 'blue', 'font' => 'arial'],
    ]);

    expect($tenant->settings)->toBeArray()
        ->and($tenant->settings['color'])->toBe('blue');
});

test('tenant subscription dates are cast to Carbon', function () {
    $tenant = Tenant::factory()->create([
        'subscription_starts_at' => '2025-01-01',
        'subscription_ends_at' => '2026-01-01',
    ]);

    expect($tenant->subscription_starts_at)->toBeInstanceOf(\Carbon\Carbon::class)
        ->and($tenant->subscription_ends_at)->toBeInstanceOf(\Carbon\Carbon::class);
});

test('isSubscriptionActive returns true for active tenant with future end date', function () {
    $tenant = Tenant::factory()->create([
        'is_active' => true,
        'subscription_ends_at' => now()->addMonth(),
    ]);

    expect($tenant->isSubscriptionActive())->toBeTrue();
});

test('isSubscriptionActive returns false for inactive tenant', function () {
    $tenant = Tenant::factory()->inactive()->create();

    expect($tenant->isSubscriptionActive())->toBeFalse();
});

test('isSubscriptionActive returns false for expired subscription', function () {
    $tenant = Tenant::factory()->expired()->create();

    expect($tenant->isSubscriptionActive())->toBeFalse();
});

test('isSubscriptionActive returns true when no end date is set', function () {
    $tenant = Tenant::factory()->create([
        'is_active' => true,
        'subscription_ends_at' => null,
    ]);

    expect($tenant->isSubscriptionActive())->toBeTrue();
});

test('tenant has many users', function () {
    $tenant = Tenant::factory()->create();
    \App\Models\User::factory()->clientAdmin($tenant->id)->count(3)->create();

    expect($tenant->users)->toHaveCount(3);
});

test('tenant has many rooms', function () {
    $tenant = Tenant::factory()->create();

    // Manually create rooms with tenant_id (bypassing global scope)
    \App\Models\Room::unguard();
    \App\Models\Room::create([
        'tenant_id' => $tenant->id,
        'name_ar' => 'غرفة 1',
        'name_en' => 'Room 1',
        'type' => 'standard',
        'price' => 100,
        'capacity' => 2,
    ]);
    \App\Models\Room::reguard();

    expect($tenant->rooms)->toHaveCount(1);
});

test('tenant has one hotel settings', function () {
    $tenant = Tenant::factory()->create();
    $tenant->hotelSettings()->create([
        'hotel_name_ar' => 'فندق',
        'hotel_name_en' => 'Hotel',
    ]);

    expect($tenant->hotelSettings)->not->toBeNull()
        ->and($tenant->hotelSettings->hotel_name_en)->toBe('Hotel');
});

test('tenant has one contact settings', function () {
    $tenant = Tenant::factory()->create();
    $tenant->contactSettings()->create([
        'whatsapp' => '+966500000000',
        'phone' => '+966500000000',
        'email' => 'test@hotel.com',
    ]);

    expect($tenant->contactSettings)->not->toBeNull()
        ->and($tenant->contactSettings->email)->toBe('test@hotel.com');
});

test('tenant slug must be unique', function () {
    Tenant::factory()->create(['slug' => 'unique-slug']);

    expect(fn () => Tenant::factory()->create(['slug' => 'unique-slug']))
        ->toThrow(\Illuminate\Database\QueryException::class);
});
