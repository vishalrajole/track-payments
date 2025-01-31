"use client";
import { Bell, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { logout } from "@/app/(public)/login/actions";
import { useState } from "react";
import Notifications from "../Notifications/Notifications";

export default function Topbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const pageTitle = pathname.split("/").filter(Boolean).pop() || "Payments";

  const formattedTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <header className="w-full bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">{formattedTitle}</h1>

      <div className="flex items-center space-x-4">
        <button
          className="relative p-2 hover:bg-gray-200 rounded"
          onClick={() => setIsOpen(true)}
        >
          <Bell className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={logout}
          name="logout"
          className="p-2 hover:bg-red-100 rounded"
          title="Logout"
        >
          <LogOut className="w-6 h-6 text-red-600" />
        </button>

        {isOpen ? <Notifications setIsOpen={setIsOpen} /> : null}
      </div>
    </header>
  );
}
