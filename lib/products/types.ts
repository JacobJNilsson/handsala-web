export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  image: string;
  imageAlt: string;
  url: string;
  /** The company's product, as opposed to an experiment. Rendered first and labelled. */
  flagship?: boolean;
  features: string[];
  technologies: Technology[];
}

export interface Technology {
  name: string;
  color: string;
}
