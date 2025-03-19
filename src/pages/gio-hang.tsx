import ShoppingCart from "@/components/cart";
import { NextSeo } from "next-seo";
const Cart = () => {
  return (
    <>
     <NextSeo title="Giỏ hàng" description="Giỏ hàng" />
      <ShoppingCart />
    </>
  );
};
export default Cart;
