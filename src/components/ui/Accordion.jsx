import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full p-4 text-left"
      >
        <span className="font-semibold">{title}</span>
        <HiChevronDown
          className={`text-xl transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && <div className="p-4 border-t bg-gray-50">{children}</div>}
    </div>
  );
}
