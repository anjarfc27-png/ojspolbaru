"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { expireAllSessionsAction } from "./actions";

type State = null | { ok: true; expired: number } | { ok: false; message: string };

export default function ExpireSessionsPage() {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async () => expireAllSessionsAction(),
    null,
  );

  return (
    <div className="space-y-6" style={{
      gap: '1.5rem'
    }}>
      <section className="space-y-4" style={{
        gap: '1rem'
      }}>
        <h2 className="text-xl font-semibold text-gray-900" style={{
          fontSize: '1.25rem',
          fontWeight: '600'
        }}>
          Expire User Sessions
        </h2>
        <p className="text-sm text-gray-600" style={{
          fontSize: '0.875rem'
        }}>
          Mengakhiri seluruh sesi pengguna yang sedang aktif. Pengguna akan diminta
          login ulang. Gunakan sebelum melakukan upgrade sistem.
        </p>
      </section>

      {state?.ok && (
        <FormMessage tone="success">
          Seluruh sesi pengguna berhasil diakhiri untuk {state.expired} akun.
        </FormMessage>
      )}
      {state && !state.ok && (
        <FormMessage tone="error">{state.message}</FormMessage>
      )}

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6" style={{
        padding: '1.5rem'
      }}>
        <p className="text-sm text-gray-600 mb-4" style={{
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          Tindakan ini bersifat langsung dan permanen. Tidak ada notifikasi yang
          dikirim ke pengguna.
        </p>
        <div className="flex gap-3" style={{
          gap: '0.75rem'
        }}>
          <form action={formAction} className="contents">
            <Button variant="danger" type="submit" loading={pending}>
              Expire semua sesi sekarang
            </Button>
          </form>
          <Button variant="secondary" disabled={pending} onClick={() => location.reload()}>
            Muat ulang
          </Button>
        </div>
      </div>
    </div>
  );
}

