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
  /* A scribal aside, shown in the page margin next to the entry. */
  marginNote?: string;
}

export interface Technology {
  name: string;
  color: string;
}
