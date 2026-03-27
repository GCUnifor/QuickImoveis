import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  category: string;
  image: string;
  type: 'Venda' | 'Aluguel';
  description?: string;
  features?: string[];
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  parking?: string;
  whatsapp?: string;
  isUserProperty?: boolean;
}

interface PropertyContextType {
  properties: Property[];
  favorites: string[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: "Apartamento Moderno na Aldeota",
    price: "R$ 450.000",
    location: "Aldeota, Fortaleza - CE",
    category: "Apartamento",
    type: 'Venda',
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: '2',
    title: "Casa Contemporânea de Luxo",
    price: "R$ 890.000",
    location: "Dunas, Fortaleza - CE",
    category: "Casa",
    type: 'Venda',
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
  },
];

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addProperty = (newProp: Omit<Property, 'id'>) => {
    const propertyWithId = {
      ...newProp,
      id: Math.random().toString(36).substr(2, 9),
      isUserProperty: true,
    };
    setProperties(prev => [propertyWithId, ...prev]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <PropertyContext.Provider value={{ properties, favorites, addProperty, toggleFavorite, isFavorite }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
