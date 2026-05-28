import { useT } from '@/hooks/use-translations';
import { useStorageUrl } from '@/lib/storage';
import { useForm } from '@inertiajs/react';
import {
    Bed,
    BedDouble,
    Crown,
    Users,
    Wifi,
    Tv,
    Wine,
    Lock,
    Snowflake,
    Blinds,
    Waves,
    ConciergeBell,
    Bath,
    UtensilsCrossed,
    Upload,
    X,
    Star,
    Image as ImageIcon,
    ChevronRight,
    ChevronLeft,
    type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export interface ExistingImage {
    id: number;
    path: string;
}

export interface RoomInitial {
    id?: number;
    name_ar?: string;
    name_en?: string;
    type?: string;
    capacity?: number | string | null;
    price?: string | number;
    description_ar?: string | null;
    description_en?: string | null;
    short_description_ar?: string | null;
    short_description_en?: string | null;
    internal_notes?: string | null;
    amenities?: string[] | null;
    is_featured?: boolean;
    is_active?: boolean;
    booking_channel?: 'whatsapp' | 'email' | null;
    whatsapp_number?: string | null;
    booking_email?: string | null;
    whatsapp_message_ar?: string | null;
    whatsapp_message_en?: string | null;
    featured_image?: string | null;
    images?: ExistingImage[];
}

interface Props {
    mode: 'create' | 'edit';
    initial?: RoomInitial;
    submitUrl: string;
    cancelUrl: string;
}

const ROOM_TYPES = [
    { key: 'standard', icon: Bed },
    { key: 'deluxe', icon: BedDouble },
    { key: 'suite', icon: Crown },
    { key: 'family', icon: Users },
] as const;

const AMENITIES: { key: string; icon: LucideIcon }[] = [
    { key: 'wifi', icon: Wifi },
    { key: 'tv', icon: Tv },
    { key: 'air_conditioning', icon: Snowflake },
    { key: 'minibar', icon: Wine },
    { key: 'safe', icon: Lock },
    { key: 'balcony', icon: Blinds },
    { key: 'sea_view', icon: Waves },
    { key: 'room_service', icon: ConciergeBell },
    { key: 'jacuzzi', icon: Bath },
    { key: 'kitchen', icon: UtensilsCrossed },
];

type FormData = {
    _method?: string;
    name_ar: string;
    name_en: string;
    type: string;
    capacity: string;
    price: string;
    booking_channel: 'whatsapp' | 'email';
    whatsapp_number: string;
    booking_email: string;
    whatsapp_message_ar: string;
    whatsapp_message_en: string;
    is_featured: boolean;
    is_active: boolean;
    short_description_ar: string;
    short_description_en: string;
    description_ar: string;
    description_en: string;
    internal_notes: string;
    amenities: string[];
    featured_image: File | null;
    images: File[];
    delete_images: number[];
};

export default function RoomForm({ mode, initial = {}, submitUrl, cancelUrl }: Props) {
    const { t, isArabic } = useT();
    const storageUrl = useStorageUrl();
    const dir = isArabic ? 'rtl' : 'ltr';

    const { data, setData, post, processing, errors } = useForm<FormData>({
        ...(mode === 'edit' ? { _method: 'PUT' } : {}),
        name_ar: initial.name_ar ?? '',
        name_en: initial.name_en ?? '',
        type: initial.type ?? 'standard',
        capacity: initial.capacity != null ? String(initial.capacity) : '2',
        price: initial.price != null ? String(initial.price) : '',
        booking_channel: (initial.booking_channel ?? 'whatsapp') as 'whatsapp' | 'email',
        whatsapp_number: initial.whatsapp_number ?? '',
        booking_email: initial.booking_email ?? '',
        whatsapp_message_ar: initial.whatsapp_message_ar ?? '',
        whatsapp_message_en: initial.whatsapp_message_en ?? '',
        is_featured: initial.is_featured ?? false,
        is_active: initial.is_active ?? true,
        short_description_ar: initial.short_description_ar ?? '',
        short_description_en: initial.short_description_en ?? '',
        description_ar: initial.description_ar ?? '',
        description_en: initial.description_en ?? '',
        internal_notes: initial.internal_notes ?? '',
        amenities: initial.amenities ?? [],
        featured_image: null,
        images: [],
        delete_images: [],
    });

    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [featuredPreview, setFeaturedPreview] = useState<string | null>(storageUrl(initial.featured_image ?? null));
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const steps = useMemo(
        () => [
            { num: 1, label: t('step_basic_info') },
            { num: 2, label: t('step_description') },
            { num: 3, label: t('amenities') },
            { num: 4, label: t('step_images') },
        ],
        [t],
    );

    function toggleAmenity(key: string) {
        setData('amenities', data.amenities.includes(key) ? data.amenities.filter((a) => a !== key) : [...data.amenities, key]);
    }

    function handleFeaturedImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setData('featured_image', file);
            setFeaturedPreview(URL.createObjectURL(file));
        }
    }

    function handleExtraImages(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        setData('images', [...data.images, ...files]);
        setImagePreviews([...imagePreviews, ...files.map((f) => URL.createObjectURL(f))]);
    }

    function removeExtraImage(i: number) {
        setData('images', data.images.filter((_, idx) => idx !== i));
        setImagePreviews(imagePreviews.filter((_, idx) => idx !== i));
    }

    function deleteExistingImage(id: number) {
        setData('delete_images', [...data.delete_images, id]);
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(submitUrl, { forceFormData: true });
    }

    const existingImages = (initial.images ?? []).filter((img) => !data.delete_images.includes(img.id));

    return (
        <div className="mx-auto max-w-5xl p-4 sm:p-6" dir={dir}>
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{mode === 'create' ? t('create_room') : t('edit_room')}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">{t('service_wizard_intro')}</p>
                </div>
                <a
                    href={cancelUrl}
                    className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    aria-label={t('cancel')}
                >
                    <X className="h-5 w-5" />
                </a>
            </div>

            {Object.keys(errors).length > 0 && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                    <ul className="list-inside list-disc">
                        {Object.entries(errors).map(([field, msg]) => (
                            <li key={field}>{msg as string}</li>
                        ))}
                    </ul>
                </div>
            )}

            <Stepper steps={steps} current={step} onSelect={(n) => setStep(n as 1 | 2 | 3 | 4)} />

            <form onSubmit={submit} className="mt-6 space-y-6">
                {step === 1 && <StepBasic data={data} setData={setData} errors={errors} />}
                {step === 2 && <StepDescription data={data} setData={setData} errors={errors} />}
                {step === 3 && <StepAmenities data={data} onToggle={toggleAmenity} />}
                {step === 4 && (
                    <StepImages
                        existingImages={existingImages}
                        storageUrl={storageUrl}
                        onDeleteExisting={deleteExistingImage}
                        featuredPreview={featuredPreview}
                        imagePreviews={imagePreviews}
                        onFeaturedChange={handleFeaturedImage}
                        onExtraChange={handleExtraImages}
                        onRemoveExtra={removeExtraImage}
                    />
                )}

                {/* Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                    <a href={cancelUrl} className="text-sm text-muted-foreground hover:underline">
                        {t('cancel')}
                    </a>
                    <div className="flex items-center gap-2">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                                className="inline-flex items-center gap-1 rounded-md border px-4 py-2 text-sm transition hover:bg-muted"
                            >
                                {isArabic ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                                {t('previous')}
                            </button>
                        )}
                        {step < 4 && (
                            <button
                                type="button"
                                onClick={() => setStep((s) => (s + 1) as 2 | 3 | 4)}
                                className="inline-flex items-center gap-1 rounded-md border px-4 py-2 text-sm transition hover:bg-muted"
                            >
                                {t('next')}
                                {isArabic ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                        >
                            {processing ? t('saving') : mode === 'create' ? t('create_room') : t('save_changes')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Stepper({
    steps,
    current,
    onSelect,
}: {
    steps: { num: number; label: string }[];
    current: number;
    onSelect: (n: number) => void;
}) {
    return (
        <div className="vuexy-card flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4">
            {steps.map((s) => {
                const active = s.num === current;
                const done = s.num < current;
                return (
                    <button
                        key={s.num}
                        type="button"
                        onClick={() => onSelect(s.num)}
                        className={`flex flex-1 items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                            active
                                ? 'bg-primary/10 font-medium text-primary'
                                : done
                                    ? 'text-foreground hover:bg-muted'
                                    : 'text-muted-foreground hover:bg-muted'
                        }`}
                    >
                        <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                active || done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            }`}
                        >
                            {s.num}
                        </span>
                        <span className="truncate">{s.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

function StepBasic({
    data,
    setData,
    errors,
}: {
    data: FormData;
    setData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
    errors: Partial<Record<keyof FormData, string>>;
}) {
    const { t, isArabic } = useT();

    return (
        <div className="space-y-6">
            <div className="vuexy-card p-6">
                <h2 className="mb-4 text-sm font-semibold text-muted-foreground">{t('type')}</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {ROOM_TYPES.map(({ key, icon: Icon }) => {
                        const active = data.type === key;
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setData('type', key)}
                                className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-4 text-sm transition ${
                                    active ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' : 'hover:bg-muted'
                                }`}
                            >
                                <Icon className="h-6 w-6" />
                                <span>{t(key)}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="vuexy-card p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t('name_ar')} error={errors.name_ar}>
                        <input
                            type="text"
                            value={data.name_ar}
                            onChange={(e) => setData('name_ar', e.target.value)}
                            placeholder="مثال: غرفة ديلوكس"
                            className="vuexy-input"
                            required
                            dir="rtl"
                        />
                    </Field>
                    <Field label={t('name_en')} error={errors.name_en}>
                        <input
                            type="text"
                            value={data.name_en}
                            onChange={(e) => setData('name_en', e.target.value)}
                            placeholder="e.g. Deluxe Room"
                            className="vuexy-input"
                            required
                        />
                    </Field>
                    <Field label={t('capacity')} error={errors.capacity}>
                        <input
                            type="number"
                            value={data.capacity}
                            onChange={(e) => setData('capacity', e.target.value)}
                            className="vuexy-input"
                            min="1"
                            required
                        />
                    </Field>
                    <Field label={t('price_per_night')} error={errors.price}>
                        <div className="relative">
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="vuexy-input pe-12"
                                placeholder="350"
                                min="0"
                                step="0.01"
                                required
                            />
                            <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-sm text-muted-foreground">
                                {isArabic ? 'ر.س' : 'SAR'}
                            </span>
                        </div>
                    </Field>
                </div>
            </div>

            <div className="vuexy-card p-6">
                <h2 className="mb-4 text-base font-semibold">{t('booking_data')}</h2>
                <div className="mb-4 inline-flex rounded-lg border p-1">
                    {(['whatsapp', 'email'] as const).map((ch) => (
                        <button
                            key={ch}
                            type="button"
                            onClick={() => setData('booking_channel', ch)}
                            className={`rounded-md px-4 py-1.5 text-sm transition ${
                                data.booking_channel === ch ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                            }`}
                        >
                            {ch === 'whatsapp' ? t('whatsapp') : t('email_channel')}
                        </button>
                    ))}
                </div>

                {data.booking_channel === 'whatsapp' ? (
                    <Field label={t('whatsapp_number')} error={errors.whatsapp_number}>
                        <input
                            type="tel"
                            value={data.whatsapp_number}
                            onChange={(e) => setData('whatsapp_number', e.target.value)}
                            placeholder="+966 50 000 0000"
                            className="vuexy-input"
                            dir="ltr"
                        />
                    </Field>
                ) : (
                    <Field label={t('booking_email')} error={errors.booking_email}>
                        <input
                            type="email"
                            value={data.booking_email}
                            onChange={(e) => setData('booking_email', e.target.value)}
                            placeholder="bookings@hotel.com"
                            className="vuexy-input"
                            dir="ltr"
                        />
                    </Field>
                )}

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Field label={t('preset_message_ar')} error={errors.whatsapp_message_ar}>
                        <textarea
                            value={data.whatsapp_message_ar}
                            onChange={(e) => setData('whatsapp_message_ar', e.target.value)}
                            placeholder={t('whatsapp_placeholder_ar')}
                            className="vuexy-input"
                            rows={3}
                            dir="rtl"
                        />
                    </Field>
                    <Field label={t('preset_message_en')} error={errors.whatsapp_message_en}>
                        <textarea
                            value={data.whatsapp_message_en}
                            onChange={(e) => setData('whatsapp_message_en', e.target.value)}
                            placeholder={t('whatsapp_placeholder_en')}
                            className="vuexy-input"
                            rows={3}
                        />
                    </Field>
                </div>
            </div>

            <div className="vuexy-card flex items-start justify-between gap-4 p-6">
                <div className="flex items-start gap-3">
                    <Star className={`mt-0.5 h-5 w-5 ${data.is_featured ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                    <div>
                        <p className="text-sm font-medium">{t('mark_as_featured')}</p>
                        <p className="text-xs text-muted-foreground">{t('featured_hint')}</p>
                    </div>
                </div>
                <Toggle checked={data.is_featured} onChange={(v) => setData('is_featured', v)} />
            </div>

            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
                    className="rounded border-gray-300"
                />
                {t('active_visible')}
            </label>
        </div>
    );
}

function StepDescription({
    data,
    setData,
    errors,
}: {
    data: FormData;
    setData: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
    errors: Partial<Record<keyof FormData, string>>;
}) {
    const { t } = useT();
    return (
        <div className="vuexy-card space-y-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t('short_desc_ar')} error={errors.short_description_ar}>
                    <textarea
                        value={data.short_description_ar}
                        onChange={(e) => setData('short_description_ar', e.target.value)}
                        className="vuexy-input"
                        rows={2}
                        dir="rtl"
                        maxLength={500}
                    />
                </Field>
                <Field label={t('short_desc_en')} error={errors.short_description_en}>
                    <textarea
                        value={data.short_description_en}
                        onChange={(e) => setData('short_description_en', e.target.value)}
                        className="vuexy-input"
                        rows={2}
                        maxLength={500}
                    />
                </Field>
            </div>

            <Field label={t('long_desc_ar')} error={errors.description_ar}>
                <textarea
                    value={data.description_ar}
                    onChange={(e) => setData('description_ar', e.target.value)}
                    placeholder={t('long_desc_hint_ar')}
                    className="vuexy-input"
                    rows={5}
                    dir="rtl"
                />
            </Field>

            <Field label={t('long_desc_en')} error={errors.description_en}>
                <textarea
                    value={data.description_en}
                    onChange={(e) => setData('description_en', e.target.value)}
                    placeholder={t('long_desc_hint_en')}
                    className="vuexy-input"
                    rows={5}
                />
            </Field>

            <Field label={t('internal_notes')} error={errors.internal_notes}>
                <textarea
                    value={data.internal_notes}
                    onChange={(e) => setData('internal_notes', e.target.value)}
                    placeholder={t('internal_notes_hint')}
                    className="vuexy-input"
                    rows={2}
                />
            </Field>
        </div>
    );
}

function StepAmenities({ data, onToggle }: { data: FormData; onToggle: (key: string) => void }) {
    const { t } = useT();
    return (
        <div className="vuexy-card p-6">
            <h2 className="mb-4 text-sm font-semibold text-muted-foreground">{t('amenities')}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {AMENITIES.map(({ key, icon: Icon }) => {
                    const active = data.amenities.includes(key);
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => onToggle(key)}
                            className={`flex items-center gap-2 rounded-lg border p-3 text-sm transition ${
                                active ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20' : 'hover:bg-muted'
                            }`}
                        >
                            <Icon className="h-5 w-5 shrink-0" />
                            <span>{t(key)}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function StepImages({
    existingImages,
    storageUrl,
    onDeleteExisting,
    featuredPreview,
    imagePreviews,
    onFeaturedChange,
    onExtraChange,
    onRemoveExtra,
}: {
    existingImages: ExistingImage[];
    storageUrl: (path: string | null | undefined) => string | null;
    onDeleteExisting: (id: number) => void;
    featuredPreview: string | null;
    imagePreviews: string[];
    onFeaturedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onExtraChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveExtra: (i: number) => void;
}) {
    const { t } = useT();
    return (
        <div className="space-y-6">
            <div className="vuexy-card p-6">
                <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="text-base font-semibold">{t('main_image')}</h2>
                    <span className="text-xs text-muted-foreground">{t('recommended_resolution')}: 1200×800 px</span>
                </div>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition hover:bg-muted">
                    {featuredPreview ? (
                        <img src={featuredPreview} alt="" className="max-h-48 rounded-md object-cover" />
                    ) : (
                        <>
                            <Upload className="h-6 w-6 text-muted-foreground" />
                            <span className="text-sm text-foreground">{t('click_to_upload_main')}</span>
                            <span className="text-xs text-muted-foreground">{t('recommended_formats')}</span>
                        </>
                    )}
                    <input type="file" accept="image/*" onChange={onFeaturedChange} className="hidden" />
                </label>
            </div>

            <div className="vuexy-card p-6">
                <h2 className="mb-3 text-base font-semibold">{t('additional_images')}</h2>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {existingImages.map((img) => (
                        <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border">
                            <img src={storageUrl(img.path) ?? ''} alt="" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={() => onDeleteExisting(img.id)}
                                className="absolute end-1 top-1 rounded-full bg-red-500/90 p-1 text-white opacity-0 transition group-hover:opacity-100"
                                aria-label="Delete"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    {imagePreviews.map((src, i) => (
                        <div key={`new-${i}`} className="group relative aspect-square overflow-hidden rounded-lg border">
                            <img src={src} alt="" className="h-full w-full object-cover" />
                            <button
                                type="button"
                                onClick={() => onRemoveExtra(i)}
                                className="absolute end-1 top-1 rounded-full bg-red-500/90 p-1 text-white opacity-0 transition group-hover:opacity-100"
                                aria-label="Remove"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-muted-foreground transition hover:bg-muted">
                        <ImageIcon className="h-5 w-5" />
                        <span className="text-xs">{t('add')}</span>
                        <input type="file" accept="image/*" multiple onChange={onExtraChange} className="hidden" />
                    </label>
                </div>
            </div>
        </div>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium">{label}</label>
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${checked ? 'bg-primary' : 'bg-muted'}`}
            role="switch"
            aria-checked={checked}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    checked ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0.5 rtl:-translate-x-0.5'
                }`}
            />
        </button>
    );
}
