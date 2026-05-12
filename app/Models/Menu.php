<?php

namespace App\Models;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'location',
        'items',
    ];

    protected function casts(): array
    {
        return [
            'items' => 'array',
        ];
    }

    /**
     * Return visible items for a location with `href` already resolved
     * (page → /page/{slug}, section → /#{anchor}, external → url).
     * Returns [] when no menu is configured so the public Navbar can fall
     * back to its hardcoded defaults.
     */
    public static function resolvedItems(string $location): array
    {
        $menu = static::where('location', $location)->first();
        $items = $menu?->items ?? [];
        if (empty($items)) {
            return [];
        }

        $pageIds = array_filter(array_map(fn ($i) => $i['page_id'] ?? null, $items));
        $slugs = $pageIds
            ? Page::whereIn('id', $pageIds)->pluck('slug', 'id')->toArray()
            : [];

        return array_values(array_filter(array_map(function ($item) use ($slugs) {
            $type = $item['type'] ?? 'external';
            $href = match ($type) {
                'page' => isset($slugs[$item['page_id'] ?? 0]) ? '/page/'.$slugs[$item['page_id']] : null,
                'section' => '/#'.ltrim($item['section_anchor'] ?? '', '#'),
                'external' => $item['url'] ?? null,
                default => null,
            };
            if (!$href) {
                return null;
            }
            return [
                'label_ar' => $item['label_ar'] ?? '',
                'label_en' => $item['label_en'] ?? '',
                'href' => $href,
                'is_visible' => $item['is_visible'] ?? true,
            ];
        }, $items), fn ($i) => $i !== null && ($i['is_visible'] ?? true)));
    }
}
