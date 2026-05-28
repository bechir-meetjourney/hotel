<?php

namespace App\Http\Controllers\ClientAdmin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\RoomImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $rooms = Room::query()
            ->when($request->type, fn ($q, $t) => $q->where('type', $t))
            ->when($request->search, fn ($q, $s) => $q->where(function ($q) use ($s) {
                $q->where('name_ar', 'like', "%{$s}%")->orWhere('name_en', 'like', "%{$s}%");
            }))
            ->with('images')
            ->orderBy('sort_order')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('client-admin/rooms/index', [
            'rooms' => $rooms,
            'filters' => $request->only(['type', 'search']),
            'stats' => [
                'total' => Room::count(),
                'featured' => Room::where('is_featured', true)->count(),
                'avg_price' => (int) round((float) Room::avg('price')),
                'total_capacity' => (int) Room::sum('capacity'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('client-admin/rooms/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'type' => 'required|in:standard,deluxe,suite,family',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'short_description_ar' => 'nullable|string|max:500',
            'short_description_en' => 'nullable|string|max:500',
            'internal_notes' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'amenities' => 'nullable|array',
            'amenities.*' => 'string',
            'is_active' => 'nullable',
            'is_featured' => 'nullable',
            'booking_channel' => 'nullable|in:whatsapp,email',
            'whatsapp_number' => 'nullable|string|max:30',
            'whatsapp_message_ar' => 'nullable|string|max:1000',
            'whatsapp_message_en' => 'nullable|string|max:1000',
            'booking_email' => 'nullable|email|max:150',
            'featured_image' => 'nullable|file|image|max:5120',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:5120',
        ]);

        $validated['amenities'] = $request->input('amenities', []);
        $validated['is_active'] = $request->boolean('is_active');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['booking_channel'] = $validated['booking_channel'] ?? 'whatsapp';

        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('rooms', 'public');
        }

        $room = Room::create($validated);

        // Handle additional images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('rooms', 'public');
                $room->images()->create([
                    'path' => $path,
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('client-admin.rooms.index')
            ->with('success', 'Room created successfully');
    }

    public function edit(Room $room)
    {
        return Inertia::render('client-admin/rooms/edit', [
            'room' => $room->load('images'),
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'type' => 'required|in:standard,deluxe,suite,family',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'short_description_ar' => 'nullable|string|max:500',
            'short_description_en' => 'nullable|string|max:500',
            'internal_notes' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'amenities' => 'nullable|array',
            'amenities.*' => 'string',
            'is_active' => 'nullable',
            'is_featured' => 'nullable',
            'booking_channel' => 'nullable|in:whatsapp,email',
            'whatsapp_number' => 'nullable|string|max:30',
            'whatsapp_message_ar' => 'nullable|string|max:1000',
            'whatsapp_message_en' => 'nullable|string|max:1000',
            'booking_email' => 'nullable|email|max:150',
            'featured_image' => 'nullable|file|image|max:5120',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:5120',
            'delete_images' => 'nullable|array',
            'delete_images.*' => 'integer|exists:room_images,id',
        ]);

        $validated['amenities'] = $request->input('amenities', []);
        $validated['is_active'] = $request->boolean('is_active');
        $validated['is_featured'] = $request->boolean('is_featured');
        $validated['booking_channel'] = $validated['booking_channel'] ?? 'whatsapp';

        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($room->featured_image) {
                Storage::disk('public')->delete($room->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('rooms', 'public');
        }

        $room->update($validated);

        // Delete images if requested
        if (!empty($validated['delete_images'])) {
            $imagesToDelete = RoomImage::whereIn('id', $validated['delete_images'])
                ->where('room_id', $room->id)
                ->get();

            foreach ($imagesToDelete as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }
        }

        // Add new images
        if ($request->hasFile('images')) {
            $maxSort = $room->images()->max('sort_order') ?? -1;
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('rooms', 'public');
                $room->images()->create([
                    'path' => $path,
                    'sort_order' => $maxSort + $index + 1,
                ]);
            }
        }

        return redirect()->route('client-admin.rooms.index')
            ->with('success', 'Room updated successfully');
    }

    public function destroy(Room $room)
    {
        // Delete images from storage
        if ($room->featured_image) {
            Storage::disk('public')->delete($room->featured_image);
        }
        foreach ($room->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $room->delete();

        return back()->with('success', 'Room deleted successfully');
    }
}
