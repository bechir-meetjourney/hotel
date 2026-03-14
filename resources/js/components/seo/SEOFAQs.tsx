import React from 'react';
import { useLang } from '@/hooks/useLang';
import SchemaScript from './SchemaScript';

// FAQ for SEO
const SEOFAQs: React.FC = () => {
  const { __ } = useLang();

  // FAQ list
  const faqItems = [
    {
      question: __("messages.faq.q1") || "ما هو نظام ضيافة لإدارة الفنادق؟",
      answer: __("messages.faq.a1") || "نظام ضيافة هو برنامج متكامل لإدارة الفنادق والشقق المفروشة وأماكن الإقامة السياحية. يوفر أدوات سهلة الاستخدام لإدارة الحجوزات وخدمة العملاء وتحسين تجربة الضيوف."
    },
    {
      question: __("messages.faq.q2") || "ما هي مميزات نظام ضيافة؟",
      answer: __("messages.faq.a2") || "يتميز نظام ضيافة بواجهة سهلة الاستخدام، وتكامل مع أنظمة الدفع، وإدارة الحجوزات عبر الإنترنت، وتقارير مفصلة، وإدارة المخزون، والعديد من الميزات الأخرى."
    },
    {
      question: __("messages.faq.q3") || "هل يمكن استخدام نظام ضيافة للشقق المفروشة؟",
      answer: __("messages.faq.a3") || "نعم، نظام ضيافة مصمم خصيصًا ليناسب الفنادق والشقق المفروشة وأماكن الإقامة المختلفة بمختلف أحجامها."
    },
    {
      question: __("messages.faq.q4") || "هل يتوفر نظام ضيافة على الأجهزة المحمولة؟",
      answer: __("messages.faq.a4") || "نعم، يمكن استخدام نظام ضيافة على مختلف الأجهزة بما في ذلك الهواتف الذكية والأجهزة اللوحية، مما يتيح لك إدارة منشأتك من أي مكان."
    },
    {
      question: __("messages.faq.q5") || "كيف يمكنني البدء باستخدام نظام ضيافة؟",
      answer: __("messages.faq.a5") || "يمكنك البدء بالتسجيل في الموقع واختيار الخطة المناسبة، ثم اختيار قالب الموقع وإدخال بيانات منشأتك، وسيتم إعداد النظام لك بسرعة."
    }
  ];

  // Hide visually but keep for SEO
  return (
    <div className="sr-only">
      <h2>الأسئلة الشائعة حول نظام ضيافة</h2>
      <div>
        {faqItems.map((item, index) => (
          <div key={index}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
      
      {/* Add FAQPage schema for SEO */}
      <SchemaScript 
        schema={{
          type: 'FAQPage',
          faqItems
        }}
      />
    </div>
  );
};

export default SEOFAQs;
