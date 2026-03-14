<?php

namespace App\Http\Controllers\ClientAdmin;

use App\Http\Controllers\Controller;
use App\Models\SiteSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSectionController extends Controller
{
    public function index()
    {
        $sections = SiteSection::orderBy('sort_order')->get();

        return Inertia::render('client-admin/site-sections/index', [
            'sections' => $sections,
        ]);
    }

    public function toggle(SiteSection $siteSection)
    {
        $siteSection->update(['is_active' => !$siteSection->is_active]);

        return back()->with('success', 'Section ' . ($siteSection->is_active ? 'activated' : 'deactivated'));
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:site_sections,id',
            'items.*.sort_order' => 'required|integer',
        ]);

        foreach ($request->items as $item) {
            SiteSection::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back()->with('success', 'Order updated');
    }
}
