"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>Checking your session...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>
          You are not signed in. Please{" "}
          <Link href="/login" className="underline">
            sign in
          </Link>{" "}
          to proceed.
        </div>
      </div>
    );
  }

  return <>{children}</>;
}