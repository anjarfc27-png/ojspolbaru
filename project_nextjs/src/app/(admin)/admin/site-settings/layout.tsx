"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function SiteSettingsLayout({ children }: Props) {
  const pathname = usePathname();

  const tabs = [
    { href: "/admin/site-settings/site-setup", label: "Setup" },
    { href: "/admin/site-settings/site-setup/languages", label: "Languages" },
    { href: "/admin/site-settings/site-setup/bulk-emails", label: "Bulk Emails" },
    { href: "/admin/site-settings/site-setup/navigation", label: "Navigation" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar - Light Gray */}
      <div className="bg-gray-200 px-6 py-4" style={{
        backgroundColor: '#e5e5e5',
        padding: '1rem 1.5rem'
      }}>
        <h1 className="text-xl font-semibold text-gray-900" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#111827'
        }}>
          Site Settings
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6" style={{
        padding: '2rem 1.5rem'
      }}>
        <nav className="space-x-4 mb-6 border-b border-gray-200 pb-4" style={{
          gap: '1rem',
          fontSize: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          {tabs.map((t) => {
            const active = pathname === t.href || pathname?.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`${active ? "text-[#006798] font-semibold" : "text-[#006798] hover:underline"}`}
                style={{
                  color: active ? '#006798' : '#006798',
                  fontWeight: active ? '600' : '400',
                  fontSize: '1rem',
                  textDecoration: 'underline'
                }}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
        {children}
      </div>
    </div>
  );
}