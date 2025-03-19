export type TMenus = {
  path: string;
  title: string;
  childs?: {
    path: string;
    title: string;
  }[];
}[];

export const menus = [
  {
    path: "/", // the url
    title: "Trang chủ",
  },
  {
    path: "/gioi-thieu", // the url
    title: "Giới thiệu",
  },

  {
    path: "/khoa-hoc", // the url
    title: "Khóa học",
  },

  {
    path: "/blog", // the url
    title: "Blog",
  },
  {
    path: "/lien-he", // the url
    title: "Liên hệ",
  },
];
