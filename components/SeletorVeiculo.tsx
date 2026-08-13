"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import type { ModeloEstaticoResumo } from "@/data/veiculos";

interface Marca {
  codigo: string;
  nome: string;
}
interface Modelo {
  codigo: number;
  nome: string;
}
interface Ano {
  codigo: string;
  nome: string;
}
interface Detalhe {
  Valor: string;
  Marca: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
  MesReferencia: string;
}

interface Props {
  modelosEstaticos: ModeloEstaticoResumo[];
  rotaBase?: string;
}

/** Nomes de marca da FIPE que divergem do slug canônico do site. */
const ALIAS_MARCA: Record<string, string> = {
  "gm-chevrolet": "chevrolet",
  "vw-volkswagen": "volkswagen",
  "kia-motors": "kia",
};

function normalizarMarcaSlug(nome: string): string {
  const slug = slugify(nome);
  return ALIAS_MARCA[slug] ?? slug;
}

function acharModeloEstatico(
  modelos: ModeloEstaticoResumo[],
  marcaFipe: string,
  modeloFipe: string,
): ModeloEstaticoResumo | undefined {
  const marcaSlug = normalizarMarcaSlug(marcaFipe);
  const modeloSlug = slugify(modeloFipe);
  return modelos.find(
    (m) =>
      m.marcaSlug === marcaSlug &&
      (m.modeloSlug === modeloSlug || modeloSlug.startsWith(`${m.modeloSlug}-`)),
  );
}

const selectCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 disabled:bg-slate-50 disabled:text-slate-400";

export default function SeletorVeiculo({
  modelosEstaticos,
  rotaBase = "/quanto-custa-manter",
}: Props) {
  const router = useRouter();

  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [marcaSel, setMarcaSel] = useState("");
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [modeloSel, setModeloSel] = useState("");
  const [anos, setAnos] = useState<Ano[]>([]);
  const [anoSel, setAnoSel] = useState("");
  const [detalhe, setDetalhe] = useState<Detalhe | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/fipe/marcas")
      .then((r) => r.json())
      .then((d: Marca[]) => setMarcas(d))
      .catch(() => setErro("Não foi possível carregar as marcas."));
  }, []);

  async function selecionarMarca(codigo: string) {
    setMarcaSel(codigo);
    setModeloSel("");
    setAnoSel("");
    setDetalhe(null);
    setModelos([]);
    setAnos([]);
    if (!codigo) return;

    setCarregando(true);
    setErro(null);
    try {
      const r = await fetch(`/api/fipe/marcas/${codigo}/modelos`);
      const d: { modelos?: Modelo[] } = await r.json();
      setModelos(d.modelos ?? []);
    } catch {
      setErro("Erro ao carregar modelos.");
    } finally {
      setCarregando(false);
    }
  }

  async function selecionarModelo(codigo: string) {
    setModeloSel(codigo);
    setAnoSel("");
    setDetalhe(null);
    setAnos([]);
    if (!codigo) return;

    setCarregando(true);
    setErro(null);
    try {
      const r = await fetch(`/api/fipe/marcas/${marcaSel}/modelos/${codigo}/anos`);
      const d: Ano[] = await r.json();
      setAnos(d);
    } catch {
      setErro("Erro ao carregar anos.");
    } finally {
      setCarregando(false);
    }
  }

  async function selecionarAno(codigo: string) {
    setAnoSel(codigo);
    setDetalhe(null);
    if (!codigo) return;

    setCarregando(true);
    setErro(null);
    try {
      const r = await fetch(
        `/api/fipe/marcas/${marcaSel}/modelos/${modeloSel}/anos/${codigo}`,
      );
      const d: Detalhe = await r.json();
      setDetalhe(d);
      const alvo = acharModeloEstatico(modelosEstaticos, d.Marca, d.Modelo);
      if (alvo) {
        router.push(`${rotaBase}/${alvo.marcaSlug}/${alvo.modeloSlug}`);
      }
    } catch {
      setErro("Erro ao carregar o preço FIPE.");
    } finally {
      setCarregando(false);
    }
  }

  const temDetalheSemPagina = Boolean(
    detalhe &&
      !acharModeloEstatico(modelosEstaticos, detalhe.Marca, detalhe.Modelo),
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Marca
          </span>
          <select
            className={selectCls}
            value={marcaSel}
            onChange={(e) => selecionarMarca(e.target.value)}
          >
            <option value="">Selecione…</option>
            {marcas.map((m) => (
              <option key={m.codigo} value={m.codigo}>
                {m.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Modelo
          </span>
          <select
            className={selectCls}
            value={modeloSel}
            disabled={!marcaSel}
            onChange={(e) => selecionarModelo(e.target.value)}
          >
            <option value="">Selecione…</option>
            {modelos.map((m) => (
              <option key={m.codigo} value={m.codigo}>
                {m.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Ano
          </span>
          <select
            className={selectCls}
            value={anoSel}
            disabled={!modeloSel}
            onChange={(e) => selecionarAno(e.target.value)}
          >
            <option value="">Selecione…</option>
            {anos.map((a) => (
              <option key={a.codigo} value={a.codigo}>
                {a.nome}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 min-h-[1.5rem] text-sm">
        {carregando && <p className="text-slate-500">Carregando…</p>}
        {erro && <p className="text-red-600">{erro}</p>}
        {temDetalheSemPagina && detalhe && (
          <p className="text-slate-600">
            <strong className="text-slate-900">
              {detalhe.Marca} {detalhe.Modelo}
            </strong>{" "}
            — preço FIPE {detalhe.Valor} ({detalhe.MesReferencia}). A página
            detalhada deste modelo ainda não está disponível.
          </p>
        )}
      </div>
    </div>
  );
}
