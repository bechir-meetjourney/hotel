import AppLayout from '@/layouts/app-layout';
import RoomForm from '@/components/rooms/room-form';
import { useT } from '@/hooks/use-translations';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function CreateRoom() {
    const { t } = useT();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('client_admin'), href: '/client-admin' },
        { title: t('rooms'), href: '/client-admin/rooms' },
        { title: t('create'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Room" />
            <RoomForm mode="create" submitUrl="/client-admin/rooms" cancelUrl="/client-admin/rooms" />
        </AppLayout>
    );
}
