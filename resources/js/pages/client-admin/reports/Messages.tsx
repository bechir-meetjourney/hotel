import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Send, MessageSquare, AlertCircle, HelpCircle, Wrench, Clock, CheckCircle, User, Shield } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocale } from '@/hooks/use-locale';

interface Message {
    id: number;
    client_name: string;
    client_email: string | null;
    type: string;
    subject: string;
    message: string;
    status: string;
    assigned_to: string | null;
    reply: string | null;
    created_at: string;
}

interface Props {
    messages: { data: Message[] };
    stats: {
        total: number; open: number; in_progress: number; closed: number;
        by_type: Record<string, number>;
    };
    filters: Record<string, any>;
}

export default function Messages({ messages, stats, filters }: Props) {
    const { isArabic } = useLocale();
    const t = (ar: string, en: string) => isArabic ? ar : en;
    const flash = usePage().props.flash as { success?: string } | undefined;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('لوحة التحكم', 'Dashboard'), href: '/client-admin' },
        { title: t('الرسائل والدعم', 'Messages & Support'), href: '/client-admin/reports/messages' },
    ];

    const [activeType, setActiveType] = useState(filters.type || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [type, setType] = useState<string>('support');
    const [sending, setSending] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const typeConfig = [
        { key: '', label: t('الكل', 'All'), icon: MessageSquare, count: stats.total },
        { key: 'support', label: t('دعم فني', 'Support'), icon: HelpCircle, count: stats.by_type.support || 0 },
        { key: 'complaint', label: t('شكاوى', 'Complaints'), icon: AlertCircle, count: stats.by_type.complaint || 0 },
        { key: 'inquiry', label: t('استفسارات', 'Inquiries'), icon: MessageSquare, count: stats.by_type.inquiry || 0 },
        { key: 'technical', label: t('مشاكل تقنية', 'Technical'), icon: Wrench, count: stats.by_type.technical || 0 },
    ];

    const typeLabels: Record<string, string> = {
        support: t('دعم فني', 'Support'), complaint: t('شكوى', 'Complaint'),
        inquiry: t('استفسار', 'Inquiry'), technical: t('مشكلة تقنية', 'Technical'),
    };
    const statusIcons: Record<string, typeof Clock> = { open: Clock, in_progress: HelpCircle, closed: CheckCircle };
    const statusLabels: Record<string, string> = {
        open: t('مفتوح', 'Open'), in_progress: t('قيد المعالجة', 'In Progress'), closed: t('مغلق', 'Closed'),
    };
    const statusColors: Record<string, string> = {
        open: 'text-[#ff9f43]', in_progress: 'text-[#00bad1]', closed: 'text-[#28c76f]',
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.data.length]);

    // Auto-refresh every 15 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['messages', 'stats'] });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const filterByType = (key: string) => {
        setActiveType(key);
        router.get('/client-admin/reports/messages', { type: key || undefined }, { preserveState: true });
    };

    const sendMessage = () => {
        if (!subject.trim() || !message.trim()) return;
        setSending(true);
        router.post('/client-admin/reports/messages', {
            type, subject, message,
        }, {
            preserveScroll: true,
            onSuccess: () => { setSubject(''); setMessage(''); },
            onFinish: () => setSending(false),
        });
    };

    const formatTime = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleString(isArabic ? 'ar-SA' : 'en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('الرسائل والدعم', 'Messages & Support')} />
            <div className="flex flex-col gap-4 p-6">
                {/* Flash */}
                {flash?.success && (
                    <div className="vuexy-card border-l-4 border-l-[#28c76f] px-4 py-3 text-sm text-[#28c76f]">{flash.success}</div>
                )}

                {/* Stats bar */}
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                    <MiniStat label={t('إجمالي', 'Total')} value={stats.total} color="#7367f0" />
                    <MiniStat label={t('مفتوحة', 'Open')} value={stats.open} color="#ff9f43" />
                    <MiniStat label={t('قيد المعالجة', 'In Progress')} value={stats.in_progress} color="#00bad1" />
                    <MiniStat label={t('مغلقة', 'Closed')} value={stats.closed} color="#28c76f" />
                </div>

                {/* Type tabs */}
                <div className="flex flex-wrap gap-2">
                    {typeConfig.map(tab => (
                        <button key={tab.key} onClick={() => filterByType(tab.key)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                                activeType === tab.key ? 'bg-primary text-white' : 'border border-border text-foreground hover:bg-muted'
                            }`}>
                            <tab.icon className="h-3.5 w-3.5" />
                            {tab.label}
                            <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeType === tab.key ? 'bg-white/20' : 'bg-muted'}`}>{tab.count}</span>
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {/* Chat area */}
                    <div className="lg:col-span-2 vuexy-card flex flex-col" style={{ maxHeight: '70vh' }}>
                        {/* Messages list */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.data.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                                    <MessageSquare className="h-12 w-12 mb-3 opacity-30" />
                                    <p>{t('لا توجد رسائل بعد', 'No messages yet')}</p>
                                    <p className="text-xs mt-1">{t('أرسل رسالتك الأولى', 'Send your first message')}</p>
                                </div>
                            )}
                            {messages.data.map(msg => (
                                <div key={msg.id} className="space-y-2">
                                    {/* Client message */}
                                    <div className="flex gap-3 justify-end">
                                        <div className="max-w-[75%]">
                                            <div className="rounded-2xl rounded-ee-sm bg-primary/10 border border-primary/20 p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                                        msg.type === 'complaint' ? 'bg-red-100 text-red-600' :
                                                        msg.type === 'technical' ? 'bg-amber-100 text-amber-600' :
                                                        msg.type === 'inquiry' ? 'bg-blue-100 text-blue-600' :
                                                        'bg-purple-100 text-purple-600'
                                                    }`}>{typeLabels[msg.type]}</span>
                                                    <span className="text-xs font-semibold text-foreground">{msg.subject}</span>
                                                </div>
                                                <p className="text-sm text-foreground">{msg.message}</p>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 justify-end">
                                                {(() => { const Icon = statusIcons[msg.status] || Clock; return <Icon className={`h-3 w-3 ${statusColors[msg.status] || ''}`} />; })()}
                                                <span className="text-[10px] text-muted-foreground">{statusLabels[msg.status]}</span>
                                                <span className="text-[10px] text-muted-foreground">{formatTime(msg.created_at)}</span>
                                            </div>
                                        </div>
                                        <div className="shrink-0 h-8 w-8 rounded-full bg-primary/20 grid place-items-center">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                    </div>

                                    {/* Admin reply */}
                                    {msg.reply && (
                                        <div className="flex gap-3">
                                            <div className="shrink-0 h-8 w-8 rounded-full bg-[#28c76f]/20 grid place-items-center">
                                                <Shield className="h-4 w-4 text-[#28c76f]" />
                                            </div>
                                            <div className="max-w-[75%]">
                                                <div className="rounded-2xl rounded-es-sm bg-[#28c76f]/10 border border-[#28c76f]/20 p-3">
                                                    <p className="text-sm text-foreground">{msg.reply}</p>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] text-muted-foreground">{t('فريق الدعم', 'Support Team')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Send area */}
                        <div className="border-t border-border p-4 space-y-3">
                            <div className="flex gap-2">
                                <select value={type} onChange={e => setType(e.target.value)} className="vuexy-input w-auto text-xs">
                                    <option value="support">{t('دعم فني', 'Support')}</option>
                                    <option value="complaint">{t('شكوى', 'Complaint')}</option>
                                    <option value="inquiry">{t('استفسار', 'Inquiry')}</option>
                                    <option value="technical">{t('مشكلة تقنية', 'Technical')}</option>
                                </select>
                                <input value={subject} onChange={e => setSubject(e.target.value)} placeholder={t('الموضوع...', 'Subject...')} className="vuexy-input flex-1 text-sm" />
                            </div>
                            <div className="flex gap-2">
                                <textarea value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                    placeholder={t('اكتب رسالتك... (Enter للإرسال)', 'Type your message... (Enter to send)')}
                                    rows={2} className="vuexy-input flex-1 text-sm resize-none" />
                                <button onClick={sendMessage} disabled={sending || !subject.trim() || !message.trim()}
                                    className="self-end rounded-lg bg-primary px-4 py-2.5 text-white hover:opacity-90 disabled:opacity-50 transition-all">
                                    <Send className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar info */}
                    <div className="space-y-4">
                        <div className="vuexy-card p-4">
                            <h3 className="font-semibold text-foreground mb-3">{t('معلومات الدعم', 'Support Info')}</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{t('وقت الاستجابة: خلال 24 ساعة', 'Response time: Within 24 hours')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{t('الدعم متاح: أحد - خميس', 'Support: Sun - Thu')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="vuexy-card p-4">
                            <h3 className="font-semibold text-foreground mb-3">{t('أنواع الرسائل', 'Message Types')}</h3>
                            <div className="space-y-2 text-xs">
                                <TypeInfo icon={HelpCircle} label={t('دعم فني', 'Support')} desc={t('مساعدة عامة', 'General help')} color="text-purple-500" />
                                <TypeInfo icon={AlertCircle} label={t('شكوى', 'Complaint')} desc={t('تقديم شكوى', 'File a complaint')} color="text-red-500" />
                                <TypeInfo icon={MessageSquare} label={t('استفسار', 'Inquiry')} desc={t('طلب معلومات', 'Request info')} color="text-blue-500" />
                                <TypeInfo icon={Wrench} label={t('مشكلة تقنية', 'Technical')} desc={t('خلل أو عطل', 'Bug or issue')} color="text-amber-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="vuexy-card px-4 py-3 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full" style={{ background: color }} />
            <div>
                <p className="text-[11px] text-muted-foreground">{label}</p>
                <p className="text-lg font-bold" style={{ color }}>{value}</p>
            </div>
        </div>
    );
}

function TypeInfo({ icon: Icon, label, desc, color }: { icon: any; label: string; desc: string; color: string }) {
    return (
        <div className="flex items-center gap-2">
            <Icon className={`h-3.5 w-3.5 ${color}`} />
            <span className="font-medium text-foreground">{label}</span>
            <span className="text-muted-foreground">— {desc}</span>
        </div>
    );
}
