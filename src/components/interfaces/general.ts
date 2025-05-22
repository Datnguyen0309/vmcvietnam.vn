export interface Course {
  id: number;
  image: string;
  name: string;
  lessons: number;
  duration: string;
  price: string;
  slug: string;
  description: string;

}

export interface MediaContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  bgColor: string;
  imageWidth: number;
  imageHeight: number;
}

export interface BlogCardProps {
  image: string;
  title: string;
  category: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
