"use client";

import { useMemo, useState } from "react";
import { calcularCusto } from "@/lib/calculo";
import type { EntradasCusto, Veiculo } from "@/lib/tipos";
import Breakdown from "./Breakdown";
import FormularioUso from "./FormularioUso";
import IndicadorIsencao from "./IndicadorIsencao";
import ResultadoDestaque from "./ResultadoDestaque";

interface Props {
  veiculo: Veiculo;
  entradasIniciais: EntradasCusto;
  anoAtual: number;
}

export default function CalculadoraVeiculo({
  veiculo,
  entradasIniciais,
  anoAtual,
}: Props) {
  const [entradas, setEntradas] = useState<EntradasCusto>(entradasIniciais);

  const resultado = useMemo(
    () => calcularCusto(entradas, anoAtual),
    [entradas, anoAtual],
  );

  function atualizar(patch: Partial<EntradasCusto>) {
    setEntradas((prev) => ({ ...prev, ...patch }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <FormularioUso entradas={entradas} onChange={atualizar} />
      <div className="space-y-6">
        <IndicadorIsencao
          anoModelo={entradas.anoModelo}
          anoAtual={anoAtual}
          ipvaIsentoManual={entradas.ipvaIsento}
        />
        <ResultadoDestaque veiculo={veiculo} resultado={resultado} />
        <Breakdown categorias={resultado.categorias} />
      </div>
    </div>
  );
}
