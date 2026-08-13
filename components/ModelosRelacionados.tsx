import Link from "next/link";
import type { Veiculo } from "@/lib/tipos";
import { slugify } from "@/lib/utils";

export default function ModelosRelacionados({
  relacionados,
}: {
  relacionados: Veiculo[];
}) {
  if (relacionados.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Compare com modelos parecidos
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {relacionados.map((v) => {
          const href = `/quanto-custa-manter/${slugify(v.marca)}/${slugify(v.modelo)}`;
          return (
            <Link
              key={`${v.marca}-${v.modelo}`}
              href={href}
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition-colors hover:border-brand-600 hover:bg-brand-50"
            >
              <span className="font-semibold text-slate-900">
                {v.marca} {v.modelo}
              </span>
              <span className="text-xs text-slate-500">{v.categoria}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
