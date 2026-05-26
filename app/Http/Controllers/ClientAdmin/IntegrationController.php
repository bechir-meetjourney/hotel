<?php

namespace App\Http\Controllers\ClientAdmin;

use App\Http\Controllers\Controller;
use App\Models\IntegrationSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntegrationController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = app('current_tenant_id');

        $globalIntegrations = IntegrationSetting::whereNull('tenant_id')->get();
        $tenantIntegrations = IntegrationSetting::where('tenant_id', $tenantId)->get()->keyBy('provider');

        $analytics = $tenantIntegrations->get('google_analytics');

        return Inertia::render('client-admin/integrations/index', [
            'globalIntegrations' => $globalIntegrations,
            'tenantIntegrations' => $tenantIntegrations,
            'googleAnalytics' => [
                'measurement_id' => $analytics?->settings['measurement_id'] ?? '',
                'is_active' => (bool) ($analytics?->is_active ?? false),
            ],
        ]);
    }

    public function toggle(Request $request, string $provider)
    {
        $tenantId = app('current_tenant_id');

        $setting = IntegrationSetting::firstOrNew([
            'tenant_id' => $tenantId,
            'provider' => $provider,
        ]);

        // google_analytics is tenant-only and does not require a global parent
        // entry; the type is set the first time the row is created.
        if ($provider === 'google_analytics') {
            $setting->type = $setting->type ?: 'analytics';
            $setting->is_active = !$setting->is_active;
            $setting->save();

            return back()->with('success', $setting->is_active
                ? 'تم تفعيل التكامل / Integration enabled'
                : 'تم تعطيل التكامل / Integration disabled');
        }

        // Get the global integration to copy type
        $global = IntegrationSetting::whereNull('tenant_id')
            ->where('provider', $provider)
            ->first();

        if (!$global) {
            return back()->with('error', 'هذا التكامل غير متوفر / This integration is not available');
        }

        $setting->type = $global->type;
        $setting->is_active = !$setting->is_active;
        $setting->save();

        return back()->with('success', $setting->is_active
            ? 'تم تفعيل التكامل / Integration enabled'
            : 'تم تعطيل التكامل / Integration disabled');
    }

    public function saveGoogleAnalytics(Request $request)
    {
        $data = $request->validate([
            'measurement_id' => ['nullable', 'string', 'regex:/^G-[A-Z0-9]+$/'],
        ]);

        $tenantId = app('current_tenant_id');

        $setting = IntegrationSetting::firstOrNew([
            'tenant_id' => $tenantId,
            'provider' => 'google_analytics',
        ]);

        $setting->type = 'analytics';
        $existing = $setting->settings ?? [];
        $existing['measurement_id'] = $data['measurement_id'] ?? null;
        $setting->settings = $existing;
        if (!$setting->exists) {
            $setting->is_active = false;
        }
        $setting->save();

        return back()->with('success', 'تم حفظ معرف Google Analytics / Google Analytics ID saved');
    }
}
