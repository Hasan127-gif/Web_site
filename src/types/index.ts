export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  verifications: {
    id: boolean;
    student: boolean;
    phone: boolean;
  };
  rating: number;
  reviewCount: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  location: {
    city: string;
    district: string;
    lat: number;
    lng: number;
  };
  user: User;
  category: 'roommate' | 'pet' | 'furniture';
  createdAt: string;
  featured: boolean;
  escrow?: boolean;
}

export interface RoommateListing extends Listing {
  category: 'roommate';
  roomType: 'single' | 'shared' | 'studio';
  availableFrom: string;
  preferences: {
    gender?: 'male' | 'female' | 'any';
    smoking: boolean;
    pets: boolean;
    students: boolean;
  };
}

export interface PetListing extends Listing {
  category: 'pet';
  petType: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  age: string;
  gender: 'male' | 'female';
  vaccinated: boolean;
  neutered: boolean;
}

export interface FurnitureListing extends Listing {
  category: 'furniture';
  furnitureType: 'sofa' | 'table' | 'chair' | 'bed' | 'storage' | 'decoration' | 'other';
  condition: 'new' | 'excellent' | 'good' | 'fair';
  dimensions?: string;
}

export type Theme = 'light' | 'dark';