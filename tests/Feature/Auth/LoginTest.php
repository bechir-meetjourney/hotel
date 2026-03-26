<?php

use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('login page can be rendered', function () {
    $this->get('/login')->assertOk();
});

test('client admin can login with correct credentials', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create(['email' => 'test@hotel.com']);

    $this->post('/login', ['email' => 'test@hotel.com', 'password' => 'password'])
        ->assertRedirect();

    $this->assertAuthenticated();
});

test('login fails with wrong password', function () {
    $tenant = Tenant::factory()->create();
    User::factory()->clientAdmin($tenant->id)->create(['email' => 'test@hotel.com']);

    $this->post('/login', ['email' => 'test@hotel.com', 'password' => 'wrong-password'])
        ->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('login fails with non-existent email', function () {
    $this->post('/login', ['email' => 'nobody@hotel.com', 'password' => 'password'])
        ->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('user is redirected to login when role does not match', function () {
    $user = User::factory()->superAdmin()->create(['email' => 'admin@test.com']);

    // Login succeeds but redirect to client-admin triggers role check → redirect to login
    $this->post('/login', ['email' => 'admin@test.com', 'password' => 'password']);

    // Following the redirect chain should end at login
    $this->get('/client-admin')->assertRedirect('/login');
});

test('user with inactive tenant is redirected to login with error', function () {
    $tenant = Tenant::factory()->inactive()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create(['email' => 'inactive@hotel.com']);

    $this->post('/login', ['email' => 'inactive@hotel.com', 'password' => 'password']);
    $this->get('/client-admin')->assertRedirect('/login');
});

test('user can logout', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    $this->actingAs($user)->post('/logout')->assertRedirect('/');
    $this->assertGuest();
});
