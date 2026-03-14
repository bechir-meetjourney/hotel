import AppLayout from '@/layouts/app-layout';
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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Client Admin', href: '/client-admin' },
];

export default function ClientDashboard({ stats, tenant }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-6">
                {/* Welcome */}
                <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {tenant.hotel_settings?.hotel_name_ar || tenant.name}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Template: <span className="capitalize">{tenant.template}</span>
                            </p>
                        </div>
                        <Link
                            href={`/hotel/${tenant.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted"
                        >
                            <Eye className="h-4 w-4" />
                            View Site
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard icon={BedDouble} label="Total Rooms" value={stats.total_rooms} href="/client-admin/rooms" />
                    <StatCard icon={BedDouble} label="Active Rooms" value={stats.active_rooms} href="/client-admin/rooms" />
                    <StatCard icon={Image} label="Gallery Images" value={stats.gallery_images} href="/client-admin/gallery" />
                </div>

                {/* Quick Links */}
                <div className="rounded-xl border bg-card p-6">
                    <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                        <QuickLink href="/client-admin/rooms/create" title="Add Room" desc="Add a new room to your hotel" />
                        <QuickLink href="/client-admin/gallery" title="Upload Photos" desc="Add images to your gallery" />
                        <QuickLink href="/client-admin/site-texts" title="Edit Content" desc="Update your website text" />
                        <QuickLink href="/client-admin/site-sections" title="Toggle Sections" desc="Show/hide website sections" />
                        <QuickLink href="/client-admin/contact-settings" title="Contact Info" desc="Update phone, WhatsApp, email" />
                        <QuickLink href="/client-admin/hotel-settings" title="Hotel Settings" desc="Logo, name, colors, SEO" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ icon: Icon, label, value, href }: { icon: any; label: string; value: number; href: string }) {
    return (
        <Link href={href} className="rounded-xl border bg-card p-6 transition hover:shadow-md">
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
