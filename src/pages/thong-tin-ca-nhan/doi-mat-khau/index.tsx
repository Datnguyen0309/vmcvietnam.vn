import { ChangePasswordPage } from "@/components/changePassword";
import { NextSeo } from "next-seo";

const ChangePassword = () => {
  return (
    <>
      <NextSeo title="Đổi mật khẩu" description="Đổi mật khẩu" />
      <ChangePasswordPage />
    </>
  );
};

export default ChangePassword;
