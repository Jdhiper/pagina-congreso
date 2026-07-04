import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      {/* Cambia el src cuando tengas el logo */}
      <Image
        src="/images/logo.png"
        alt="III Jornadas Iberoamericanas"
        width={80}
        height={80}
        priority
      />
    </Link>
  );
}