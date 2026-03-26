import { useT } from '@/hooks/use-translations';

export default function AppLogo() {
    const { t } = useT();

    return (
        <>
            <img src="/logo.png" alt={t('brand')} className="size-8 object-contain" />
            <div className="ms-1 grid flex-1 text-start text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">{t('brand')}</span>
            </div>
        </>
    );
}
