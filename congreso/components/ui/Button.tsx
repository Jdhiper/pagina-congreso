import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-[#AF8428] text-white hover:bg-[#D9B471] transition-all duration-300",
    secondary:
      "bg-[#222931] text-white hover:bg-[#1B2126] transition-all duration-300",
    outline:
      "border border-[#AF8428] text-[#AF8428] hover:bg-[#AF8428] hover:text-white transition-all duration-300",
  };

  const classes = cn(
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-medium font-sans",
    styles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}