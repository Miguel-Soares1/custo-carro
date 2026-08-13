import type { ResultadoCusto, Veiculo } from "./tipos";
import { formatarBRL, formatarBRLInt } from "./utils";

/**
 * Gera o objeto JSON-LD (schema.org FAQPage) para a página de um veículo.
 */
export function faqPageSchema(veiculo: Veiculo, resultado: ResultadoCusto) {
  const nome = `${veiculo.marca} ${veiculo.modelo}`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Quanto custa manter um ${nome}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `O custo real mensal para manter um ${nome} é de aproximadamente ${formatarBRLInt(resultado.custoMensal)} por mês, considerando depreciação, IPVA, seguro, combustível, manutenção e pneus. Isso equivale a cerca de ${formatarBRLInt(resultado.custoAnual)} por ano.`,
        },
      },
      {
        "@type": "Question",
        name: `Qual o custo por quilômetro rodado de um ${nome}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Rodando 1.200 km por mês, o ${nome} custa aproximadamente ${formatarBRL(resultado.custoPorKm)} por quilômetro rodado, somando todos os custos de posse e uso.`,
        },
      },
    ],
  };
}
