import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getSiteInformation, updateSiteInformationAction } from "../../actions";

export default async function SiteSetupInformationPage() {
  const initial = await getSiteInformation();
  return (
    <div className="space-y-6" style={{ padding: "1.5rem 0" }}>
      <header
        className="border-b border-gray-200 bg-gray-50 px-6 py-4"
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
          Information
        </h2>
      </header>
      <form action={updateSiteInformationAction} className="space-y-6">
        {/* About */}
        <div className="space-y-2">
          <Label htmlFor="about" className="block text-sm font-medium">
            About
          </Label>
          <Textarea
            id="about"
            name="about"
            rows={6}
            defaultValue={initial.about || ""}
            className="max-w-2xl"
            placeholder="Enter information about this installation"
          />
          <p className="text-sm text-gray-600">
            A brief description of this installation that will appear on the homepage.
          </p>
        </div>

        {/* Contact Information - OJS 3.3 PKPSiteInformationForm only has about, contactName, contactEmail, privacyStatement */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900">Contact Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="contactName" className="mb-2 block text-sm font-medium">
                Contact name <span className="text-[#b91c1c]">*</span>
              </Label>
              <Input
                id="contactName"
                name="contactName"
                defaultValue={initial.contactName || ""}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactEmail" className="mb-2 block text-sm font-medium">
                Contact email <span className="text-[#b91c1c]">*</span>
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                defaultValue={initial.contactEmail || ""}
                required
              />
            </div>
          </div>
        </div>

        {/* Privacy Statement */}
        <div className="space-y-2">
          <Label htmlFor="privacyStatement" className="block text-sm font-medium">
            Privacy statement
          </Label>
          <Textarea
            id="privacyStatement"
            name="privacyStatement"
            rows={8}
            defaultValue={initial.privacyStatement || ""}
            className="max-w-2xl"
            placeholder="Enter privacy statement"
          />
          <p className="text-sm text-gray-600">
            A statement describing the privacy policy for this installation.
          </p>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
