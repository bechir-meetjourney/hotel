import { usePage } from '@inertiajs/react';

const translations: Record<string, Record<string, string>> = {
    // === SIDEBAR & NAV ===
    'dashboard': { ar: 'لوحة التحكم', en: 'Dashboard' },
    'tenants': { ar: 'المستأجرون', en: 'Tenants' },
    'menu': { ar: 'القائمة', en: 'Menu' },
    'settings': { ar: 'الإعدادات', en: 'Settings' },
    'logout': { ar: 'تسجيل الخروج', en: 'Log out' },
    'brand': { ar: 'ضيافة', en: 'Diyafah' },
    'super_admin': { ar: 'المشرف', en: 'Super Admin' },

    // === COMMON ===
    'save': { ar: 'حفظ', en: 'Save' },
    'saved': { ar: 'تم الحفظ', en: 'Saved' },
    'cancel': { ar: 'إلغاء', en: 'Cancel' },
    'create': { ar: 'إنشاء', en: 'Create' },
    'edit': { ar: 'تعديل', en: 'Edit' },
    'delete': { ar: 'حذف', en: 'Delete' },
    'saving': { ar: 'جاري الحفظ...', en: 'Saving...' },
    'creating': { ar: 'جاري الإنشاء...', en: 'Creating...' },
    'active': { ar: 'نشط', en: 'Active' },
    'inactive': { ar: 'غير نشط', en: 'Inactive' },
    'search': { ar: 'بحث', en: 'Search' },
    'all': { ar: 'الكل', en: 'All' },
    'name': { ar: 'الاسم', en: 'Name' },
    'email': { ar: 'البريد الإلكتروني', en: 'Email' },
    'phone': { ar: 'الهاتف', en: 'Phone' },
    'actions': { ar: 'الإجراءات', en: 'Actions' },
    'status': { ar: 'الحالة', en: 'Status' },
    'template': { ar: 'القالب', en: 'Template' },

    // === SUPER ADMIN ===
    'super_admin_dashboard': { ar: 'لوحة تحكم المشرف', en: 'Super Admin Dashboard' },
    'total_tenants': { ar: 'إجمالي المستأجرين', en: 'Total Tenants' },
    'client_users': { ar: 'المستخدمون', en: 'Client Users' },
    'recent_tenants': { ar: 'أحدث المستأجرين', en: 'Recent Tenants' },
    'view_all': { ar: 'عرض الكل', en: 'View All' },
    'plan': { ar: 'الخطة', en: 'Plan' },
    'no_tenants_yet': { ar: 'لا يوجد مستأجرون بعد', en: 'No tenants yet' },
    'manage_tenants': { ar: 'إدارة المستأجرين', en: 'Manage Tenants' },
    'add_tenant': { ar: 'إضافة مستأجر', en: 'Add Tenant' },
    'search_tenants': { ar: 'البحث في المستأجرين...', en: 'Search tenants...' },
    'all_status': { ar: 'جميع الحالات', en: 'All Status' },
    'domain': { ar: 'النطاق', en: 'Domain' },
    'users': { ar: 'المستخدمون', en: 'Users' },
    'subscription': { ar: 'الاشتراك', en: 'Subscription' },
    'no_tenants_found': { ar: 'لم يتم العثور على مستأجرين', en: 'No tenants found' },
    'confirm_toggle': { ar: 'هل أنت متأكد من تغيير حالة هذا المستأجر؟', en: "Are you sure you want to toggle this tenant's status?" },
    'create_tenant': { ar: 'إنشاء مستأجر جديد', en: 'Create New Tenant' },
    'tenant_info': { ar: 'معلومات المستأجر', en: 'Tenant Information' },
    'slug': { ar: 'الرابط المختصر', en: 'Slug' },
    'domain_optional': { ar: 'النطاق (اختياري)', en: 'Domain (optional)' },
    'subdomain_optional': { ar: 'النطاق الفرعي (اختياري)', en: 'Subdomain (optional)' },
    'template_plan': { ar: 'القالب والخطة', en: 'Template & Plan' },
    'basic': { ar: 'أساسية', en: 'Basic' },
    'professional': { ar: 'احترافية', en: 'Professional' },
    'enterprise': { ar: 'مؤسسية', en: 'Enterprise' },
    'sub_start': { ar: 'بداية الاشتراك', en: 'Subscription Start' },
    'sub_end': { ar: 'نهاية الاشتراك', en: 'Subscription End' },
    'admin_user': { ar: 'مستخدم المسؤول', en: 'Admin User' },
    'admin_name': { ar: 'اسم المسؤول', en: 'Admin Name' },
    'admin_email': { ar: 'بريد المسؤول', en: 'Admin Email' },
    'admin_password': { ar: 'كلمة مرور المسؤول', en: 'Admin Password' },

    // === SETTINGS ===
    'profile': { ar: 'الملف الشخصي', en: 'Profile' },
    'password': { ar: 'كلمة المرور', en: 'Password' },
    'appearance': { ar: 'المظهر', en: 'Appearance' },
    'settings_desc': { ar: 'إدارة ملفك الشخصي وإعدادات الحساب', en: 'Manage your profile and account settings' },
    'profile_info': { ar: 'معلومات الملف الشخصي', en: 'Profile information' },
    'profile_desc': { ar: 'تحديث الاسم والبريد الإلكتروني', en: 'Update your name and email address' },
    'full_name': { ar: 'الاسم الكامل', en: 'Full name' },
    'email_unverified': { ar: 'بريدك الإلكتروني غير مُثبت.', en: 'Your email address is unverified.' },
    'resend_verification': { ar: 'اضغط هنا لإعادة إرسال رابط التحقق.', en: 'Click here to resend the verification email.' },
    'verification_sent': { ar: 'تم إرسال رابط تحقق جديد لبريدك الإلكتروني.', en: 'A new verification link has been sent to your email address.' },
    'update_password': { ar: 'تحديث كلمة المرور', en: 'Update password' },
    'password_desc': { ar: 'تأكد من استخدام كلمة مرور طويلة وعشوائية للحفاظ على أمان حسابك', en: 'Ensure your account is using a long, random password to stay secure' },
    'current_password': { ar: 'كلمة المرور الحالية', en: 'Current password' },
    'new_password': { ar: 'كلمة المرور الجديدة', en: 'New password' },
    'confirm_password': { ar: 'تأكيد كلمة المرور', en: 'Confirm password' },
    'save_password': { ar: 'حفظ كلمة المرور', en: 'Save password' },
    'appearance_desc': { ar: 'تحديث إعدادات مظهر حسابك', en: "Update your account's appearance settings" },
};

export function useT() {
    const { locale = 'ar' } = usePage<{ locale: string }>().props;

    const t = (key: string, fallback?: string): string => {
        const entry = translations[key];
        if (!entry) return fallback || key;
        return entry[locale] || entry['ar'] || fallback || key;
    };

    return { t, locale, isArabic: locale === 'ar' };
}
