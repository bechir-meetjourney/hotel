import AppLayout from '@/layouts/app-layout';
import ServiceForm, { type CategoryOption } from '@/components/services/service-form';
import { useT } from '@/hooks/use-translations';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    categories: CategoryOption[];
}

export default function CreateService({ categories }: Props) {
    const { t } = useT();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('client_admin'), href: '/client-admin' },
        { title: t('services'), href: '/client-admin/services' },
        { title: t('create'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Service" />
            <ServiceForm
                mode="create"
                categories={categories}
                submitUrl="/client-admin/services"
                cancelUrl="/client-admin/services"
            />
        </AppLayout>
    );
}
