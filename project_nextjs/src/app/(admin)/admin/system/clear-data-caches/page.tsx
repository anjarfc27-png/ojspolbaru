"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { clearDataCachesAction } from "./actions";

const CACHE_ITEMS = [
  { id: "locale", label: "Locale data cache", description: "Istilah dan terjemahan." },
  { id: "help", label: "Help cache", description: "Konten bantuan pengguna." },
  { id: "search", label: "Search cache", description: "Index pencarian artikel." },
];

export default function ClearDataCachesPage() {
  const [state, formAction, pending] = useActionState<{ ok: true } | null, FormData>(
    async () => clearDataCachesAction(),
    null,
  );

  return (
    <div className="space-y-6" style={{
      gap: '1.5rem'
    }}>
      <header className="space-y-2" style={{
        gap: '0.5rem'
      }}>
        <h2 className="text-xl font-semibold text-gray-900" style={{
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          Clear Data Caches
        </h2>
        <p className="text-sm text-gray-600" style={{
          fontSize: '0.875rem'
        }}>
          Paksa pemuatan ulang data setelah melakukan perubahan konfigurasi atau penyesuaian.
        </p>
      </header>

      {state && (
        <FormMessage tone="success">
          Cache data berhasil dibersihkan. Versi terbaru akan dibuat ulang secara otomatis.
        </FormMessage>
      )}

      <div className="space-y-4" style={{
        gap: '1rem'
      }}>
        {CACHE_ITEMS.map((item) => (
          <div
            key={item.id}
            className="rounded-md border border-gray-200 bg-gray-50 p-5"
            style={{
              padding: '1.25rem'
            }}
          >
            <h3 className="text-base font-semibold text-gray-900 mb-2" style={{
              fontSize: '1rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              {item.label}
            </h3>
            <p className="text-sm text-gray-600" style={{
              fontSize: '0.875rem'
            }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <form action={formAction}>
        <Button type="submit" loading={pending}>Clear Data Caches</Button>
      </form>
    </div>
  );
}

