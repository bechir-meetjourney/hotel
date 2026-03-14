<?php

use App\Models\HotelSetting;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

function hotelAdmin(): array
{
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();
    return [$user, $tenant];
}

test('client admin can view hotel settings form', function () {
    [$user] = hotelAdmin();

    $this->actingAs($user)
        ->get('/client-admin/hotel-settings')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('client-admin/hotel-settings/edit')
            ->has('settings')
        );
});

test('client admin can save hotel settings', function () {
    [$user, $tenant] = hotelAdmin();

    $this->actingAs($user)
        ->put('/client-admin/hotel-settings', [
            'hotel_name_ar' => 'فندق الفخامة',
            'hotel_name_en' => 'Luxury Hotel',
            'description_ar' => 'وصف الفندق',
            'description_en' => 'Hotel description',
            'star_rating' => 5,
            'currency' => 'SAR',
            'timezone' => 'Asia/Riyadh',
            'check_in_time' => '15:00',
            'check_out_time' => '11:00',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('hotel_settings', [
        'tenant_id' => $tenant->id,
        'hotel_name_en' => 'Luxury Hotel',
        'star_rating' => 5,
        'check_in_time' => '15:00',
    ]);
});

test('client admin can update existing hotel settings', function () {
    [$user, $tenant] = hotelAdmin();

    HotelSetting::unguard();
    HotelSetting::create([
        'tenant_id' => $tenant->id,
        'hotel_name_ar' => 'فندق قديم',
        'hotel_name_en' => 'Old Hotel',
    ]);
    HotelSetting::reguard();

    $this->actingAs($user)
        ->put('/client-admin/hotel-settings', [
            'hotel_name_ar' => 'فندق جديد',
            'hotel_name_en' => 'New Hotel',
            'star_rating' => 4,
            'currency' => 'USD',
            'timezone' => 'Asia/Dubai',
            'check_in_time' => '14:00',
            'check_out_time' => '12:00',
        ])
        ->assertRedirect();

    $settings = HotelSetting::where('tenant_id', $tenant->id)->first();
    expect($settings->hotel_name_en)->toBe('New Hotel')
        ->and($settings->currency)->toBe('USD');
});

test('client admin can upload logo', function () {
    Storage::fake('public');
    [$user, $tenant] = hotelAdmin();

    $this->actingAs($user)
        ->put('/client-admin/hotel-settings', [
            'hotel_name_ar' => 'فندق',
            'hotel_name_en' => 'Hotel',
            'star_rating' => 5,
            'currency' => 'SAR',
            'timezone' => 'Asia/Riyadh',
            'check_in_time' => '14:00',
            'check_out_time' => '12:00',
            'logo' => UploadedFile::fake()->create('logo.png', 100, 'image/png'),
        ])
        ->assertRedirect();

    $settings = HotelSetting::where('tenant_id', $tenant->id)->first();
    expect($settings->logo)->not->toBeNull();
    Storage::disk('public')->assertExists($settings->logo);
});

test('hotel settings validates required fields', function () {
    [$user] = hotelAdmin();

    $this->actingAs($user)
        ->put('/client-admin/hotel-settings', [])
        ->assertSessionHasErrors(['hotel_name_ar', 'hotel_name_en', 'star_rating', 'currency', 'timezone', 'check_in_time', 'check_out_time']);
});

test('hotel settings validates star rating range', function () {
    [$user] = hotelAdmin();

    $this->actingAs($user)
        ->put('/client-admin/hotel-settings', [
            'hotel_name_ar' => 'فندق',
            'hotel_name_en' => 'Hotel',
            'star_rating' => 6,
            'currency' => 'SAR',
            'timezone' => 'Asia/Riyadh',
            'check_in_time' => '14:00',
            'check_out_time' => '12:00',
        ])
        ->assertSessionHasErrors('star_rating');
});
