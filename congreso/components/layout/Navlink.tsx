import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-dark transition-colors duration-300 hover:text-primary"
    >
      {children}
    </Link>
  );
}