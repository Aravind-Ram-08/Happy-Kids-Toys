export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    badge: string;
    ageGroup: string;
    image: string;
    images: string[];
    description: string;
    features: string[];
    inStock: boolean;
    trending: boolean;
}

export type Category =
    | 'Educational Toys'
    | 'Musical Toys'
    | 'Remote Control Toys'
    | 'Baby Toys'
    | 'Outdoor Toys';

export interface FilterState {
    category: string;
    minPrice: number;
    maxPrice: number;
    ageGroup: string;
    sortBy: string;
}
