import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Upload, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface GalleryImage {
    id: number;
    title_ar: string | null;
    title_en: string | null;
    path: string;
    category: string;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    images: {
        data: GalleryImage[];
        links: { url: string | null; label: string; active: boolean }[];
        last_page: number;
    };
    filters: { category?: string };
    categories: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Client Admin', href: '/client-admin' },
    { title: 'Gallery', href: '/client-admin/gallery' },
];

export default function GalleryIndex({ images, filters, categories }: Props) {
    const [showUpload, setShowUpload] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        title_ar: '',
        title_en: '',
        category: 'general',
        images: [] as File[],
    });

    function handleUpload(e: React.FormEvent) {
        e.preventDefault();
        post('/client-admin/gallery', {
            forceFormData: true,
            onSuccess: () => { reset(); setShowUpload(false); },
        });
    }

    function handleDelete(id: number) {
        if (confirm('Delete this image?')) {
            router.delete(`/client-admin/gallery/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold">Gallery</h1>
                    <button onClick={() => setShowUpload(!showUpload)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                        <Upload className="h-4 w-4" />
                        Upload Images
                    </button>
                </div>

                {/* Upload Form */}
                {showUpload && (
                    <form onSubmit={handleUpload} className="rounded-xl border bg-card p-6">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Title (Arabic)</label>
                                <input type="text" value={data.title_ar} onChange={(e) => setData('title_ar', e.target.value)} className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm" dir="rtl" />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Title (English)</label>
                                <input type="text" value={data.title_en} onChange={(e) => setData('title_en', e.target.value)} className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm" />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium">Category</label>
                                <select value={data.category} onChange={(e) => setData('category', e.target.value)} className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm capitalize">
                                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition hover:bg-muted">
                                <Upload className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                    {data.images.length > 0 ? `${data.images.length} files selected` : 'Click to select images'}
                                </span>
                                <input type="file" accept="image/*" multiple onChange={(e) => setData('images', Array.from(e.target.files || []))} className="hidden" />
                            </label>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <button type="button" onClick={() => setShowUpload(false)} className="rounded-lg border px-4 py-2 text-sm hover:bg-muted">Cancel</button>
                            <button type="submit" disabled={processing || data.images.length === 0} className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50">
                                {processing ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto">
                    <button onClick={() => router.get('/client-admin/gallery', {}, { preserveState: true })} className={`rounded-full px-4 py-2 text-sm ${!filters.category ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'}`}>
                        All
                    </button>
                    {categories.map((c) => (
                        <button key={c} onClick={() => router.get('/client-admin/gallery', { category: c }, { preserveState: true })} className={`rounded-full px-4 py-2 text-sm capitalize ${filters.category === c ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'}`}>
                            {c}
                        </button>
                    ))}
                </div>

                {/* Image Grid */}
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {images.data.map((img) => (
                        <div key={img.id} className="group relative overflow-hidden rounded-xl border">
                            <img src={`/storage/${img.path}`} alt={img.title_en || ''} className="aspect-square w-full object-cover" />
                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                                <div className="flex w-full items-center justify-between">
                                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs capitalize text-white">{img.category}</span>
                                    <button onClick={() => handleDelete(img.id)} className="rounded-full bg-red-500 p-1.5 text-white">
                                        <Trash2 className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {images.data.length === 0 && (
                    <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
                        No images yet. Click "Upload Images" to add photos.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
