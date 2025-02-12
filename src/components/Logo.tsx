import Image from "next/image";
import Link from "next/link";

export const Logo = ({ logo }: { logo: string }) => {
  return (
    <Link href="/">
      <Image
        src={logo || "/assets/blog.jpeg"}
        width={270}
        height={80}
        alt="Logo"
        priority
        className="h-16 w-auto"
      />
    </Link>
  );
};
