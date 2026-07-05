"use client";

interface SegmentedControlProps {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SegmentedControl({
  items,
  value,
  onChange,
}: SegmentedControlProps) {
  return (
    <div className="flex justify-center py-2">
      <div
        className="
          inline-flex
          rounded-full
          border
          border-[#D9B471]/20
          bg-white
          p-1
          shadow-md
        "
      >
        {items.map((item) => {
          const active = item === value;

          return (
            <button
              key={item}
              onClick={() => onChange(item)}
              className={`
                rounded-xl
                px-4
                py-2
                md:px-6
                md:py-3
                text-xs
                md:text-sm
                font-semibold
                uppercase
                tracking-[0.18em]
                transition-all
                duration-300

                ${
                  active
                    ? "bg-[#D9B471] text-[#1B2126] shadow-md"
                    : "text-gray-600 hover:text-[#1B2126] hover:bg-[#F8F8F7]"
                }
              `}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}