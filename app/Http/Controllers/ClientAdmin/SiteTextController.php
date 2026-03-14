<?php

namespace App\Http\Controllers\ClientAdmin;

use App\Http\Controllers\Controller;
use App\Models\SiteText;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteTextController extends Controller
{
    public function index(Request $request)
    {
        $texts = SiteText::query()
            ->when($request->section, fn ($q, $s) => $q->where('section', $s))
            ->orderBy('section')
            ->orderBy('key')
            ->get()
            ->groupBy('section');

        return Inertia::render('client-admin/site-texts/index', [
            'texts' => $texts,
            'sections' => ['hero', 'about', 'services', 'rooms', 'gallery', 'testimonials', 'contact', 'footer'],
            'currentSection' => $request->section,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'texts' => 'required|array',
            'texts.*.id' => 'nullable|integer',
            'texts.*.section' => 'required|string',
            'texts.*.key' => 'required|string',
            'texts.*.value_ar' => 'nullable|string',
            'texts.*.value_en' => 'nullable|string',
        ]);

        foreach ($request->texts as $text) {
            SiteText::updateOrCreate(
                [
                    'tenant_id' => app('current_tenant_id'),
                    'section' => $text['section'],
                    'key' => $text['key'],
                ],
                [
                    'value_ar' => $text['value_ar'] ?? '',
                    'value_en' => $text['value_en'] ?? '',
                ]
            );
        }

        return back()->with('success', 'Texts updated successfully');
    }
}
