<?php

use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('user can be created as super admin', function () {
    $user = User::factory()->superAdmin()->create();

    expect($user->role)->toBe('super_admin')
        ->and($user->tenant_id)->toBeNull()
        ->and($user->isSuperAdmin())->toBeTrue()
        ->and($user->isClientAdmin())->toBeFalse();
});

test('user can be created as client admin', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    expect($user->role)->toBe('client_admin')
        ->and($user->tenant_id)->toBe($tenant->id)
        ->and($user->isClientAdmin())->toBeTrue()
        ->and($user->isSuperAdmin())->toBeFalse();
});

test('client admin belongs to a tenant', function () {
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();

    expect($user->tenant)->toBeInstanceOf(Tenant::class)
        ->and($user->tenant->id)->toBe($tenant->id);
});

test('super admin has no tenant', function () {
    $user = User::factory()->superAdmin()->create();

    expect($user->tenant)->toBeNull();
});

test('default factory creates client_admin role', function () {
    $user = User::factory()->create();

    expect($user->role)->toBe('client_admin');
});
