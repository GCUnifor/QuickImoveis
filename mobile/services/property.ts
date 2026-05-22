import { api } from "./api";

export interface CreatePropertyData {
  title: string;
  description?: string;
  property_type?: "CASA" | "APARTAMENTO" | "COMERCIAL" | "RURAL" | "TERRENO";
  price: number;
  area?: number;
  bedrooms?: number;
  status?: "RASCUNHO" | "DISPONIVEL" | "VENDIDO";
  address: {
    street?: string;
    number?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
}

export async function createProperty(data: CreatePropertyData) {
  try {
    const response = await api.post("/property", data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const msg = error.response.data.message;
      throw new Error(Array.isArray(msg) ? msg[0] : msg);
    }
    throw new Error("Erro ao criar imóvel. Verifique sua conexão e tente novamente.");
  }
}
