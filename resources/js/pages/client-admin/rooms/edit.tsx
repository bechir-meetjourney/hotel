import AppLayout from '@/layouts/app-layout';
import RoomForm, { type RoomInitial, type ExistingImage } from '@/components/rooms/room-form';
import { useT } from '@/hooks/use-translations';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface RoomData extends RoomInitial {
    id: number;
    name_ar: string;
    name_en: string;
    images?: ExistingImage[];
}

export default function EditRoom({ room }: { room: RoomData }) {
    const { t } = useT();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('client_admin'), href: '/client-admin' },
        { title: t('rooms'), href: '/client-admin/rooms' },
        { title: t('edit'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${room.name_en}`} />
            <RoomForm
                mode="edit"
                initial={room}
                submitUrl={`/client-admin/rooms/${room.id}`}
                cancelUrl="/client-admin/rooms"
            />
        </AppLayout>
    );
}
