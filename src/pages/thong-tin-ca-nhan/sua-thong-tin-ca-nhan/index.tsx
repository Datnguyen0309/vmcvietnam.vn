import { EditProfilePage } from "@/components/editProfile";
import { NextSeo } from "next-seo";

const EditProfile = () => {
  return (
    <>
      <NextSeo title="Sửa thông tin cá nhân" description="Sửa thông tin cá nhân" />
      <EditProfilePage />
    </>
  );
};

export default EditProfile;
