import {
  ALIQUOTAS_IPVA,
  ANO_ATUAL,
  DEFAULTS,
  IDADE_ISENCAO,
  PRECO_COMBUSTIVEL_PADRAO,
  SEGURO_OBRIGATORIO_ANUAL_PADRAO,
} from "./constantes";
import type {
  CategoriaCusto,
  EntradasCusto,
  ResultadoCusto,
  Veiculo,
} from "./tipos";

export function idadeVeiculo(
  anoModelo: number,
  anoAtual: number = ANO_ATUAL,
): number {
  return Math.max(0, anoAtual - anoModelo);
}

/**
 * Taxa de depreciação anual por faixa de idade:
 *  0–3 anos → ~13%/ano, 4–8 anos → ~9%/ano, 8+ anos → ~5%/ano.
 */
export function taxaDepreciacaoAnual(
  anoModelo: number,
  anoAtual: number = ANO_ATUAL,
): number {
  const idade = idadeVeiculo(anoModelo, anoAtual);
  if (idade <= 3) return 0.13;
  if (idade <= 8) return 0.09;
  return 0.05;
}

export function aliquotaIPVA(uf: string): number {
  const chave = (uf || DEFAULTS.uf).trim().toUpperCase();
  return ALIQUOTAS_IPVA[chave] ?? ALIQUOTAS_IPVA[DEFAULTS.uf];
}

/** Veículo com idade >= IDADE_ISENCAO é tratado como "antigo" (isenções). */
export function isentoPorIdade(
  anoModelo: number,
  anoAtual: number = ANO_ATUAL,
): boolean {
  return idadeVeiculo(anoModelo, anoAtual) >= IDADE_ISENCAO;
}

export function calcularCusto(
  e: EntradasCusto,
  anoAtual: number = ANO_ATUAL,
): ResultadoCusto {
  const antigo = isentoPorIdade(e.anoModelo, anoAtual);
  const ipvaIsento = e.ipvaIsento || antigo;

  const depreciacao = antigo
    ? 0
    : (e.precoFipe * taxaDepreciacaoAnual(e.anoModelo, anoAtual)) / 12;
  const ipva = ipvaIsento ? 0 : (e.precoFipe * aliquotaIPVA(e.uf)) / 12;
  const seguro = e.seguroAnual / 12;
  const manutencao = e.manutencaoMensal;
  const pneus =
    e.vidaUtilPneusKm > 0
      ? (e.precoJogoPneus / e.vidaUtilPneusKm) * e.kmPorMes
      : 0;
  const combustivel =
    e.consumoKmPorLitro > 0
      ? (e.kmPorMes / e.consumoKmPorLitro) * e.precoCombustivel
      : 0;
  const financiamento = e.financiamentoMensal;
  const estacionamento = e.estacionamentoMensal;
  const lavagem = e.lavagemMensal;
  const licenciamento = antigo ? 0 : e.licenciamentoAnual / 12;
  const seguroObrigatorio = antigo ? 0 : e.seguroObrigatorioAnual / 12;

  const categorias: CategoriaCusto[] = [
    { id: "combustivel", label: "Combustível", valorMensal: combustivel },
    { id: "depreciacao", label: "Depreciação", valorMensal: depreciacao, isento: antigo },
    { id: "seguro", label: "Seguro", valorMensal: seguro },
    { id: "ipva", label: "IPVA", valorMensal: ipva, isento: ipvaIsento },
    { id: "manutencao", label: "Manutenção", valorMensal: manutencao },
    { id: "pneus", label: "Pneus", valorMensal: pneus },
    { id: "seguro-obrigatorio", label: "Seguro obrigatório", valorMensal: seguroObrigatorio, isento: antigo },
    { id: "financiamento", label: "Financiamento", valorMensal: financiamento },
    { id: "estacionamento", label: "Estacionamento", valorMensal: estacionamento },
    { id: "lavagem", label: "Lavagem", valorMensal: lavagem },
    { id: "licenciamento", label: "Licenciamento", valorMensal: licenciamento, isento: antigo },
  ];

  const custoMensal = categorias.reduce((soma, c) => soma + c.valorMensal, 0);
  const custoAnual = custoMensal * 12;
  const custoPorKm = e.kmPorMes > 0 ? custoMensal / e.kmPorMes : 0;

  return { categorias, custoMensal, custoAnual, custoPorKm };
}

export function entradasPadrao(
  veiculo: Veiculo,
  uf: string = DEFAULTS.uf,
): EntradasCusto {
  return {
    precoFipe: veiculo.precoFipe,
    anoModelo: veiculo.anoModelo,
    uf,
    kmPorMes: DEFAULTS.kmPorMes,
    consumoKmPorLitro: veiculo.consumoKmPorLitro,
    precoCombustivel: PRECO_COMBUSTIVEL_PADRAO[veiculo.combustivel],
    seguroAnual: veiculo.seguroMedioAnual,
    manutencaoMensal: DEFAULTS.manutencaoMensal,
    precoJogoPneus: DEFAULTS.precoJogoPneus,
    vidaUtilPneusKm: DEFAULTS.vidaUtilPneusKm,
    financiamentoMensal: 0,
    estacionamentoMensal: 0,
    lavagemMensal: 0,
    licenciamentoAnual: DEFAULTS.licenciamentoAnual,
    ipvaIsento: false,
    seguroObrigatorioAnual: SEGURO_OBRIGATORIO_ANUAL_PADRAO,
  };
}
