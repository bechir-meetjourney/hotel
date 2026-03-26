<?php

use App\Models\Tenant;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('tenant site renders madina template', function () {
    $tenant = Tenant::factory()->create(['template' => 'madina', 'slug' => 'hotel-madina']);

    $this->get('/hotel/hotel-madina')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('templates/Madina/index')
            ->has('tenant')
            ->has('rooms')
            ->has('gallery')
            ->has('activeSections')
        );
});

test('tenant site renders riyadh template', function () {
    $tenant = Tenant::factory()->create(['template' => 'riyadh', 'slug' => 'hotel-riyadh']);

    $this->get('/hotel/hotel-riyadh')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('templates/Riyadh/index')
            ->has('tenant')
            ->has('rooms')
            ->has('gallery')
        );
});

test('inactive tenant returns 404', function () {
    Tenant::factory()->inactive()->create(['slug' => 'closed-hotel']);

    $this->get('/hotel/closed-hotel')->assertNotFound();
});

test('non-existent tenant returns 404', function () {
    $this->get('/hotel/does-not-exist')->assertNotFound();
});
