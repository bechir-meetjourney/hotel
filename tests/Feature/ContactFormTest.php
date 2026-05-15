<?php

use App\Models\ContactMessage;
use App\Models\Conversation;
use App\Models\Tenant;

it('mirrors a tenantless contact submission into a conversation with null tenant_id', function () {
    $this->post('/contact', [
        'name' => 'Guest',
        'email' => 'guest@example.com',
        'message' => 'Hello',
    ])->assertRedirect();

    expect(ContactMessage::withoutGlobalScope('tenant')->count())->toBe(1);

    $conversation = Conversation::withoutGlobalScope('tenant')->with('messages')->first();
    expect($conversation)->not->toBeNull();
    expect($conversation->source)->toBe('contact');
    expect($conversation->tenant_id)->toBeNull();
    expect($conversation->messages)->toHaveCount(1);
    expect($conversation->messages->first()->body)->toBe('Hello');
});

it('mirrors tenant-scoped contact submissions into conversations with source=contact', function () {
    $tenant = Tenant::create([
        'name' => 'Hotel',
        'slug' => 'mirror-hotel',
        'template' => 'madina',
        'email' => 'mirror@example.com',
        'is_active' => true,
    ]);

    $this->post("/hotel/{$tenant->slug}/contact", [
        'name' => 'Guest',
        'email' => 'guest@example.com',
        'message' => 'Hello',
    ])->assertRedirect();

    $conversation = Conversation::withoutGlobalScope('tenant')->with('messages')->first();
    expect($conversation)->not->toBeNull();
    expect($conversation->source)->toBe('contact');
    expect($conversation->tenant_id)->toBe($tenant->id);
    expect($conversation->messages)->toHaveCount(1);
    expect($conversation->messages->first()->body)->toBe('Hello');
});
