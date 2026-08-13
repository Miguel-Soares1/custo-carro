export type Combustivel = "flex" | "gasolina" | "etanol" | "diesel";

export interface Veiculo {
  /** Nome de exibição da marca (ex.: "Volkswagen"). */
  marca: string;
  /** Nome de exibição do modelo (ex.: "Polo"). */
  modelo: string;
  /** Categoria usada para agrupar modelos relacionados/concorrentes. */
  categoria: string;
  combustivel: Combustivel;
  /** Consumo médio em km/l (para flex, equivalente em gasolina). */
  consumoKmPorLitro: number;
  /** Seguro anual médio estimado, em R$. */
  seguroMedioAnual: number;
  /** Preço FIPE de referência (fallback para SSG), em R$. */
  precoFipe: number;
  /** Ano-modelo de referência usado no cálculo de depreciação. */
  anoModelo: number;
}

export interface EntradasCusto {
  precoFipe: number;
  anoModelo: number;
  /** UF (sigla) usada para a alíquota do IPVA. */
  uf: string;
  kmPorMes: number;
  consumoKmPorLitro: number;
  precoCombustivel: number;
  seguroAnual: number;
  manutencaoMensal: number;
  precoJogoPneus: number;
  vidaUtilPneusKm: number;
  financiamentoMensal: number;
  estacionamentoMensal: number;
  lavagemMensal: number;
  licenciamentoAnual: number;
  /** Marca IPVA como isento manualmente (ex.: regra diferente do estado). */
  ipvaIsento: boolean;
  /** Seguro obrigatório (SPVAT/DPVAT) anual, em R$. */
  seguroObrigatorioAnual: number;
}

export interface CategoriaCusto {
  id: string;
  label: string;
  valorMensal: number;
  /** Indica que o custo foi isento (valor zerado por regra/exceção). */
  isento?: boolean;
}

export interface ResultadoCusto {
  categorias: CategoriaCusto[];
  custoMensal: number;
  custoAnual: number;
  custoPorKm: number;
}
