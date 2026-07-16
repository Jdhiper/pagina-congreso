import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "outlined" | "highlight" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const variants = {
  default: `
    bg-white
    border border-[#D9B471]/15
    shadow-lg shadow-[#AF8428]/5
  `,

  outlined: `
    bg-white
    border-2 border-[#D9B471]/20
  `,

  highlight: `
    bg-[#F8F5EE]
    border border-[#D9B471]/40
    shadow-lg shadow-[#AF8428]/10
  `,

  glass: `
    border border-white/20
    bg-white/70
    backdrop-blur-xl
    shadow-xl shadow-black/5
  `,
};

const paddings = {
  none: "",
  sm: "p-5",
  md: "p-7",
  lg: "p-10",
};

export default function Card({
  children,
  variant = "default",
  padding = "md",
  hover = true,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        transition-all
        duration-300
        `,
        variants[variant],
        paddings[padding],

        hover &&
          `
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-[#AF8428]/10
        `,

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}