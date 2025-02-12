import { useRouter } from "next/router";
import { LayoutNganh } from "../LayouNganh";

export const KhoaHocByCate = () => {
  const router = useRouter();
  const category = (router.query.type as string) || "all";

  return <LayoutNganh category={category} titles="test" />;
};
export default KhoaHocByCate;
