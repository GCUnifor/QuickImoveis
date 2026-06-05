export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  property_type: string;
  price: number;
  area: number;
  bedrooms: number;
  status: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  images: {
    id: string;
    image_url: string;
    sort_order: number;
  }[];
}

export interface ListingsResponse {
  data: PropertyListing[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const MOCK_LISTINGS: PropertyListing[] = [
  {
    id: "1",
    title: "Apartamento Moderno na Aldeota",
    description: "Apartamento bem localizado, ideal para quem busca conforto.",
    property_type: "APARTAMENTO",
    price: 450000,
    area: 75,
    bedrooms: 2,
    status: "DISPONIVEL",
    address: {
      street: "Rua Silva Jatahy",
      number: "1200",
      neighborhood: "Aldeota",
      city: "Fortaleza",
      state: "CE",
    },
    images: [
      {
        id: "img1",
        image_url:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
        sort_order: 1,
      },
    ],
  },
  {
    id: "2",
    title: "Casa Contemporânea nas Dunas",
    description: "Casa espaçosa com ótimo padrão construtivo.",
    property_type: "CASA",
    price: 890000,
    area: 180,
    bedrooms: 4,
    status: "DISPONIVEL",
    address: {
      street: "Av. Litorânea",
      number: "450",
      neighborhood: "Dunas",
      city: "Fortaleza",
      state: "CE",
    },
    images: [
      {
        id: "img2",
        image_url:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
        sort_order: 1,
      },
    ],
  },
  {
    id: "3",
    title: "Terreno em Eusébio",
    description: "Terreno amplo em região valorizada.",
    property_type: "TERRENO",
    price: 220000,
    area: 300,
    bedrooms: 0,
    status: "DISPONIVEL",
    address: {
      street: "Rua das Acácias",
      number: "50",
      neighborhood: "Centro",
      city: "Eusébio",
      state: "CE",
    },
    images: [
      {
        id: "img3",
        image_url:
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
        sort_order: 1,
      },
    ],
  },
];

const MOCK_RECOMMENDED_LISTINGS: PropertyListing[] = [
  {
    id: "1",
    title: "Apartamento Moderno na Aldeota",
    description: "Apartamento bem localizado, ideal para quem busca conforto.",
    property_type: "APARTAMENTO",
    price: 450000,
    area: 75,
    bedrooms: 2,
    status: "DISPONIVEL",
    address: {
      street: "Rua Silva Jatahy",
      number: "1200",
      neighborhood: "Aldeota",
      city: "Fortaleza",
      state: "CE",
    },
    images: [
      {
        id: "img1",
        image_url:
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
        sort_order: 1,
      },
    ],
  },
  {
    id: "2",
    title: "Casa Contemporânea nas Dunas",
    description: "Casa espaçosa com ótimo padrão construtivo.",
    property_type: "CASA",
    price: 890000,
    area: 180,
    bedrooms: 4,
    status: "DISPONIVEL",
    address: {
      street: "Av. Litorânea",
      number: "450",
      neighborhood: "Dunas",
      city: "Fortaleza",
      state: "CE",
    },
    images: [
      {
        id: "img2",
        image_url:
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
        sort_order: 1,
      },
    ],
  },
];

export async function getListings(params?: {
  page?: number;
  limit?: number;
  city?: string;
  min_price?: number;
  max_price?: number;
}) {
  const cityFilter = params?.city?.toLowerCase().trim();

  const filtered = cityFilter
    ? MOCK_LISTINGS.filter(
        (item) =>
          item.address.city.toLowerCase().includes(cityFilter) ||
          item.address.neighborhood.toLowerCase().includes(cityFilter) ||
          item.title.toLowerCase().includes(cityFilter)
      )
    : MOCK_LISTINGS;

  return {
    data: filtered,
    meta: {
      total: filtered.length,
      page: 1,
      limit: filtered.length,
      totalPages: 1,
    },
  };
}

export async function getRecommendedListings(params?: {
  page?: number;
  limit?: number;
}) {
  return {
    data: MOCK_RECOMMENDED_LISTINGS,
    meta: {
      total: MOCK_RECOMMENDED_LISTINGS.length,
      page: 1,
      limit: MOCK_RECOMMENDED_LISTINGS.length,
      totalPages: 1,
    },
  };
}

export async function getListingById(id: string) {
  const all = [...MOCK_LISTINGS];
  const found = all.find((item) => item.id === String(id));

  if (!found) {
    throw new Error("Imóvel não encontrado");
  }
<<<<<<< HEAD
}

export interface SimulationResult {
  id_imovel: string;
  valor_imovel: number;
  valor_entrada_minima: number;
  valor_parcela_calculada: number;
  taxa_de_juros: number;
  valor_restante_apos_entrada: number;
  percentual_renda_comprometido: number;
  status: string;
  motivo_caso_nao_recomendado: string[];
  property: PropertyListing;
}

export interface SimulateFinancingResponse {
  data: SimulationResult[];
  meta: {
    total: number;
    prazo_meses: number;
    taxa_anual: number;
  };
}

export async function simulateFinancing(params: {
  renda_mensal: number;
  entrada: number;
  prazo_meses?: number;
}) {
  try {
    const response = await api.post<SimulateFinancingResponse>("/listings/simulate-financing", params);
    return response.data;
  } catch (error) {
    console.error("Error simulating financing:", error);
    throw error;
  }
}

export async function getFavorites(params?: { page?: number; limit?: number }) {
  try {
    const response = await api.get<ListingsResponse>("/favorite", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
}

export async function addFavorite(listingId: string) {
  try {
    const response = await api.post(`/favorite/${listingId}`);
    return response.data;
  } catch (error) {
    console.error(`Error adding favorite ${listingId}:`, error);
    throw error;
  }
}

export async function deleteFavorite(listingId: string) {
  try {
    const response = await api.delete(`/favorite/${listingId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting favorite ${listingId}:`, error);
    throw error;
  }
}
=======

  return found;
}
>>>>>>> fdf3e2ed (feat: adiciona alternancia entre todos os imoveis e recomendados no mobile)
