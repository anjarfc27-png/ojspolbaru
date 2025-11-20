import os from "os";
import { Button } from "@/components/ui/button";
import { publicEnv } from "@/lib/env";

export default function SystemInformationPage() {
  const nodeVersion = process.version;
  const osInfo = `${os.type()} ${os.release()}`;
  const dbInfo = "PostgreSQL (Supabase)";
  const webServer = "Next.js / Node.js";
  const supabaseUrl = publicEnv.NEXT_PUBLIC_SUPABASE_URL;
  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar - Light Gray */}
      <div className="bg-gray-200 px-6 py-4" style={{
        backgroundColor: '#e5e5e5',
        padding: '1rem 1.5rem'
      }}>
        <h1 className="text-xl font-semibold text-gray-900" style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#111827'
        }}>
          System Information
        </h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6" style={{
        padding: '2rem 1.5rem'
      }}>
        <div className="space-y-6">
          <section className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6" style={{
            padding: '1.5rem'
          }}>
            <header className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900" style={{
                  fontSize: '1.125rem',
                  fontWeight: '600'
                }}>
                  OJS Version Information
                </h2>
                <p className="text-sm text-gray-600 mt-1" style={{
                  fontSize: '0.875rem',
                  marginTop: '0.25rem'
                }}>
                  Detail versi instalasi OJS saat ini.
                </p>
              </div>
              <Button size="sm">Check for updates</Button>
            </header>
            <dl className="grid gap-4 text-sm" style={{
              gap: '1rem',
              fontSize: '0.875rem'
            }}>
              <div className="flex items-center justify-between">
                <dt className="font-semibold text-gray-900">Current version</dt>
                <dd className="text-gray-600">3.3.0.21 (Clone)</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-semibold text-gray-900">
                  Latest upgrade
                </dt>
                <dd className="text-gray-600">March 10, 2025</dd>
              </div>
            </dl>
          </section>

          <section className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6" style={{
            padding: '1.5rem'
          }}>
            <header>
              <h2 className="text-lg font-semibold text-gray-900" style={{
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                Server Information
              </h2>
            </header>
            <dl className="grid gap-3 text-sm" style={{
              gap: '0.75rem',
              fontSize: '0.875rem'
            }}>
              <Row label="Operating system" value={osInfo} />
              <Row label="Node.js version" value={nodeVersion} />
              <Row label="Database" value={dbInfo} />
              <Row label="Web server" value={webServer} />
            </dl>
          </section>

          <section className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6" style={{
            padding: '1.5rem'
          }}>
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900" style={{
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                OJS Configuration
              </h2>
              <Button size="sm" variant="secondary">
                Extended PHP information
              </Button>
            </header>
            <table className="w-full text-sm" style={{
              fontSize: '0.875rem'
            }}>
              <tbody className="divide-y divide-gray-200 bg-white">
                {[
                  ["general.locale", "id_ID"],
                  ["files.directory", "/srv/ojs/files"],
                  ["installed", "On"],
                  ["session.force_ssl", "Off"],
                  ["supabase.url", supabaseUrl],
                ].map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-4 py-2 font-semibold text-gray-900" style={{
                      padding: '0.5rem 1rem'
                    }}>
                      {key}
                    </td>
                    <td className="px-4 py-2 text-gray-600" style={{
                      padding: '0.5rem 1rem'
                    }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3" style={{
      padding: '0.75rem 1rem'
    }}>
      <span className="font-semibold text-gray-900">{label}</span>
      <span className="text-gray-600">{value}</span>
    </div>
  );
}

