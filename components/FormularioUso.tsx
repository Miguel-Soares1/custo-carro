"use client";

import type { ReactNode } from "react";
import { UFS } from "@/lib/constantes";
import type { EntradasCusto } from "@/lib/tipos";

interface Props {
  entradas: EntradasCusto;
  onChange: (patch: Partial<EntradasCusto>) => void;
}

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600";

function Campo({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="mt-1 block text-xs text-slate-400">{hint}</span>
      ) : null}
    </label>
  );
}

function Numero({
  valor,
  onChange,
  prefixo = "R$",
}: {
  valor: number;
  onChange: (v: number) => void;
  prefixo?: string;
}) {
  return (
    <div className="relative">
      {prefixo ? (
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-slate-400">
          {prefixo}
        </span>
      ) : null}
      <input
        type="number"
        inputMode="decimal"
        step="any"
        value={Number.isFinite(valor) ? valor : 0}
        onChange={(e) =>
          onChange(e.target.value === "" ? 0 : Number(e.target.value))
        }
        className={`${inputCls} ${prefixo ? "pl-11" : ""}`}
      />
    </div>
  );
}

function Secao({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-slate-900">{titulo}</legend>
      {children}
    </fieldset>
  );
}

export default function FormularioUso({ entradas, onChange }: Props) {
  return (
    <form
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      onSubmit={(e) => e.preventDefault()}
    >
      <Secao titulo="Uso e combustível">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Campo label="Km por mês">
            <Numero
              valor={entradas.kmPorMes}
              prefixo=""
              onChange={(v) => onChange({ kmPorMes: v })}
            />
          </Campo>
          <Campo label="Consumo (km/l)">
            <Numero
              valor={entradas.consumoKmPorLitro}
              prefixo=""
              onChange={(v) => onChange({ consumoKmPorLitro: v })}
            />
          </Campo>
          <Campo label="Combustível (R$/l)">
            <Numero
              valor={entradas.precoCombustivel}
              onChange={(v) => onChange({ precoCombustivel: v })}
            />
          </Campo>
        </div>
      </Secao>

      <Secao titulo="Veículo, impostos e documentação">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Campo label="Estado (IPVA)">
            <select
              className={inputCls}
              value={entradas.uf}
              onChange={(e) => onChange({ uf: e.target.value })}
            >
              {UFS.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </Campo>
          <Campo label="Ano do veículo">
            <Numero
              valor={entradas.anoModelo}
              prefixo=""
              onChange={(v) => onChange({ anoModelo: v })}
            />
          </Campo>
          <Campo label="Preço FIPE">
            <Numero
              valor={entradas.precoFipe}
              onChange={(v) => onChange({ precoFipe: v })}
            />
          </Campo>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Campo label="Licenciamento anual">
            <Numero
              valor={entradas.licenciamentoAnual}
              onChange={(v) => onChange({ licenciamentoAnual: v })}
            />
          </Campo>
          <Campo
            label="Seguro obrigatório (SPVAT/DPVAT) anual"
            hint="Suspenso atualmente no Brasil (R$ 0)"
          >
            <Numero
              valor={entradas.seguroObrigatorioAnual}
              onChange={(v) => onChange({ seguroObrigatorioAnual: v })}
            />
          </Campo>
        </div>
        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={entradas.ipvaIsento}
            onChange={(e) => onChange({ ipvaIsento: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600"
          />
          <span>
            Meu carro é <strong>isento de IPVA</strong> (ex.: regra diferente do
            estado ou outra condição de isenção)
          </span>
        </label>
      </Secao>

      <Secao titulo="Seguro, manutenção e pneus">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Campo label="Seguro anual">
            <Numero
              valor={entradas.seguroAnual}
              onChange={(v) => onChange({ seguroAnual: v })}
            />
          </Campo>
          <Campo label="Manutenção mensal">
            <Numero
              valor={entradas.manutencaoMensal}
              onChange={(v) => onChange({ manutencaoMensal: v })}
            />
          </Campo>
          <Campo label="Pneus (jogo)">
            <Numero
              valor={entradas.precoJogoPneus}
              onChange={(v) => onChange({ precoJogoPneus: v })}
            />
          </Campo>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Campo label="Vida útil dos pneus (km)" hint="Padrão: 40.000 km">
            <Numero
              valor={entradas.vidaUtilPneusKm}
              prefixo=""
              onChange={(v) => onChange({ vidaUtilPneusKm: v })}
            />
          </Campo>
        </div>
      </Secao>

      <Secao titulo="Custos opcionais">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Campo label="Financiamento (mensal)">
            <Numero
              valor={entradas.financiamentoMensal}
              onChange={(v) => onChange({ financiamentoMensal: v })}
            />
          </Campo>
          <Campo label="Estacionamento (mensal)">
            <Numero
              valor={entradas.estacionamentoMensal}
              onChange={(v) => onChange({ estacionamentoMensal: v })}
            />
          </Campo>
          <Campo label="Lavagem (mensal)">
            <Numero
              valor={entradas.lavagemMensal}
              onChange={(v) => onChange({ lavagemMensal: v })}
            />
          </Campo>
        </div>
      </Secao>
    </form>
  );
}
