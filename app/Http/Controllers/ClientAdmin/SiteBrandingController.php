<?php

namespace App\Http\Controllers\ClientAdmin;

use App\Http\Controllers\Controller;
use App\Models\ContactSetting;
use App\Models\SiteText;
use App\Models\Tenant;
use App\Models\TenantSiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/**
 * Unified live-preview site branding editor for tenants.
 *
 * Consolidates everything previously split across system-settings and site-texts
 * into a single page with an iframe preview. The form streams edits to the iframe
 * via postMessage (see resources/js/hooks/use-tenant-preview-overrides.tsx).
 */
class SiteBrandingController extends Controller
{
    /**
     * Sections + canonical keys surfaced in the editor. The keys mirror what
     * the templates read via pickSiteText / getText so a fresh tenant gets a
     * pre-filled skeleton instead of an empty page.
     */
    private const TEXT_SECTIONS = [
        'hero' => ['title', 'subtitle', 'cta'],
        'about' => ['title', 'subtitle', 'description'],
        'rooms' => ['title', 'subtitle'],
        'services' => ['title', 'subtitle'],
        'gallery' => ['title', 'subtitle'],
        'testimonials' => ['title', 'subtitle'],
        'contact' => ['title', 'subtitle'],
        'footer' => ['title', 'description'],
    ];

    public function index()
    {
        /** @var Tenant $tenant */
        $tenant = app('current_tenant');

        $existing = SiteText::get(['id', 'section', 'key', 'value_ar', 'value_en'])
            ->groupBy('section')
            ->map(fn ($items) => $items->keyBy('key'));

        // Build a section-by-section view that always exposes the canonical keys,
        // padding rows that don't exist yet so the editor renders a complete form.
        $siteTexts = collect(self::TEXT_SECTIONS)->mapWithKeys(function ($keys, $section) use ($existing) {
            $rows = collect($keys)->map(function ($key) use ($section, $existing) {
                $row = $existing[$section][$key] ?? null;
                return [
                    'id' => $row?->id,
                    'section' => $section,
                    'key' => $key,
                    'value_ar' => $row?->value_ar ?? '',
                    'value_en' => $row?->value_en ?? '',
                ];
            });
            // Surface any tenant-added keys that aren't in the canonical list.
            $extras = ($existing[$section] ?? collect())
                ->reject(fn ($_v, $k) => in_array($k, $keys, true))
                ->map(fn ($row) => [
                    'id' => $row->id, 'section' => $section, 'key' => $row->key,
                    'value_ar' => $row->value_ar ?? '', 'value_en' => $row->value_en ?? '',
                ])
                ->values();
            return [$section => $rows->concat($extras)->values()];
        });

        $contact = ContactSetting::firstOrNew(['tenant_id' => $tenant->id]);

        return Inertia::render('client-admin/site-branding/index', [
            'tenant' => [
                'id' => $tenant->id,
                'slug' => $tenant->slug,
                'name' => $tenant->name,
            ],
            'settings' => TenantSiteSetting::getAllGrouped() + [
                'media' => [
                    'hero_image' => TenantSiteSetting::get('hero_image'),
                ],
            ],
            'siteTexts' => $siteTexts,
            'contact' => [
                'whatsapp' => $contact->whatsapp,
                'phone' => $contact->phone,
                'email' => $contact->email,
                'address_ar' => $contact->address_ar,
                'address_en' => $contact->address_en,
                'google_maps_url' => $contact->google_maps_url,
                'facebook' => $contact->facebook,
                'instagram' => $contact->instagram,
                'twitter' => $contact->twitter,
                'tiktok' => $contact->tiktok,
                'snapchat' => $contact->snapchat,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            // Branding
            'site_logo' => 'nullable|file|image|max:5120',
            'site_logo_dark' => 'nullable|file|image|max:5120',
            'site_favicon' => 'nullable|file|image|max:1024',
            'hero_image' => 'nullable|file|image|max:10240',

            // Hero text
            'hero_title_ar' => 'nullable|string|max:500',
            'hero_title_en' => 'nullable|string|max:500',
            'hero_subtitle_ar' => 'nullable|string|max:500',
            'hero_subtitle_en' => 'nullable|string|max:500',

            // Colors + typography
            'primary_color' => 'nullable|string|max:20',
            'secondary_color' => 'nullable|string|max:20',
            'accent_color' => 'nullable|string|max:20',
            'font_family' => 'nullable|string|max:100',

            // Footer + social
            'footer_text_ar' => 'nullable|string|max:500',
            'footer_text_en' => 'nullable|string|max:500',
            'social_twitter' => 'nullable|string|max:255',
            'social_instagram' => 'nullable|string|max:255',
            'social_linkedin' => 'nullable|string|max:255',
            'social_facebook' => 'nullable|string|max:255',

            // Per-section page texts
            'texts' => 'nullable|array',
            'texts.*.section' => 'required_with:texts|string',
            'texts.*.key' => 'required_with:texts|string',
            'texts.*.value_ar' => 'nullable|string',
            'texts.*.value_en' => 'nullable|string',

            // Contact (separate ContactSetting model)
            'contact' => 'nullable|array',
            'contact.whatsapp' => 'nullable|string|max:20',
            'contact.phone' => 'nullable|string|max:20',
            'contact.email' => 'nullable|email|max:255',
            'contact.address_ar' => 'nullable|string|max:500',
            'contact.address_en' => 'nullable|string|max:500',
            'contact.google_maps_url' => 'nullable|url|max:500',
            'contact.facebook' => 'nullable|string|max:255',
            'contact.instagram' => 'nullable|string|max:255',
            'contact.twitter' => 'nullable|string|max:255',
            'contact.tiktok' => 'nullable|string|max:255',
            'contact.snapchat' => 'nullable|string|max:255',
        ]);

        DB::transaction(function () use ($request, $validated) {
            // Replace any previous upload on the same key before storing the new path.
            foreach (['site_logo', 'site_logo_dark', 'site_favicon', 'hero_image'] as $fileField) {
                if ($request->hasFile($fileField)) {
                    $old = TenantSiteSetting::get($fileField);
                    if ($old) Storage::disk('public')->delete($old);
                    $validated[$fileField] = $request->file($fileField)->store('tenant-site', 'public');
                } else {
                    unset($validated[$fileField]);
                }
            }

            $texts = $validated['texts'] ?? [];
            $contact = $validated['contact'] ?? null;
            unset($validated['texts'], $validated['contact']);

            foreach ($validated as $key => $value) {
                TenantSiteSetting::set($key, $value);
            }

            $tenantId = app('current_tenant_id');
            foreach ($texts as $t) {
                // Skip empty rows so the editor doesn't persist scaffold placeholders
                // the user never filled in.
                if (($t['value_ar'] ?? '') === '' && ($t['value_en'] ?? '') === '') continue;
                SiteText::updateOrCreate(
                    ['tenant_id' => $tenantId, 'section' => $t['section'], 'key' => $t['key']],
                    ['value_ar' => $t['value_ar'] ?? '', 'value_en' => $t['value_en'] ?? '']
                );
            }

            if (is_array($contact)) {
                ContactSetting::updateOrCreate(['tenant_id' => $tenantId], $contact);
            }
        });

        return back()->with('success', 'تم حفظ التغييرات');
    }
}
