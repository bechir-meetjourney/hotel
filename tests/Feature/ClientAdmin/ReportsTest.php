<?php

use App\Models\Tenant;
use App\Models\User;
use App\Models\SupportMessage;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->tenant = Tenant::factory()->create(['payment_status' => 'approved']);
    $this->user = User::factory()->clientAdmin($this->tenant->id)->create();
});

// ─── Subscription Report ───────────────────────────────────

test('client admin can access subscription report', function () {
    $this->actingAs($this->user)
        ->get('/client-admin/reports/subscriptions')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('client-admin/reports/Subscriptions')
            ->has('subscription')
            ->has('subscription.plan')
            ->has('subscription.is_active')
            ->has('subscription.days_remaining')
        );
});

// ─── Messages Report ───────────────────────────────────────

test('client admin can access messages page', function () {
    $this->actingAs($this->user)
        ->get('/client-admin/reports/messages')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('client-admin/reports/Messages')
            ->has('messages')
            ->has('stats')
        );
});

test('client admin can send a support message', function () {
    $this->actingAs($this->user)
        ->post('/client-admin/reports/messages', [
            'type' => 'support',
            'subject' => 'Test subject',
            'message' => 'This is a test message',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('support_messages', [
        'tenant_id' => $this->tenant->id,
        'client_name' => $this->user->name,
        'type' => 'support',
        'subject' => 'Test subject',
        'status' => 'open',
    ]);
});

test('client admin can send different message types', function () {
    foreach (['support', 'complaint', 'inquiry', 'technical'] as $type) {
        $this->actingAs($this->user)
            ->post('/client-admin/reports/messages', [
                'type' => $type,
                'subject' => "Test $type",
                'message' => "Message for $type",
            ])
            ->assertRedirect();
    }

    expect(SupportMessage::where('tenant_id', $this->tenant->id)->count())->toBe(4);
});

test('message validation requires subject and message', function () {
    $this->actingAs($this->user)
        ->post('/client-admin/reports/messages', [
            'type' => 'support',
            'subject' => '',
            'message' => '',
        ])
        ->assertSessionHasErrors(['subject', 'message']);
});

test('message validation requires valid type', function () {
    $this->actingAs($this->user)
        ->post('/client-admin/reports/messages', [
            'type' => 'invalid_type',
            'subject' => 'Test',
            'message' => 'Test message',
        ])
        ->assertSessionHasErrors('type');
});

test('messages can be filtered by type', function () {
    // Create messages with tenant scope set
    app()->instance('current_tenant_id', $this->tenant->id);
    SupportMessage::create(['tenant_id' => $this->tenant->id, 'client_name' => 'A', 'type' => 'support', 'subject' => 'S1', 'message' => 'M1', 'status' => 'open']);
    SupportMessage::create(['tenant_id' => $this->tenant->id, 'client_name' => 'B', 'type' => 'complaint', 'subject' => 'S2', 'message' => 'M2', 'status' => 'open']);

    $this->actingAs($this->user)
        ->get('/client-admin/reports/messages?type=support')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('filters.type', 'support')
        );
});

// ─── Guest access denied ───────────────────────────────────

test('guest cannot access reports', function () {
    $this->get('/client-admin/reports/subscriptions')->assertRedirect('/login');
    $this->get('/client-admin/reports/messages')->assertRedirect('/login');
});
