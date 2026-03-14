<?php

namespace App\Http\Controllers\ClientAdmin;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use App\Models\Room;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $tenant = app('current_tenant');

        return Inertia::render('client-admin/dashboard', [
            'stats' => [
                'total_rooms' => Room::count(),
                'active_rooms' => Room::where('is_active', true)->count(),
                'gallery_images' => GalleryImage::count(),
            ],
            'tenant' => $tenant->load(['hotelSettings', 'contactSettings']),
        ]);
    }
}
