import { useQuery } from "react-query";
import { getDataSetUp } from "@/utils/fetch-auth-odoo";

export const useProductCategories = () =>
  useQuery(
    "getListCate",
    () => getDataSetUp({ root: "product", type: "product-categories" }),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 3,     // cache "tạm" trong 3 phút
      cacheTime: 1000 * 60 * 5,     // xóa khỏi cache sau 5 phút
      refetchOnWindowFocus: true,   // quay lại tab sẽ refetch nếu đã quá staleTime
    }

  );
