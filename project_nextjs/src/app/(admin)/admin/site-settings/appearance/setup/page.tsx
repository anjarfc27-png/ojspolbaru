import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSiteAppearanceSetup, updateSiteAppearanceSetupAction } from "../../actions";

// Dummy sidebar options for now
const SIDEBAR_OPTIONS = [
  { value: "user", label: "User Block" },
  { value: "language", label: "Language Toggle Block" },
  { value: "navigation", label: "Navigation Block" },
  { value: "announcements", label: "Announcements Block" },
];

export default async function AppearanceSetupPage() {
  const setup = await getSiteAppearanceSetup();

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
          Setup
        </h2>
      </header>

      <form action={updateSiteAppearanceSetupAction} className="space-y-6">
        {/* Logo Upload - OJS 3.3: pageHeaderTitleImage (FieldUploadImage, multilingual) */}
        <div className="space-y-3">
          <Label
            htmlFor="pageHeaderTitleImage"
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Logo
          </Label>
          <Input
            id="pageHeaderTitleImage"
            name="pageHeaderTitleImage"
            type="text"
            defaultValue={setup.pageHeaderTitleImage || ""}
            className="max-w-md"
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem 0.75rem",
            }}
            placeholder="Enter logo URL or path (file upload will be implemented)"
          />
          <p className="text-sm text-gray-600" style={{ fontSize: "0.875rem" }}>
            URL or path to the logo image to display in the page header. In OJS 3.3 this is a multilingual FieldUploadImage.
          </p>
          {setup.pageHeaderTitleImage && (
            <div className="mt-2">
              <img src={setup.pageHeaderTitleImage} alt="Logo preview" className="h-20 object-contain" style={{ height: "5rem" }} />
            </div>
          )}
        </div>

        {/* Page Footer - OJS 3.3: pageFooter (FieldRichTextarea, multilingual) */}
        <div className="space-y-3">
          <Label
            htmlFor="pageFooter"
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Page footer
          </Label>
          <Textarea
            id="pageFooter"
            name="pageFooter"
            defaultValue={setup.pageFooter || ""}
            rows={6}
            className="max-w-2xl"
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem 0.75rem",
            }}
            placeholder="Enter footer content (HTML allowed)"
          />
          <p className="text-sm text-gray-600" style={{ fontSize: "0.875rem" }}>
            Content to display in the page footer. HTML is allowed. In OJS 3.3 this is a multilingual FieldRichTextarea.
          </p>
        </div>

        {/* Sidebar Blocks - OJS 3.3: sidebar (FieldOptions, isOrderable) */}
        <div className="space-y-3">
          <Label
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Sidebar
          </Label>
          <p className="text-sm text-gray-600 mb-3" style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}>
            Select which blocks to display in the sidebar. In OJS 3.3 this is orderable (drag & drop).
          </p>
          <div
            className="space-y-2 border border-gray-200 rounded-md p-4 max-w-md"
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "0.375rem",
              padding: "1rem",
            }}
          >
            {SIDEBAR_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                }}
              >
                <input
                  type="checkbox"
                  name="sidebar"
                  value={option.value}
                  defaultChecked={setup.sidebar.includes(option.value)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm" style={{ fontSize: "0.875rem" }}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Stylesheet - OJS 3.3: styleSheet (FieldUpload, .css only) */}
        <div className="space-y-3">
          <Label
            htmlFor="styleSheet"
            style={{
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Custom stylesheet
          </Label>
          <Input
            id="styleSheet"
            name="styleSheet"
            type="text"
            defaultValue={setup.styleSheet || ""}
            className="max-w-md"
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem 0.75rem",
            }}
            placeholder="Enter stylesheet URL or path (file upload will be implemented)"
          />
          <p className="text-sm text-gray-600" style={{ fontSize: "0.875rem" }}>
            URL or path to a custom CSS file to override default styles. In OJS 3.3 this is a FieldUpload that accepts .css files only.
          </p>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}
