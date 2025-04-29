import { MyProfilePage } from "@/components/profile";
import { NextSeo } from "next-seo";

const Profile = () => {
  return (
    <>
      <NextSeo title="Thông tin cá nhân" description="Thông tin cá nhân" />
      <MyProfilePage />
    </>
  );
};

export default Profile;
