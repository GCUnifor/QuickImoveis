import { api } from "./api";

export interface CreatePropertyData {
  title: string;
  description?: string;
  property_type?: "CASA" | "APARTAMENTO" | "COMERCIAL" | "RURAL" | "TERRENO";
  price: number;
  area?: number;
  bedrooms?: number;
  status?: "RASCUNHO" | "DISPONIVEL" | "VENDIDO" | "EM_NEGOCIACAO";
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

export async function uploadPropertyImage(propertyId: string, imageUri: string) {
  const formData = new FormData();
  
  const filename = imageUri.split('/').pop() || `image_${Date.now()}.jpg`;
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image/jpeg`;

  formData.append('image', {
    uri: imageUri,
    name: filename,
    type,
  } as any);

  try {
    const response = await api.post(`/property/${propertyId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      const msg = error.response.data.message;
      throw new Error(Array.isArray(msg) ? msg[0] : msg);
    }
    throw new Error("Erro ao fazer upload da imagem. Verifique sua conexão e tente novamente.");
  }
}
