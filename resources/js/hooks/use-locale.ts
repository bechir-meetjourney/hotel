import { usePage } from '@inertiajs/react';

export function useLocale() {
    const { locale = 'ar', dir = 'rtl' } = usePage<{ locale: string; dir: string }>().props;

    const switchLocale = (newLocale: 'ar' | 'en') => {
        window.location.href = `/locale/${newLocale}`;
    };

    const toggleLocale = () => {
        switchLocale(locale === 'ar' ? 'en' : 'ar');
    };

    const isArabic = locale === 'ar';
    const isRtl = dir === 'rtl';

    return { locale, dir, isArabic, isRtl, switchLocale, toggleLocale };
}
