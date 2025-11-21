"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";
import { clearScheduledTaskLogsAction } from "./actions";

const MOCK_LOGS = [
  { id: "log-1", name: "Reminder email", executedAt: "2025-03-10 02:00" },
  { id: "log-2", name: "Subscription renewal", executedAt: "2025-03-09 04:30" },
  { id: "log-3", name: "Usage statistics", executedAt: "2025-03-08 23:45" },
];

export default function ClearScheduledTaskLogsPage() {
  const [state, formAction, pending] = useActionState<
    | null
    | { ok: true; deleted: number }
    | { ok: false; message: string },
    FormData
  >(async () => clearScheduledTaskLogsAction(), null);

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
          Clear Scheduled Task Execution Logs
        </h2>
        <p className="text-sm text-gray-600" style={{
          fontSize: '0.875rem'
        }}>
          Hapus file log eksekusi tugas terjadwal dari server. Anda dapat
          melakukan ini untuk menghemat ruang penyimpanan.
        </p>
      </header>

      {state?.ok && (
        <FormMessage tone="success">
          Log tugas terjadwal berhasil dihapus{typeof state.deleted === "number" ? ` (${state.deleted})` : ""}.
        </FormMessage>
      )}
      {state && !state.ok && (
        <FormMessage tone="error">{state.message}</FormMessage>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600" style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.75rem'
              }}>
                Nama tugas
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600" style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.75rem'
              }}>
                Eksekusi terakhir
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {MOCK_LOGS.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4 text-sm text-gray-900" style={{
                  padding: '1rem 1.5rem',
                  fontSize: '0.875rem'
                }}>
                  {log.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600" style={{
                  padding: '1rem 1.5rem',
                  fontSize: '0.875rem'
                }}>
                  {log.executedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <form action={formAction} className="contents">
          <Button variant="danger" type="submit" loading={pending}>
            Clear Logs
          </Button>
        </form>
        <Button
          variant="secondary"
          onClick={() => {
            window.location.href = "/api/admin/download-task-log";
          }}
        >
          Download Log File
        </Button>
      </div>
    </div>
  );
}

