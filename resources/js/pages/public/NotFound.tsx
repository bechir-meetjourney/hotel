import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Home } from "lucide-react";
import notFoundImg from "@/assets/images/404.webp";

export default function NotFound() {
  const { locale } = usePage().props as { locale?: string };
  const label = locale === "ar" ? "العودة للصفحة الرئيسية" : "Back to Home";

  return (
    <main className="fixed inset-0 p-18 sm:p-24 bg-white">
  {/* Full-screen image */}
      <img
        src={notFoundImg}
        alt={locale === "ar" ? "الصفحة غير موجودة" : "Page not found"}
        className=" h-full w-full "
      />

      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-10">
        <Link
          href="/"
          aria-label={label}
          className="inline-flex items-center duration-300 shadow-lg gap-2 rounded-lg bg-public-primary px-4 sm:px-8 py-4 text-white backdrop-blur-sm
                     hover:bg-public-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        >
          <Home size={18} />
          <span className="text-sm sm:text-xl">{label}</span>
        </Link>
      </div>
    </main>
  );
}
