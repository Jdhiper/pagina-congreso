interface ScheduleItemProps {
  time: string;
  title: string;
  subtitle?: string;
  type?: string;
}

export default function ScheduleItem({
  time,
  title,
  subtitle,
  type,
}: ScheduleItemProps) {
  const badge = () => {
    switch (type) {
      case "break":
        return "☕";
      case "panel":
        return "💬";
      case "culture":
        return "🎼";
      case "ceremony":
        return "🎖";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-[70px_1fr] gap-5 border-b border-gray-200 py-5">

      <div>

        <p className="text-lg font-bold text-[#AF8428]">
          {time}
        </p>

      </div>

      <div>

        {(type === "break" ||
          type === "panel" ||
          type === "culture" ||
          type === "ceremony") && (
          <span className="mr-2 text-lg">
            {badge()}
          </span>
        )}

        <h3 className="inline text-lg font-semibold text-[#1B2126]">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-2 leading-7 text-gray-600">
            {subtitle}
          </p>
        )}

      </div>

    </div>
  );
}