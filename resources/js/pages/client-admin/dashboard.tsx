import AppLayout from '@/layouts/app-layout';
import { useT } from '@/hooks/use-translations';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BedDouble, Image, Eye } from 'lucide-react';

interface Props {
    stats: {
        total_rooms: number;
        active_rooms: number;
        gallery_images: number;
    };
    tenant: {
        id: number;
        name: string;
        slug: string;
        template: string;
        hotel_settings?: { hotel_name_ar: string; hotel_name_en: string } | null;
    };
}

export default function ClientDashboard({ stats, tenant }: Props) {
    const { t } = useT();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('client_admin'), href: '/client-admin' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                {/* Welcome */}
                <div className="vuexy-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {tenant.hotel_settings?.hotel_name_ar || tenant.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {t('template')}: <span className="capitalize">{tenant.template}</span>
                            </p>
                        </div>
                        <Link
                            href={`/hotel/${tenant.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                        >
                            <Eye className="h-4 w-4" />
                            {t('view_site')}
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard icon={BedDouble} label={t('total_rooms')} value={stats.total_rooms} href="/client-admin/rooms" />
                    <StatCard icon={BedDouble} label={t('active_rooms')} value={stats.active_rooms} href="/client-admin/rooms" />
                    <StatCard icon={Image} label={t('gallery_images')} value={stats.gallery_images} href="/client-admin/gallery" />
                </div>

                {/* Quick Links */}
                <div className="vuexy-card p-6">
                    <h2 className="mb-4 text-lg font-semibold">{t('quick_actions')}</h2>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                        <QuickLink href="/client-admin/rooms/create" title={t('add_room')} desc={t('add_room_desc')} />
                        <QuickLink href="/client-admin/gallery" title={t('upload_photos')} desc={t('upload_photos_desc')} />
                        <QuickLink href="/client-admin/site-texts" title={t('edit_content')} desc={t('edit_content_desc')} />
                        <QuickLink href="/client-admin/site-sections" title={t('toggle_sections')} desc={t('toggle_sections_desc')} />
                        <QuickLink href="/client-admin/contact-settings" title={t('contact_info')} desc={t('contact_info_desc')} />
                        <QuickLink href="/client-admin/hotel-settings" title={t('hotel_settings')} desc={t('hotel_settings_desc')} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ icon: Icon, label, value, href }: { icon: any; label: string; value: number; href: string }) {
    return (
        <Link href={href} className="vuexy-card p-6 transition hover:shadow-md">
            <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </Link>
    );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
    return (
        <Link href={href} className="rounded-lg border p-4 transition hover:bg-muted">
            <p className="font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
        </Link>
    );
}
