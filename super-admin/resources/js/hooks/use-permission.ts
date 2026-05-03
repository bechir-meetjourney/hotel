import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

/**
 * Returns helpers to check the current user's permissions.
 * Super-admins have ['*'] which always passes.
 */
export function usePermission() {
    const { auth } = usePage<SharedData>().props;
    const keys = auth?.permissions ?? [];
    const isSuperAdmin = keys.includes('*');

    function can(key: string): boolean {
        if (isSuperAdmin) return true;
        return keys.includes(key);
    }

    function canAny(...needed: string[]): boolean {
        if (isSuperAdmin) return true;
        return needed.some((k) => keys.includes(k));
    }

    return { can, canAny, isSuperAdmin, permissions: keys };
}
