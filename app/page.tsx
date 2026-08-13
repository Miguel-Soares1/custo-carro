import type { Metadata } from "next";
import Link from "next/link";
import SeletorVeiculo from "@/components/SeletorVeiculo";
import { categorias, modelosEstaticos, veiculos } from "@/data/veiculos";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Custo do Carro — Quanto custa manter um carro no Brasil?",
  description:
    "Calcule o custo real mensal de manter um carro no Brasil: depreciação, IPVA, seguro, combustível, manutenção, pneus e mais. Compare mais de 100 modelos populares.",
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Quanto custa manter um carro no Brasil?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          O preço de um carro não é só a parcela. Somamos depreciação, IPVA,
          seguro, combustível, manutenção, pneus e outros custos para mostrar o
          valor real que você gasta por mês.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">
          Encontre o seu carro
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Selecione marca, modelo e ano (dados da tabela FIPE).
        </p>
        <div className="mt-4">
          <SeletorVeiculo modelosEstaticos={modelosEstaticos} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-slate-900">
          Modelos mais populares
        </h2>
        <div className="mt-6 space-y-8">
          {categorias.map((categoria) => {
            const modelos = veiculos.filter((v) => v.categoria === categoria);
            return (
              <div key={categoria}>
                <h3 className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  {categoria}
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {modelos.map((v) => (
                    <li key={`${v.marca}-${v.modelo}`}>
                      <Link
                        href={`/quanto-custa-manter/${slugify(v.marca)}/${slugify(v.modelo)}`}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition-colors hover:border-brand-600 hover:bg-brand-50"
                      >
                        <span className="font-medium text-slate-900">
                          {v.marca} {v.modelo}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
