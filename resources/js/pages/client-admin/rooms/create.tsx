import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Client Admin', href: '/client-admin' },
    { title: 'Rooms', href: '/client-admin/rooms' },
    { title: 'Create', href: '#' },
];

const amenitiesList = ['wifi', 'tv', 'minibar', 'safe', 'air_conditioning', 'balcony', 'sea_view', 'room_service', 'jacuzzi', 'kitchen'];

export default function CreateRoom() {
    const { data, setData, post, processing, errors } = useForm<{
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
        images: File[];
    }>({
        name_ar: '',
        name_en: '',
        type: 'standard',
        description_ar: '',
        description_en: '',
        price: '',
        capacity: '2',
        amenities: [],
        is_active: true,
        featured_image: null,
        images: [],
    });

    const [featuredPreview, setFeaturedPreview] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    function handleFeaturedImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            setFeaturedPreview(URL.createObjectURL(file));
        }
    }

    function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        setData('images', [...data.images, ...files]);
        setImagePreviews([...imagePreviews, ...files.map((f) => URL.createObjectURL(f))]);
    }

    function removeImage(index: number) {
        setData('images', data.images.filter((_, i) => i !== index));
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    }

    function toggleAmenity(amenity: string) {
        setData('amenities', data.amenities.includes(amenity)
            ? data.amenities.filter((a) => a !== amenity)
            : [...data.amenities, amenity]
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/client-admin/rooms', { forceFormData: true });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Room" />
            <div className="mx-auto max-w-3xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Add New Room</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Basic Info */}
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

                    {/* Amenities */}
                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold">Amenities</h2>
                        <div className="flex flex-wrap gap-2">
                            {amenitiesList.map((amenity) => (
                                <button
                                    key={amenity}
                                    type="button"
                                    onClick={() => toggleAmenity(amenity)}
                                    className={`rounded-full px-4 py-2 text-sm capitalize transition ${
                                        data.amenities.includes(amenity)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'border hover:bg-muted'
                                    }`}
                                >
                                    {amenity.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 text-lg font-semibold">Images</h2>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium">Featured Image</label>
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition hover:bg-muted">
                                <Upload className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Click to upload</span>
                                <input type="file" accept="image/*" onChange={handleFeaturedImage} className="hidden" />
                            </label>
                            {featuredPreview && (
                                <div className="mt-2">
                                    <img src={featuredPreview} alt="Preview" className="h-32 rounded-lg object-cover" />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Additional Images</label>
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition hover:bg-muted">
                                <Upload className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Click to upload multiple</span>
                                <input type="file" accept="image/*" multiple onChange={handleImages} className="hidden" />
                            </label>
                            {imagePreviews.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {imagePreviews.map((src, i) => (
                                        <div key={i} className="group relative">
                                            <img src={src} alt="" className="h-20 w-20 rounded-lg object-cover" />
                                            <button type="button" onClick={() => removeImage(i)} className="absolute -end-1 -top-1 rounded-full bg-red-500 p-0.5 text-white opacity-0 transition group-hover:opacity-100">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active */}
                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded border-gray-300" />
                        Active (visible on website)
                    </label>

                    <div className="flex justify-end gap-3">
                        <a href="/client-admin/rooms" className="rounded-lg border px-6 py-2.5 text-sm hover:bg-muted">Cancel</a>
                        <button type="submit" disabled={processing} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                            {processing ? 'Creating...' : 'Create Room'}
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
