import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'https://admindsome.devlab.info.vn/wp-json/wp/v2/categories';
export type Category = {
  count: number;
  id: number;
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(API_URL);
    const categories = await response.json();
    const excludeIds = [7, 8 ,9];
    // Lọc bỏ danh mục có id = 7
    const filteredCategories = categories.filter(
      (category: Category) => !excludeIds.includes(category.id)
    );

    res.status(200).json(filteredCategories);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh mục' });
  }
}
