<?php

namespace App\Http\Controllers\ClientAdmin;

use App\Http\Controllers\Controller;
use App\Models\ContactSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactSettingController extends Controller
{
    public function edit()
    {
        $settings = ContactSetting::first() ?? new ContactSetting();

        return Inertia::render('client-admin/contact-settings/edit', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'whatsapp' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'address_ar' => 'nullable|string|max:500',
            'address_en' => 'nullable|string|max:500',
            'google_maps_url' => 'nullable|url|max:500',
            'facebook' => 'nullable|string|max:255',
            'instagram' => 'nullable|string|max:255',
            'twitter' => 'nullable|string|max:255',
            'tiktok' => 'nullable|string|max:255',
            'snapchat' => 'nullable|string|max:255',
        ]);

        ContactSetting::updateOrCreate(
            ['tenant_id' => app('current_tenant_id')],
            $validated
        );

        return back()->with('success', 'Contact settings updated');
    }
}
