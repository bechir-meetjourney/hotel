<?php

use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('super admin can access super admin dashboard', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->get('/super-admin')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('super-admin/dashboard')
            ->has('stats')
            ->has('stats.total_tenants')
            ->has('stats.active_tenants')
            ->has('stats.inactive_tenants')
            ->has('stats.total_users')
            ->has('recent_tenants')
        );
});

test('client admin cannot access super admin dashboard', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)
        ->get('/super-admin')
        ->assertForbidden();
});

test('guest cannot access super admin dashboard', function () {
    $this->get('/super-admin')
        ->assertRedirect('/login');
});

test('dashboard stats are correct', function () {
    $user = User::factory()->superAdmin()->create();

    Tenant::factory()->count(3)->create(['is_active' => true]);
    Tenant::factory()->count(2)->inactive()->create();

    $this->actingAs($user)
        ->get('/super-admin')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('stats.total_tenants', 5)
            ->where('stats.active_tenants', 3)
            ->where('stats.inactive_tenants', 2)
        );
});
