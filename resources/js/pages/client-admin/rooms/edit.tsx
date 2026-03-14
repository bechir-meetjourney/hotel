import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Upload } from 'lucide-react';
import { useState } from 'react';

interface Room {
    id: number;
    name_ar: string;
    name_en: string;
    type: string;
    description_ar: string | null;
    description_en: string | null;
    price: string;
    capacity: number;
    amenities: string[] | null;
    is_active: boolean;
    featured_image: string | null;
    images: { id: number; path: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Client Admin', href: '/client-admin' },
    { title: 'Rooms', href: '/client-admin/rooms' },
    { title: 'Edit', href: '#' },
];

const amenitiesList = ['wifi', 'tv', 'minibar', 'safe', 'air_conditioning', 'balcony', 'sea_view', 'room_service', 'jacuzzi', 'kitchen'];

export default function EditRoom({ room }: { room: Room }) {
    const { data, setData, post, processing, errors } = useForm<{
        _method: string;
        name_ar: string;
        name_en: string;
        type: string;
        description_ar: string;
        description_en: string;
        price: string;
        capacity: string;
        amenities: string[];
        is_active: boolean;
        featured_image: File | null;
    }>({
        _method: 'PUT',
        name_ar: room.name_ar,
        name_en: room.name_en,
        type: room.type,
        description_ar: room.description_ar || '',
        description_en: room.description_en || '',
        price: room.price,
        capacity: String(room.capacity),
        amenities: room.amenities || [],
        is_active: room.is_active,
        featured_image: null,
    });

    const [featuredPreview, setFeaturedPreview] = useState<string | null>(
        room.featured_image ? `/storage/${room.featured_image}` : null
    );

    function handleFeaturedImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            setFeaturedPreview(URL.createObjectURL(file));
        }
    }

    function toggleAmenity(amenity: string) {
        setData('amenities', data.amenities.includes(amenity)
            ? data.amenities.filter((a) => a !== amenity)
            : [...data.amenities, amenity]
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(`/client-admin/rooms/${room.id}`, { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${room.name_en}`} />
            <div className="mx-auto max-w-3xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Edit Room</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold">Room Details</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Name (Arabic)" error={errors.name_ar}>
                                <input type="text" value={data.name_ar} onChange={(e) => setData('name_ar', e.target.value)} className="input" required dir="rtl" />
                            </Field>
                            <Field label="Name (English)" error={errors.name_en}>
                                <input type="text" value={data.name_en} onChange={(e) => setData('name_en', e.target.value)} className="input" required />
                            </Field>
                            <Field label="Type" error={errors.type}>
                                <select value={data.type} onChange={(e) => setData('type', e.target.value)} className="input">
                                    <option value="standard">Standard</option>
                                    <option value="deluxe">Deluxe</option>
                                    <option value="suite">Suite</option>
                                    <option value="family">Family</option>
                                </select>
                            </Field>
                            <Field label="Price (SAR)" error={errors.price}>
                                <input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} className="input" required min="0" step="0.01" />
                            </Field>
                            <Field label="Capacity" error={errors.capacity}>
                                <input type="number" value={data.capacity} onChange={(e) => setData('capacity', e.target.value)} className="input" required min="1" />
                            </Field>
                        </div>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <Field label="Description (Arabic)" error={errors.description_ar}>
                                <textarea value={data.description_ar} onChange={(e) => setData('description_ar', e.target.value)} className="input" rows={3} dir="rtl" />
                            </Field>
                            <Field label="Description (English)" error={errors.description_en}>
                                <textarea value={data.description_en} onChange={(e) => setData('description_en', e.target.value)} className="input" rows={3} />
                            </Field>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold">Amenities</h2>
                        <div className="flex flex-wrap gap-2">
                            {amenitiesList.map((amenity) => (
                                <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)} className={`rounded-full px-4 py-2 text-sm capitalize transition ${data.amenities.includes(amenity) ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'}`}>
                                    {amenity.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold">Featured Image</h2>
                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition hover:bg-muted">
                            <Upload className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Click to upload new image</span>
                            <input type="file" accept="image/*" onChange={handleFeaturedImage} className="hidden" />
                        </label>
                        {featuredPreview && <img src={featuredPreview} alt="Preview" className="mt-2 h-32 rounded-lg object-cover" />}

                        {room.images.length > 0 && (
                            <div className="mt-4">
                                <h3 className="mb-2 text-sm font-medium">Existing Images</h3>
                                <div className="flex flex-wrap gap-2">
                                    {room.images.map((img) => (
                                        <img key={img.id} src={`/storage/${img.path}`} alt="" className="h-20 w-20 rounded-lg object-cover" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded border-gray-300" />
                        Active
                    </label>

                    <div className="flex justify-end gap-3">
                        <a href="/client-admin/rooms" className="rounded-lg border px-6 py-2.5 text-sm hover:bg-muted">Cancel</a>
                        <button type="submit" disabled={processing} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .input { width:100%; border-radius:0.5rem; border:1px solid hsl(var(--border)); background:hsl(var(--background)); padding:0.625rem 1rem; font-size:0.875rem; outline:none; }
                .input:focus { box-shadow:0 0 0 2px hsl(var(--primary)/0.2); }
                textarea.input { resize:vertical; }
            `}</style>
        </AppLayout>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
