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

export async function getListingById(id: string) {
  try {
    const response = await api.get<PropertyListing>(`/listings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching listing ${id}:`, error);
    throw error;
  }
}
