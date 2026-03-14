<?php

use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

// ─── Role Middleware ────────────────────────────────────────

test('role middleware blocks users without correct role', function () {
    $tenant = Tenant::factory()->create();
    $clientUser = User::factory()->clientAdmin($tenant->id)->create();
    $superUser = User::factory()->superAdmin()->create();

    // Client admin cannot access super admin routes
    $this->actingAs($clientUser)->get('/super-admin')->assertForbidden();
    $this->actingAs($clientUser)->get('/super-admin/tenants')->assertForbidden();

    // Super admin cannot access client admin routes
    $this->actingAs($superUser)->get('/client-admin')->assertForbidden();
    $this->actingAs($superUser)->get('/client-admin/rooms')->assertForbidden();
});

test('role middleware allows correct roles', function () {
    $tenant = Tenant::factory()->create();
    $clientUser = User::factory()->clientAdmin($tenant->id)->create();
    $superUser = User::factory()->superAdmin()->create();

    $this->actingAs($superUser)->get('/super-admin')->assertOk();
    $this->actingAs($clientUser)->get('/client-admin')->assertOk();
});

// ─── Tenant Session Middleware ──────────────────────────────

test('tenant middleware blocks client admin without tenant', function () {
    $user = User::factory()->create(['role' => 'client_admin', 'tenant_id' => null]);

    $this->actingAs($user)->get('/client-admin')->assertForbidden();
});

test('tenant middleware blocks client admin with inactive tenant', function () {
    $tenant = Tenant::factory()->inactive()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)->get('/client-admin')->assertForbidden();
});

test('tenant middleware allows client admin with active tenant', function () {
    $tenant = Tenant::factory()->create(['is_active' => true]);
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)->get('/client-admin')->assertOk();
});

// ─── Auth Middleware ────────────────────────────────────────

test('unauthenticated users are redirected to login', function () {
    $this->get('/super-admin')->assertRedirect('/login');
    $this->get('/super-admin/tenants')->assertRedirect('/login');
    $this->get('/client-admin')->assertRedirect('/login');
    $this->get('/client-admin/rooms')->assertRedirect('/login');
});

// ─── Public Routes ──────────────────────────────────────────

test('public routes are accessible without auth', function () {
    $this->get('/')->assertOk();
    $this->get('/login')->assertOk();
    $this->get('/register')->assertOk();
    $this->get('/templates')->assertOk();
});
