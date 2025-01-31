import { X } from "lucide-react";

interface NotificationsProps {
  setIsOpen: (isOpen: boolean) => void;
}

export default function Notifications({ setIsOpen }: NotificationsProps) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      />

      <aside className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-lg z-50 p-4 flex flex-col">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 space-y-2">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="p-2 border rounded-lg bg-gray-100">
              <p className="text-sm font-medium">Property {i + 1}</p>
              <p className="text-xs text-gray-500">Payment received...</p>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
