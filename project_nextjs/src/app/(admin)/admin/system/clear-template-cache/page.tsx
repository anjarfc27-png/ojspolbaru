"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { clearTemplateCacheAction } from "./actions";

export default function ClearTemplateCachePage() {
  const [state, formAction, pending] = useActionState<{ ok: true } | null, FormData>(
    async () => clearTemplateCacheAction(),
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
          Clear Template Cache
        </h2>
        <p className="text-sm text-gray-600" style={{
          fontSize: '0.875rem'
        }}>
          Hapus versi cache dari template HTML. Berguna setelah melakukan perubahan tampilan.
        </p>
      </header>

      {state && (
        <FormMessage tone="success">
          Template cache berhasil dibersihkan. Template terbaru akan dimuat saat permintaan berikutnya.
        </FormMessage>
      )}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6" style={{
        padding: '1.5rem'
      }}>
        <p className="text-sm text-gray-600 mb-4" style={{
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          Proses ini hanya memengaruhi file template. Tidak ada konten jurnal yang berubah.
        </p>
        <form action={formAction}>
          <Button className="mt-4" type="submit" loading={pending}>
            Clear Template Cache
          </Button>
        </form>
      </div>
    </div>
  );
}

