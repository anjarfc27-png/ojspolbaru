"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { TopBar } from "@/components/admin/top-bar";
import { useAuth } from "@/contexts/AuthContext";
import { getRedirectPathByRole } from "@/lib/auth-redirect";

type Props = {
  children: ReactNode;
};

// Layout khusus untuk submission detail - full screen tanpa sidebar
export default function SubmissionDetailLayout({ children }: Props) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) {
      setAuthorized(null);
      return;
    }
    if (!user) {
      setAuthorized(false);
      router.replace("/login?source=/editor");
      return;
    }
    const canEdit = user.roles?.some(r => r.role_path === "editor" || r.role_path === "admin");
    if (!canEdit) {
      setAuthorized(false);
      // Redirect to role-appropriate route
      const redirectPath = getRedirectPathByRole(user);
      router.replace(redirectPath);
      return;
    }
    setAuthorized(true);
  }, [user, loading, router]);

  if (authorized === null) {
    return <div className="min-h-screen bg-[var(--surface-muted)]" />;
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[var(--surface-muted)]">
      <TopBar />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

export const dynamic = "force-dynamic";

