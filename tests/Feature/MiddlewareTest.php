<?php

use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

// ─── EnsureRole Middleware ─────────────────────────────────

test('role middleware redirects wrong role to login', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->get('/client-admin')
        ->assertRedirect('/login');
});

test('role middleware allows correct role', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)
        ->get('/client-admin')
        ->assertOk();
});

// ─── EnsureTenantSession Middleware ────────────────────────

test('tenant middleware redirects user without tenant to login', function () {
    $user = User::factory()->create(['role' => 'client_admin', 'tenant_id' => null]);

    $this->actingAs($user)
        ->get('/client-admin')
        ->assertRedirect('/login');
});

test('tenant middleware redirects user with inactive tenant to login', function () {
    $tenant = Tenant::factory()->inactive()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)
        ->get('/client-admin')
        ->assertRedirect('/login');
});

test('tenant middleware allows active tenant', function () {
    $tenant = Tenant::factory()->create(['is_active' => true]);
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)
        ->get('/client-admin')
        ->assertOk();
});

// ─── Guest Middleware ──────────────────────────────────────

test('authenticated user is redirected from login page', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)
        ->get('/login')
        ->assertRedirect();
});
