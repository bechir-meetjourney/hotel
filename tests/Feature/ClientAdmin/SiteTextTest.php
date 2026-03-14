<?php

use App\Models\SiteText;
use App\Models\Tenant;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

function textAdmin(): array
{
    $tenant = Tenant::factory()->create();
    $user = User::factory()->clientAdmin($tenant->id)->create();
    return [$user, $tenant];
}

test('client admin can view site texts', function () {
    [$user] = textAdmin();

    $this->actingAs($user)
        ->get('/client-admin/site-texts')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('client-admin/site-texts/index')
            ->has('texts')
            ->has('sections')
        );
});

test('client admin can save site texts', function () {
    [$user, $tenant] = textAdmin();

    $this->actingAs($user)
        ->put('/client-admin/site-texts', [
            'texts' => [
                ['section' => 'hero', 'key' => 'title', 'value_ar' => 'مرحباً', 'value_en' => 'Welcome'],
                ['section' => 'hero', 'key' => 'subtitle', 'value_ar' => 'فندق فاخر', 'value_en' => 'Luxury Hotel'],
            ],
        ])
        ->assertRedirect();

    expect(SiteText::where('tenant_id', $tenant->id)->count())->toBe(2);

    $this->assertDatabaseHas('site_texts', [
        'tenant_id' => $tenant->id,
        'section' => 'hero',
        'key' => 'title',
        'value_ar' => 'مرحباً',
        'value_en' => 'Welcome',
    ]);
});

test('client admin can update existing site texts (upsert)', function () {
    [$user, $tenant] = textAdmin();

    SiteText::unguard();
    SiteText::create(['tenant_id' => $tenant->id, 'section' => 'hero', 'key' => 'title', 'value_ar' => 'قديم', 'value_en' => 'Old']);
    SiteText::reguard();

    $this->actingAs($user)
        ->put('/client-admin/site-texts', [
            'texts' => [
                ['section' => 'hero', 'key' => 'title', 'value_ar' => 'جديد', 'value_en' => 'New'],
            ],
        ])
        ->assertRedirect();

    $text = SiteText::where('tenant_id', $tenant->id)->where('section', 'hero')->where('key', 'title')->first();
    expect($text->value_ar)->toBe('جديد')
        ->and($text->value_en)->toBe('New');

    // Should still be 1 record, not 2
    expect(SiteText::where('tenant_id', $tenant->id)->count())->toBe(1);
});

test('site texts are filtered by section', function () {
    [$user, $tenant] = textAdmin();

    SiteText::unguard();
    SiteText::create(['tenant_id' => $tenant->id, 'section' => 'hero', 'key' => 'title', 'value_ar' => 'عنوان', 'value_en' => 'Title']);
    SiteText::create(['tenant_id' => $tenant->id, 'section' => 'contact', 'key' => 'title', 'value_ar' => 'تواصل', 'value_en' => 'Contact']);
    SiteText::reguard();

    $this->actingAs($user)
        ->get('/client-admin/site-texts?section=hero')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('texts.hero', 1)
            ->missing('texts.contact')
        );
});

test('client admin only sees their own site texts', function () {
    [$user, $tenant] = textAdmin();
    $otherTenant = Tenant::factory()->create();

    SiteText::unguard();
    SiteText::create(['tenant_id' => $tenant->id, 'section' => 'hero', 'key' => 'title', 'value_ar' => 'لي', 'value_en' => 'Mine']);
    SiteText::create(['tenant_id' => $otherTenant->id, 'section' => 'hero', 'key' => 'title', 'value_ar' => 'لهم', 'value_en' => 'Theirs']);
    SiteText::reguard();

    $this->actingAs($user)
        ->get('/client-admin/site-texts')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('texts.hero', 1)
        );
});
