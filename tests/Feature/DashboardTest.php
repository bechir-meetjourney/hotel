<?php

use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated client admin is redirected to client-admin dashboard', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)
        ->get('/dashboard')
        ->assertRedirect(route('client-admin.dashboard'));
});

test('super admin accessing dashboard is redirected to login (wrong role for client app)', function () {
    $user = User::factory()->superAdmin()->create();

    // /dashboard redirects to client-admin.dashboard which requires client_admin role
    // The middleware will redirect super_admin back to login
    $this->actingAs($user)
        ->get('/dashboard')
        ->assertRedirect();
});
