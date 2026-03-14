<?php

use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated super admin is redirected to super-admin dashboard', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->get('/dashboard')
        ->assertRedirect(route('super-admin.dashboard'));
});

test('authenticated client admin is redirected to client-admin dashboard', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)
        ->get('/dashboard')
        ->assertRedirect(route('client-admin.dashboard'));
});
