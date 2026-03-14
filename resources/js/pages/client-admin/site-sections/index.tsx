import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { GripVertical, Eye, EyeOff } from 'lucide-react';

interface SiteSection {
    id: number;
    section_name: string;
    is_active: boolean;
    sort_order: number;
}

interface Props {
    sections: SiteSection[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Client Admin', href: '/client-admin' },
    { title: 'Sections', href: '/client-admin/site-sections' },
];

const sectionLabels: Record<string, { ar: string; en: string; desc: string }> = {
    hero: { ar: 'البانر الرئيسي', en: 'Hero Banner', desc: 'Main hero section with slider' },
    rooms: { ar: 'الغرف', en: 'Rooms', desc: 'Room types and pricing' },
    services: { ar: 'الخدمات', en: 'Services', desc: 'Hotel services' },
    gallery: { ar: 'المعرض', en: 'Gallery', desc: 'Photo gallery' },
    testimonials: { ar: 'آراء العملاء', en: 'Testimonials', desc: 'Guest reviews' },
    partners: { ar: 'الشركاء', en: 'Partners', desc: 'Partner brands' },
    contact: { ar: 'التواصل', en: 'Contact', desc: 'Contact form and info' },
};

export default function SiteSectionsIndex({ sections }: Props) {
    function handleToggle(id: number) {
        router.post(`/client-admin/site-sections/${id}/toggle`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Sections" />
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Website Sections</h1>
                    <p className="text-sm text-muted-foreground">Enable or disable sections on your hotel website</p>
                </div>

                <div className="rounded-xl border bg-card divide-y">
                    {sections.map((section) => {
                        const labels = sectionLabels[section.section_name] || { ar: section.section_name, en: section.section_name, desc: '' };
                        return (
                            <div key={section.id} className="flex items-center gap-4 p-4 hover:bg-muted/30">
                                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{labels.en}</span>
                                        <span className="text-sm text-muted-foreground">({labels.ar})</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{labels.desc}</p>
                                </div>
                                <button
                                    onClick={() => handleToggle(section.id)}
                                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                        section.is_active
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                                    }`}
                                >
                                    {section.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                    {section.is_active ? 'Visible' : 'Hidden'}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {sections.length === 0 && (
                    <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
                        No sections configured. They will be created when the tenant is set up.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
