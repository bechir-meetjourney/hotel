import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface SiteText {
    id: number;
    section: string;
    key: string;
    value_ar: string;
    value_en: string;
}

interface Props {
    texts: Record<string, SiteText[]>;
    sections: string[];
    currentSection: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Client Admin', href: '/client-admin' },
    { title: 'Site Texts', href: '/client-admin/site-texts' },
];

export default function SiteTextsIndex({ texts, sections, currentSection }: Props) {
    const [activeSection, setActiveSection] = useState(currentSection || sections[0] || 'hero');
    const sectionTexts = texts[activeSection] || [];

    const [editedTexts, setEditedTexts] = useState<Record<string, { id?: number; section: string; key: string; value_ar: string; value_en: string }>>({});
    const [newRows, setNewRows] = useState<{ key: string; value_ar: string; value_en: string }[]>([]);

    const { put, processing } = useForm({});

    function updateText(key: string, field: 'value_ar' | 'value_en', value: string) {
        const existing = sectionTexts.find((t) => t.key === key);
        setEditedTexts((prev) => ({
            ...prev,
            [key]: {
                ...(prev[key] || { id: existing?.id, section: activeSection, key, value_ar: existing?.value_ar || '', value_en: existing?.value_en || '' }),
                [field]: value,
            },
        }));
    }

    function addNewRow() {
        setNewRows([...newRows, { key: '', value_ar: '', value_en: '' }]);
    }

    function updateNewRow(index: number, field: string, value: string) {
        const rows = [...newRows];
        (rows[index] as any)[field] = value;
        setNewRows(rows);
    }

    function removeNewRow(index: number) {
        setNewRows(newRows.filter((_, i) => i !== index));
    }

    function handleSave() {
        const allTexts = [
            ...sectionTexts.map((t) => editedTexts[t.key] || { id: t.id, section: t.section, key: t.key, value_ar: t.value_ar, value_en: t.value_en }),
            ...newRows.filter((r) => r.key).map((r) => ({ section: activeSection, key: r.key, value_ar: r.value_ar, value_en: r.value_en })),
        ];

        router.put('/client-admin/site-texts', { texts: allTexts }, {
            onSuccess: () => { setEditedTexts({}); setNewRows([]); },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Texts" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Site Texts</h1>
                    <button onClick={handleSave} disabled={processing} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                        <Save className="h-4 w-4" />
                        {processing ? 'Saving...' : 'Save All'}
                    </button>
                </div>

                {/* Section Tabs */}
                <div className="flex gap-2 overflow-x-auto">
                    {sections.map((s) => (
                        <button key={s} onClick={() => { setActiveSection(s); setEditedTexts({}); setNewRows([]); router.get('/client-admin/site-texts', { section: s }, { preserveState: true }); }} className={`rounded-full px-4 py-2 text-sm capitalize whitespace-nowrap ${activeSection === s ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'}`}>
                            {s}
                        </button>
                    ))}
                </div>

                {/* Text Editor */}
                <div className="rounded-xl border bg-card">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold capitalize">{activeSection} Section</h2>
                    </div>
                    <div className="divide-y">
                        {sectionTexts.map((text) => (
                            <div key={text.id} className="grid gap-4 p-6 sm:grid-cols-[200px_1fr_1fr]">
                                <div className="flex items-start">
                                    <span className="rounded-lg bg-muted px-3 py-1.5 text-sm font-mono">{text.key}</span>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs text-muted-foreground">Arabic</label>
                                    <textarea
                                        value={editedTexts[text.key]?.value_ar ?? text.value_ar}
                                        onChange={(e) => updateText(text.key, 'value_ar', e.target.value)}
                                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                                        rows={2}
                                        dir="rtl"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs text-muted-foreground">English</label>
                                    <textarea
                                        value={editedTexts[text.key]?.value_en ?? text.value_en}
                                        onChange={(e) => updateText(text.key, 'value_en', e.target.value)}
                                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        ))}

                        {/* New Rows */}
                        {newRows.map((row, i) => (
                            <div key={`new-${i}`} className="grid gap-4 p-6 sm:grid-cols-[200px_1fr_1fr] bg-muted/20">
                                <div className="flex items-start gap-2">
                                    <input type="text" value={row.key} onChange={(e) => updateNewRow(i, 'key', e.target.value)} placeholder="key_name" className="w-full rounded-lg border bg-background px-3 py-1.5 text-sm font-mono" />
                                    <button onClick={() => removeNewRow(i)} className="p-1 text-red-500"><Trash2 className="h-4 w-4" /></button>
                                </div>
                                <div>
                                    <textarea value={row.value_ar} onChange={(e) => updateNewRow(i, 'value_ar', e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm" rows={2} dir="rtl" placeholder="Arabic text" />
                                </div>
                                <div>
                                    <textarea value={row.value_en} onChange={(e) => updateNewRow(i, 'value_en', e.target.value)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm" rows={2} placeholder="English text" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t p-4">
                        <button onClick={addNewRow} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-muted">
                            <Plus className="h-4 w-4" />
                            Add Text Entry
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
