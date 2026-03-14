<?php

use App\Models\ContactSetting;
use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

function contactAdmin(): array
{
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();
    return [$user, $tenant];
}

test('client admin can view contact settings form', function () {
    [$user] = contactAdmin();

    $this->actingAs($user)
        ->get('/client-admin/contact-settings')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('client-admin/contact-settings/edit')
            ->has('settings')
        );
});

test('client admin can save contact settings', function () {
    [$user, $tenant] = contactAdmin();

    $this->actingAs($user)
        ->put('/client-admin/contact-settings', [
            'whatsapp' => '+966500000001',
            'phone' => '+966500000002',
            'email' => 'contact@hotel.com',
            'address_ar' => 'الرياض',
            'address_en' => 'Riyadh, KSA',
            'google_maps_url' => 'https://maps.google.com/test',
            'facebook' => 'hotelpage',
            'instagram' => '@hotel',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('contact_settings', [
        'tenant_id' => $tenant->id,
        'whatsapp' => '+966500000001',
        'phone' => '+966500000002',
        'email' => 'contact@hotel.com',
        'address_ar' => 'الرياض',
        'instagram' => '@hotel',
    ]);
});

test('client admin can update existing contact settings', function () {
    [$user, $tenant] = contactAdmin();

    ContactSetting::unguard();
    ContactSetting::create([
        'tenant_id' => $tenant->id,
        'whatsapp' => '+966500000000',
        'email' => 'old@hotel.com',
    ]);
    ContactSetting::reguard();

    $this->actingAs($user)
        ->put('/client-admin/contact-settings', [
            'whatsapp' => '+966500000999',
            'email' => 'new@hotel.com',
        ])
        ->assertRedirect();

    $settings = ContactSetting::where('tenant_id', $tenant->id)->first();
    expect($settings->whatsapp)->toBe('+966500000999')
        ->and($settings->email)->toBe('new@hotel.com');

    // Only one record should exist (upsert)
    expect(ContactSetting::where('tenant_id', $tenant->id)->count())->toBe(1);
});

test('contact settings validates email format', function () {
    [$user] = contactAdmin();

    $this->actingAs($user)
        ->put('/client-admin/contact-settings', [
            'email' => 'not-an-email',
        ])
        ->assertSessionHasErrors('email');
});

test('contact settings validates google maps URL', function () {
    [$user] = contactAdmin();

    $this->actingAs($user)
        ->put('/client-admin/contact-settings', [
            'google_maps_url' => 'not-a-url',
        ])
        ->assertSessionHasErrors('google_maps_url');
});
