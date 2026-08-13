// Cliente para a API pública FIPE (parallelum) usado pelo proxy /api/fipe/*.
// Apenas para uso em server-side (route handlers). Cache de 24h via Data Cache.

export const FIPE_BASE_URL =
  process.env.FIPE_BASE_URL ??
  "https://parallelum.com.br/fipe/api/v1/carros";

/** Tempo de revalidação do cache da FIPE: 24 horas, em segundos. */
export const FIPE_REVALIDATE = 60 * 60 * 24;

export interface FipeMarca {
  codigo: string;
  nome: string;
}

export interface FipeModelo {
  codigo: number;
  nome: string;
}

export interface FipeModelosResponse {
  modelos: FipeModelo[];
  anos?: FipeAno[];
}

export interface FipeAno {
  codigo: string;
  nome: string;
}

export interface FipeDetalhe {
  TipoVeiculo: number;
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;
  SiglaCombustivel: string;
}

async function fipeFetch<T>(caminho: string): Promise<T> {
  const url = `${FIPE_BASE_URL}${caminho}`;
  const res = await fetch(url, { next: { revalidate: FIPE_REVALIDATE } });
  if (!res.ok) {
    throw new Error(`FIPE API respondeu ${res.status} para ${url}`);
  }
  return (await res.json()) as T;
}

export const fipe = {
  marcas: () => fipeFetch<FipeMarca[]>("/marcas"),
  modelos: (marca: string) =>
    fipeFetch<FipeModelosResponse>(
      `/marcas/${encodeURIComponent(marca)}/modelos`,
    ),
  anos: (marca: string, modelo: string) =>
    fipeFetch<FipeAno[]>(
      `/marcas/${encodeURIComponent(marca)}/modelos/${encodeURIComponent(modelo)}/anos`,
    ),
  detalhe: (marca: string, modelo: string, ano: string) =>
    fipeFetch<FipeDetalhe>(
      `/marcas/${encodeURIComponent(marca)}/modelos/${encodeURIComponent(modelo)}/anos/${encodeURIComponent(ano)}`,
    ),
};
