import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getFavorites, addFavorite, deleteFavorite, simulateFinancing, SimulationResult } from '@/services/listings';

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
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  renda: number | null;
  entrada: number | null;
  simulatedProperties: SimulationResult[] | null;
  runSimulation: (renda: number, entrada: number) => Promise<void>;
  clearSimulation: () => void;
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
  const { isAuthenticated } = useAuth();
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [renda, setRenda] = useState<number | null>(null);
  const [entrada, setEntrada] = useState<number | null>(null);
  const [simulatedProperties, setSimulatedProperties] = useState<SimulationResult[] | null>(null);

  useEffect(() => {
    async function loadFavorites() {
      if (isAuthenticated) {
        try {
          const res = await getFavorites({ page: 1, limit: 100 });
          setFavorites(res.data.map(f => f.id));
        } catch (error) {
          console.error("Failed to load favorites from backend:", error);
        }
      } else {
        setFavorites([]);
        clearSimulation();
      }
    }
    loadFavorites();
  }, [isAuthenticated]);

  const addProperty = (newProp: Omit<Property, 'id'>) => {
    const propertyWithId = {
      ...newProp,
      id: Math.random().toString(36).substr(2, 9),
      isUserProperty: true,
    };
    setProperties(prev => [propertyWithId, ...prev]);
  };

  const toggleFavorite = async (id: string) => {
    const isFav = favorites.includes(id);
    try {
      if (isFav) {
        setFavorites(prev => prev.filter(f => f !== id));
        await deleteFavorite(id);
      } else {
        setFavorites(prev => [...prev, id]);
        await addFavorite(id);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Rollback on error
      if (isFav) {
        setFavorites(prev => [...prev, id]);
      } else {
        setFavorites(prev => prev.filter(f => f !== id));
      }
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const runSimulation = async (rendaValue: number, entradaValue: number) => {
    try {
      const response = await simulateFinancing({
        renda_mensal: rendaValue,
        entrada: entradaValue,
      });
      const recommended = response.data.filter(item => item.status === "recomendado");
      setSimulatedProperties(recommended);
      setRenda(rendaValue);
      setEntrada(entradaValue);
    } catch (error) {
      console.error("Error running simulation in context:", error);
      throw error;
    }
  };

  const clearSimulation = () => {
    setSimulatedProperties(null);
    setRenda(null);
    setEntrada(null);
  };

  return (
    <PropertyContext.Provider value={{ 
      properties, 
      favorites, 
      addProperty, 
      toggleFavorite, 
      isFavorite,
      renda,
      entrada,
      simulatedProperties,
      runSimulation,
      clearSimulation
    }}>
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
