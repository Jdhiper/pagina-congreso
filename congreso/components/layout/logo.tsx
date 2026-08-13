import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/logo.png"
        alt="III Jornadas Iberoamericanas"
        width={80}
        height={80}
        priority
        className="h-14 w-14 object-contain"
      />
    </Link>
  );
}