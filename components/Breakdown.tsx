import type { CategoriaCusto } from "@/lib/tipos";
import { formatarBRL } from "@/lib/utils";

export default function Breakdown({ categorias }: { categorias: CategoriaCusto[] }) {
  const comCusto = categorias.filter((c) => c.valorMensal > 0);
  const isentas = categorias.filter((c) => c.isento && c.valorMensal === 0);
  const total = comCusto.reduce((soma, c) => soma + c.valorMensal, 0);
  const max = Math.max(...comCusto.map((c) => c.valorMensal), 1);

  if (comCusto.length === 0 && isentas.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        De onde vem esse valor
      </h2>
      <ul className="mt-4 space-y-4">
        {comCusto.map((c) => {
          const pct = total > 0 ? (c.valorMensal / total) * 100 : 0;
          const largura = (c.valorMensal / max) * 100;
          return (
            <li key={c.id}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-slate-700">{c.label}</span>
                <span className="tabular-nums text-slate-500">
                  {formatarBRL(c.valorMensal)}
                  <span className="ml-1 text-xs text-slate-400">
                    · {pct.toFixed(0)}%
                  </span>
                </span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-600 transition-all"
                  style={{ width: `${largura}%` }}
                />
              </div>
            </li>
          );
        })}
        {isentas.map((c) => (
          <li key={c.id}>
            <div className="flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium text-slate-500">{c.label}</span>
              <span className="text-sm font-medium text-brand-700">Isento</span>
            </div>
            <div className="mt-1.5 h-2.5 rounded-full bg-slate-50" />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-slate-400">
        Percentuais sobre o custo mensal total estimado.
      </p>
    </section>
  );
}
