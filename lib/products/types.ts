export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  image: string;
  imageAlt: string;
  url: string;
  features: string[];
  technologies: Technology[];
}

export interface Technology {
  name: string;
  color: string;
}
