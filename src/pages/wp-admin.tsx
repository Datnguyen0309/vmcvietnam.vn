import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL || "https://ednu.aum.edu.vn/wp-admin";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(ADMIN_URL);
  }, [router]);
  return null;
};

export default Page;
