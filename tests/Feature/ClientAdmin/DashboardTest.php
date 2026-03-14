<?php

use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('client admin can access their dashboard', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)
        ->get('/client-admin')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('client-admin/dashboard')
            ->has('stats')
            ->has('stats.total_rooms')
            ->has('stats.active_rooms')
            ->has('stats.gallery_images')
            ->has('tenant')
        );
});

test('super admin cannot access client admin dashboard', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->get('/client-admin')
        ->assertForbidden();
});

test('guest cannot access client admin dashboard', function () {
    $this->get('/client-admin')
        ->assertRedirect('/login');
});

test('client admin without tenant is forbidden', function () {
    $user = User::factory()->create(['role' => 'client_admin', 'tenant_id' => null]);

    $this->actingAs($user)
        ->get('/client-admin')
        ->assertForbidden();
});
