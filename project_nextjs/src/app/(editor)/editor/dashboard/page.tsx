"use client";

import Link from "next/link";
import { FileText, Users, BookOpen, BarChart3, Settings } from "lucide-react";

export default function EditorDashboardPage() {
  const dashboardCards = [
    {
      title: "Submissions",
      description: "View and manage manuscript submissions",
      href: "/editor/submissions",
      icon: FileText,
    },
    {
      title: "Review Process",
      description: "Manage peer review assignments and decisions",
      href: "/editor/submissions?stage=review",
      icon: Users,
    },
    {
      title: "Issues",
      description: "Create and manage journal issues",
      href: "/editor/issues",
      icon: BookOpen,
    },
    {
      title: "Statistics",
      description: "View submission and review statistics",
      href: "/editor/statistics",
      icon: BarChart3,
    },
    {
      title: "Editorial Settings",
      description: "Configure editorial workflow settings",
      href: "/editor/settings/workflow",
      icon: Settings,
    },
  ];

  return (
    <section className="space-y-10" style={{ gap: '2.5rem' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="app__pageHeading" style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#002C40'
        }}>
          Editor Dashboard
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#666666',
          marginTop: '0.5rem'
        }}>
          Kelola alur editorial dan naskah
        </p>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-3 gap-6" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="block"
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div style={{
                  marginBottom: '1rem',
                  color: '#006798'
                }}>
                  <Icon className="h-8 w-8" />
                </div>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#002C40',
                  marginBottom: '0.5rem'
                }}>
                  {card.title}
                </h2>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#666666',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

