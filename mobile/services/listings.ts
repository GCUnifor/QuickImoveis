import { api } from "./api";

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



export async function getListings(params?: {
  page?: number;
  limit?: number;
  city?: string;
  min_price?: number;
  max_price?: number;
}) {
  try {
    const response = await api.get<ListingsResponse>("/listings", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

export async function getRecommendedListings(params?: {
  page?: number;
  limit?: number;
}) {
  try {
    const response = await api.get<ListingsResponse>("/listings/recommendations", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended listings:", error);
    throw error;
  }
}

export async function getListingById(id: string) {
  try {
    const response = await api.get<PropertyListing>(`/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching listing by id ${id}:`, error);
    throw error;
  }
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
