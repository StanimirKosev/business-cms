"use client";

import { signOut } from "next-auth/react";
import { Button } from "@repo/ui/components/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Header() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await signOut({ redirect: false });
      window.location.href = "/login";
    } catch (error) {
      console.error("[Header] Logout error:", error);
      toast.error("Възникна грешка", {
        description: "Възникна грешка при изход. Опитайте отново.",
      });
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold text-gray-900">Панел</h1>

      <Button
        onClick={handleLogout}
        disabled={isLoggingOut}
        size="sm"
        variant="outline"
        className="gap-2"
      >
        <LogOut size={16} />
        {isLoggingOut ? "Изход..." : "Изход"}
      </Button>
    </header>
  );
}
