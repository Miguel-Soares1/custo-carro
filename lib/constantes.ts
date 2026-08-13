import type { Combustivel } from "./tipos";

export const NOME_SITE = "Custo do Carro";

function normalizarUrl(url: string): string {
  const semBarra = url.replace(/\/+$/, "");
  return /^https?:\/\//i.test(semBarra) ? semBarra : `https://${semBarra}`;
}

/**
 * URL pública do site (sitemap, robots, canonical, Open Graph).
 * Resolução automática:
 * 1. NEXT_PUBLIC_SITE_URL (domínio próprio, definido na Vercel)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (produção na Vercel)
 * 3. VERCEL_URL (deployment/preview na Vercel)
 * 4. http://localhost:3000 (desenvolvimento local)
 */
export const URL_SITE = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizarUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizarUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }
  if (process.env.VERCEL_URL) {
    return normalizarUrl(process.env.VERCEL_URL);
  }
  return "http://localhost:3000";
})();

/** Ano usado como base no cálculo de depreciação (idade do veículo). */
export const ANO_ATUAL = new Date().getFullYear();

/**
 * Idade (em anos) a partir da qual o veículo é considerado "antigo" e isento
 * de IPVA, licenciamento, depreciação e seguro obrigatório.
 */
export const IDADE_ISENCAO = 15;

/**
 * Seguro obrigatório (SPVAT/DPVAT) anual padrão, em R$.
 * Atualmente suspenso no Brasil — mantido em 0.
 */
export const SEGURO_OBRIGATORIO_ANUAL_PADRAO = 0;

export const DEFAULTS = {
  kmPorMes: 1200,
  precoJogoPneus: 2400,
  vidaUtilPneusKm: 40000,
  manutencaoMensal: 180,
  licenciamentoAnual: 160,
  uf: "SP",
} as const;

/**
 * Alíquotas médias aproximadas de IPVA (veículos de passeio) por UF.
 * Valores de referência — a alíquota real varia por estado, combustível e ano.
 */
export const ALIQUOTAS_IPVA: Record<string, number> = {
  AC: 0.02,
  AL: 0.03,
  AP: 0.03,
  AM: 0.03,
  BA: 0.025,
  CE: 0.03,
  DF: 0.035,
  ES: 0.02,
  GO: 0.0375,
  MA: 0.025,
  MT: 0.03,
  MS: 0.035,
  MG: 0.04,
  PA: 0.025,
  PB: 0.025,
  PR: 0.035,
  PE: 0.03,
  PI: 0.025,
  RJ: 0.04,
  RN: 0.03,
  RS: 0.03,
  RO: 0.03,
  RR: 0.03,
  SC: 0.02,
  SP: 0.04,
  SE: 0.025,
  TO: 0.03,
};

export const UFS = Object.keys(ALIQUOTAS_IPVA).sort();

/** Preço médio de referência por litro de combustível (R$). */
export const PRECO_COMBUSTIVEL_PADRAO: Record<Combustivel, number> = {
  gasolina: 5.8,
  etanol: 3.95,
  flex: 5.8,
  diesel: 6.0,
};

export const ROTULO_COMBUSTIVEL: Record<Combustivel, string> = {
  flex: "Flex",
  gasolina: "Gasolina",
  etanol: "Etanol",
  diesel: "Diesel",
};
