import { IDADE_ISENCAO } from "@/lib/constantes";
import { idadeVeiculo } from "@/lib/calculo";

interface Props {
  anoModelo: number;
  anoAtual: number;
  /** Checkbox manual "meu carro é isento de IPVA". */
  ipvaIsentoManual: boolean;
}

/**
 * Indicador automático de isenção. Reage ao "Ano do veículo" e ao checkbox:
 * - 15+ anos: selo verde "isento por idade" (IPVA + licenciamento + depreciação).
 * - checkbox manual: selo azul "IPVA isento — marcado manualmente".
 * - 10–14 anos: aviso âmbar com quantos anos faltam para a isenção.
 * - caso contrário: nada é exibido.
 */
export default function IndicadorIsencao({
  anoModelo,
  anoAtual,
  ipvaIsentoManual,
}: Props) {
  const anoValido = Boolean(anoModelo) && anoModelo >= 1900;
  const idade = anoValido ? idadeVeiculo(anoModelo, anoAtual) : 0;
  const isentoPorIdade = anoValido && idade >= IDADE_ISENCAO;
  const faltam = IDADE_ISENCAO - idade;

  if (isentoPorIdade) {
    return (
      <div className="rounded-xl border border-brand-600 bg-brand-50 p-4">
        <p className="font-semibold text-brand-700">
          Este carro tem {idade} anos — isento por idade
        </p>
        <p className="mt-1 text-sm text-brand-700">
          IPVA, licenciamento e depreciação foram zerados (isenção a partir de{" "}
          {IDADE_ISENCAO} anos de fabricação).
        </p>
      </div>
    );
  }

  if (ipvaIsentoManual) {
    return (
      <div className="rounded-xl border border-sky-300 bg-sky-50 p-4">
        <p className="font-semibold text-sky-700">
          IPVA isento — marcado manualmente
        </p>
        <p className="mt-1 text-sm text-sky-700">
          Somente o IPVA foi zerado. Licenciamento e demais custos continuam
          sendo considerados.
        </p>
      </div>
    );
  }

  if (anoValido && faltam > 0 && faltam <= 5) {
    return (
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          Este carro tem {idade} {idade === 1 ? "ano" : "anos"}. Faltam{" "}
          {faltam} {faltam === 1 ? "ano" : "anos"} para a isenção de IPVA e
          licenciamento (a partir de {IDADE_ISENCAO} anos).
        </p>
      </div>
    );
  }

  return null;
}
