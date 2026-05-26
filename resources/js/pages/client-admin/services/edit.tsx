import AppLayout from '@/layouts/app-layout';
import ServiceForm, {
    type CategoryOption,
    type ExistingImage,
    type FeatureItem,
    type ServiceInitial,
} from '@/components/services/service-form';
import { useT } from '@/hooks/use-translations';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface ServiceData extends ServiceInitial {
    id: number;
    name_ar: string;
    name_en: string;
    images?: ExistingImage[];
    features?: FeatureItem[];
}

interface Props {
    service: ServiceData;
    categories: CategoryOption[];
}

export default function EditService({ service, categories }: Props) {
    const { t } = useT();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('client_admin'), href: '/client-admin' },
        { title: t('services'), href: '/client-admin/services' },
        { title: t('edit'), href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${service.name_en}`} />
            <ServiceForm
                mode="edit"
                initial={service}
                categories={categories}
                submitUrl={`/client-admin/services/${service.id}`}
                cancelUrl="/client-admin/services"
            />
        </AppLayout>
    );
}
