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
    path: "/tin-tuc", // the url
    title: "Tin tức",
  },
  {
    path: "/lien-he", // the url
    title: "Liên hệ",
  },
];
