import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CalculadoraVeiculo from "@/components/CalculadoraVeiculo";
import ModelosRelacionados from "@/components/ModelosRelacionados";
import { buscarVeiculo, modelosRelacionados, veiculos } from "@/data/veiculos";
import { calcularCusto, entradasPadrao } from "@/lib/calculo";
import { ANO_ATUAL, ROTULO_COMBUSTIVEL, URL_SITE } from "@/lib/constantes";
import { faqPageSchema } from "@/lib/jsonld";
import { formatarBRLInt, slugify } from "@/lib/utils";

export const dynamicParams = false;

interface Params {
  marca: string;
  modelo: string;
}

export function generateStaticParams() {
  return veiculos.map((v) => ({
    marca: slugify(v.marca),
    modelo: slugify(v.modelo),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { marca, modelo } = await params;
  const veiculo = buscarVeiculo(marca, modelo);
  if (!veiculo) return {};

  const resultado = calcularCusto(entradasPadrao(veiculo));
  const titulo = `Quanto custa manter um ${veiculo.marca} ${veiculo.modelo}? Custo real por mês`;
  const descricao = `O custo real mensal para manter um ${veiculo.marca} ${veiculo.modelo} é de aproximadamente ${formatarBRLInt(resultado.custoMensal)} por mês. Veja o cálculo completo (IPVA, seguro, combustível, depreciação, manutenção e mais) e personalize com seus números.`;
  const canonical = `/quanto-custa-manter/${marca}/${modelo}`;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical },
    openGraph: {
      title: titulo,
      description: descricao,
      type: "article",
      url: `${URL_SITE}${canonical}`,
      locale: "pt_BR",
    },
  };
}

export default async function PaginaVeiculo({
  params,
}: {
  params: Promise<Params>;
}) {
  const { marca, modelo } = await params;
  const veiculo = buscarVeiculo(marca, modelo);
  if (!veiculo) notFound();

  const entradas = entradasPadrao(veiculo);
  const resultado = calcularCusto(entradas);
  const relacionados = modelosRelacionados(veiculo);

  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
        <nav aria-label="breadcrumb" className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-700">
            Início
          </Link>
          <span className="mx-1" aria-hidden>
            /
          </span>
          <span>{veiculo.marca}</span>
        </nav>

        <header className="mt-4">
          <p className="text-sm font-medium uppercase tracking-wide text-brand-700">
            {veiculo.categoria} · {ROTULO_COMBUSTIVEL[veiculo.combustivel]}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Quanto custa manter um {veiculo.marca} {veiculo.modelo}?
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Estimamos um custo real mensal de{" "}
            <strong className="text-slate-900">
              {formatarBRLInt(resultado.custoMensal)}
            </strong>{" "}
            usando valores médios nacionais. Ajuste os campos abaixo com a sua
            realidade.
          </p>
        </header>

        <div className="mt-8">
          <CalculadoraVeiculo
            veiculo={veiculo}
            entradasIniciais={entradas}
            anoAtual={ANO_ATUAL}
          />
        </div>

        <section className="mt-12 space-y-6 text-slate-600">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              O que entra no custo de manter um {veiculo.modelo}
            </h2>
            <p className="mt-2">
              O custo de um carro vai muito além da parcela do financiamento.
              Somamos depreciação, IPVA, seguro, licenciamento, combustível,
              manutenção, pneus e custos opcionais como estacionamento e lavagem.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Como calculamos
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Depreciação por faixa de idade do veículo (13%, 9% ou 5% ao ano).</li>
              <li>IPVA com a alíquota do estado selecionado, dividido em 12 meses.</li>
              <li>Seguro e licenciamento rateados mensalmente.</li>
              <li>Combustível a partir da quilometragem mensal e do consumo (km/l).</li>
              <li>Pneus rateados pela vida útil em quilômetros.</li>
              <li>
                Isenção de IPVA, licenciamento e depreciação para carros com 15
                anos ou mais de fabricação.
              </li>
            </ul>
            <p className="mt-2 text-sm text-slate-500">
              Os valores iniciais usam médias nacionais (1.200 km/mês, preço
              médio de combustível e seguro por categoria).
            </p>
          </div>
        </section>

        <div className="mt-10">
          <ModelosRelacionados relacionados={relacionados} />
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema(veiculo, resultado)),
        }}
      />
    </>
  );
}
