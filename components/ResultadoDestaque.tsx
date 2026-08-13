import type { ResultadoCusto, Veiculo } from "@/lib/tipos";
import { formatarBRL, formatarBRLInt } from "@/lib/utils";

interface Props {
  veiculo: Veiculo;
  resultado: ResultadoCusto;
}

export default function ResultadoDestaque({ veiculo, resultado }: Props) {
  const nome = `${veiculo.marca} ${veiculo.modelo}`;
  const isentas = resultado.categorias
    .filter((c) => c.isento)
    .map((c) => c.label);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        Custo mensal real estimado
      </p>
      <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        {formatarBRLInt(resultado.custoMensal)}
        <span className="text-lg font-medium text-slate-400">/mês</span>
      </p>

      <div className="mt-4 space-y-2 text-slate-600">
        <p>
          Seu <strong className="text-slate-900">{nome}</strong> custa
          aproximadamente{" "}
          <strong className="text-slate-900">
            {formatarBRLInt(resultado.custoMensal)} por mês
          </strong>
          .
        </p>
        <p>
          Esse carro custa{" "}
          <strong className="text-slate-900">
            {formatarBRL(resultado.custoPorKm)} por km
          </strong>
          .
        </p>
        <p>
          Custo anual estimado:{" "}
          <strong className="text-slate-900">
            {formatarBRLInt(resultado.custoAnual)}
          </strong>
          .
        </p>
      </div>

      {isentas.length > 0 && (
        <p className="mt-3 text-sm font-medium text-brand-700">
          Isenções aplicadas: {isentas.join(", ")}.
        </p>
      )}
    </section>
  );
}
