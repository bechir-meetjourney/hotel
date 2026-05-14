<?php

use App\Models\BankAccount;
use App\Models\InvoiceSetting;
use App\Models\TermsTemplate;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

// ─── Index ─────────────────────────────────────────────────

test('super admin can view invoice settings page', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->get('/super-admin/invoice-settings')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('super-admin/invoice-settings/index')
            ->has('settings')
            ->has('branding')
            ->has('bankAccounts')
            ->has('termsTemplates')
            ->has('counters.hotels')
            ->has('counters.packages')
        );
});

test('index returns the singleton row with default toggles all true', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->get('/super-admin/invoice-settings')
        ->assertInertia(fn ($page) => $page
            ->where('settings.id', 1)
            ->where('settings.pdf_show_logo', true)
            ->where('settings.pdf_show_company_info', true)
            ->where('settings.pdf_show_footer', true)
            ->where('settings.pdf_show_discount_column', true)
        );
});

// ─── Update main settings ──────────────────────────────────

test('super admin can update company info and toggle visibility', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->post('/super-admin/invoice-settings', [
            'company_name_ar' => 'شركة ضيافة',
            'company_name_en' => 'DIAFA Company',
            'cr' => '1234567890',
            'vat' => '300000000000003',
            'address_ar' => 'الرياض',
            'address_en' => 'Riyadh',
            'phone' => '+966500000000',
            'email' => 'info@diafa.sa',
            'website' => 'www.diafa.sa',
            'footer_line' => 'www.diafa.sa | info@diafa.sa',
            'pdf_show_logo' => true,
            'pdf_show_company_info' => true,
            'pdf_show_bank_info' => false,
            'pdf_show_vat' => true,
            'pdf_show_customer_info' => true,
            'pdf_show_cr' => false,
            'pdf_show_terms' => true,
            'pdf_show_notes' => true,
            'pdf_show_discount_column' => false,
            'pdf_show_footer' => true,
            'primary_color' => '#0E1738',
            'secondary_color' => '#B48A4A',
            'font_family' => 'Tajawal',
        ])
        ->assertRedirect();

    $settings = InvoiceSetting::current()->refresh();
    expect($settings->company_name_en)->toBe('DIAFA Company');
    expect($settings->vat)->toBe('300000000000003');
    expect($settings->pdf_show_bank_info)->toBeFalse();
    expect($settings->pdf_show_cr)->toBeFalse();
    expect($settings->pdf_show_discount_column)->toBeFalse();
    expect($settings->pdf_show_logo)->toBeTrue();
});

// ─── Bank Accounts ─────────────────────────────────────────

test('first added bank account is automatically set as default', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->post('/super-admin/invoice-settings/banks', [
            'bank_name_ar' => 'مصرف الراجحي',
            'bank_name_en' => 'Al Rajhi Bank',
            'account_holder' => 'DIAFA Company',
            'account_number' => '567890',
            'iban' => 'SA0080000000608010167519',
            'swift' => 'RJHISARI',
        ])
        ->assertRedirect();

    $bank = BankAccount::first();
    expect($bank)->not->toBeNull();
    expect($bank->bank_name_en)->toBe('Al Rajhi Bank');
    expect($bank->is_default)->toBeTrue();
});

test('subsequent bank accounts are not default', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->post('/super-admin/invoice-settings/banks', ['bank_name_en' => 'First Bank']);
    $this->actingAs($user)
        ->post('/super-admin/invoice-settings/banks', ['bank_name_en' => 'Second Bank']);

    $first = BankAccount::where('bank_name_en', 'First Bank')->first();
    $second = BankAccount::where('bank_name_en', 'Second Bank')->first();

    expect($first->is_default)->toBeTrue();
    expect($second->is_default)->toBeFalse();
});

test('setting a bank as default unsets all others atomically', function () {
    $user = User::factory()->superAdmin()->create();

    BankAccount::create(['bank_name_en' => 'A', 'is_default' => true]);
    $b = BankAccount::create(['bank_name_en' => 'B', 'is_default' => false]);
    BankAccount::create(['bank_name_en' => 'C', 'is_default' => false]);

    $this->actingAs($user)
        ->post("/super-admin/invoice-settings/banks/{$b->id}/default")
        ->assertRedirect();

    expect(BankAccount::where('is_default', true)->count())->toBe(1);
    expect(BankAccount::where('is_default', true)->first()->id)->toBe($b->id);
});

test('super admin can delete a bank account', function () {
    $user = User::factory()->superAdmin()->create();

    $bank = BankAccount::create(['bank_name_en' => 'Doomed Bank']);

    $this->actingAs($user)
        ->delete("/super-admin/invoice-settings/banks/{$bank->id}")
        ->assertRedirect();

    expect(BankAccount::find($bank->id))->toBeNull();
});

// ─── Terms Templates ───────────────────────────────────────

test('first terms template is automatically marked default', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->post('/super-admin/invoice-settings/terms', [
            'name' => 'Standard terms',
            'content_ar' => 'الشروط الافتراضية',
            'content_en' => 'Default terms',
        ])
        ->assertRedirect();

    $terms = TermsTemplate::first();
    expect($terms->is_default)->toBeTrue();
    expect($terms->content_en)->toBe('Default terms');
});

test('setting a terms template as default unsets all others atomically', function () {
    $user = User::factory()->superAdmin()->create();

    TermsTemplate::create(['name' => 'A', 'is_default' => true]);
    $b = TermsTemplate::create(['name' => 'B', 'is_default' => false]);

    $this->actingAs($user)
        ->post("/super-admin/invoice-settings/terms/{$b->id}/default")
        ->assertRedirect();

    expect(TermsTemplate::where('is_default', true)->count())->toBe(1);
    expect(TermsTemplate::where('is_default', true)->first()->id)->toBe($b->id);
});

test('storing terms requires a name', function () {
    $user = User::factory()->superAdmin()->create();

    $this->actingAs($user)
        ->post('/super-admin/invoice-settings/terms', ['content_en' => 'no name'])
        ->assertSessionHasErrors('name');
});

// ─── Auth gate ─────────────────────────────────────────────

test('guests are redirected to login', function () {
    $this->get('/super-admin/invoice-settings')->assertRedirect('/login');
});
