// TypeScript interfaces for the solar panel website

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

// Strapi API Types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface BlogPostAttributes {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
        width: number;
        height: number;
      };
    };
  };
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  publishedAt: string;
}

// Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
