import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getSiteSettings, updateSiteSettingsAction, getEnabledJournals } from "../../actions";
import { FormMessage } from "@/components/ui/form-message";

export default async function SiteSetupSettingsPage() {
  const settings = await getSiteSettings();
  const journals = await getEnabledJournals();

  return (
    <div className="space-y-6" style={{ padding: "1.5rem 0" }}>
      <header
        className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4"
        style={{
          padding: "1rem 1.5rem",
          backgroundColor: "#f9fafb",
        }}
      >
        <h2
          className="text-base font-semibold text-gray-900"
          style={{
            fontSize: "1rem",
            fontWeight: "600",
          }}
        >
          Settings
        </h2>
      </header>
      <form action={updateSiteSettingsAction} className="space-y-6" style={{ gap: "1.5rem" }}>
        {/* Site Title - OJS 3.3 PKPSiteConfigForm only has title, redirect, and minPasswordLength */}
        <div className="space-y-2">
          <Label
            htmlFor="title"
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Site title <span className="text-red-600">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            defaultValue={settings.title || ""}
            className="max-w-xl"
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem 0.75rem",
            }}
            required
          />
          <p className="text-sm text-gray-600" style={{ fontSize: "0.875rem" }}>
            The title of this installation as it should appear in web browser titles.
          </p>
        </div>

        {/* Redirect Option */}
        {journals.length > 0 && (
          <div className="space-y-2">
            <Label
              htmlFor="redirect"
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Redirect
            </Label>
            <select
              id="redirect"
              name="redirect"
              defaultValue={settings.redirect || ""}
              className="flex h-10 w-full max-w-xs rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              style={{
                fontSize: "0.875rem",
                padding: "0.5rem 0.75rem",
              }}
            >
              <option value="">No redirect</option>
              {journals.map((journal) => (
                <option key={journal.id} value={journal.id}>
                  {journal.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600" style={{ fontSize: "0.875rem" }}>
              Automatically redirect visitors to the selected journal when they visit the site homepage.
            </p>
          </div>
        )}

        {/* Minimum Password Length */}
        <div className="space-y-2">
          <Label
            htmlFor="minPasswordLength"
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Minimum password length <span className="text-red-600">*</span>
          </Label>
          <Input
            id="minPasswordLength"
            name="minPasswordLength"
            type="number"
            min={6}
            max={64}
            defaultValue={settings.minPasswordLength}
            className="max-w-xs"
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem 0.75rem",
            }}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
