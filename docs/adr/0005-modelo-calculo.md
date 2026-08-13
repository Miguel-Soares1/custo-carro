# ADR-0005: Modelo de cálculo de custo mensal

- Status: aceito
- Data: 2026-08-12

## Contexto

O produto precisa estimar o "custo real mensal" de manter um carro, de forma
transparente e ajustável pelo usuário. As fórmulas precisam ser simples,
auditáveis e baseadas em médias nacionais.

## Decisão

Centralizar o cálculo em `lib/calculo.ts`, com as seguintes regras:

| Categoria      | Fórmula                                                          |
| -------------- | ---------------------------------------------------------------- |
| Depreciação    | `precoFipe × taxaAnual(idade) / 12` — 13% (0–3a), 9% (4–8a), 5% (8+a) |
| IPVA           | `precoFipe × aliquota(UF) / 12`                                  |
| Seguro         | `seguroAnual / 12`                                               |
| Manutenção     | valor mensal direto                                              |
| Pneus          | `(precoJogo / vidaUtilKm) × kmPorMes`                            |
| Combustível    | `(kmPorMes / consumoKmL) × precoCombustivel`                     |
| Financiamento  | valor mensal direto (opcional)                                   |
| Estacionamento | valor mensal direto (opcional)                                   |
| Lavagem        | valor mensal direto (opcional)                                   |
| Licenciamento  | `licenciamentoAnual / 12`                                        |

Defaults em `lib/constantes.ts` (1.200 km/mês, R$ 2.400/40.000 km de pneus,
alíquotas de IPVA por UF aproximadas, preço médio de combustível, manutenção de
R$ 180/mês, licenciamento de R$ 160/ano). O ano-base (`ANO_ATUAL`) é passado
explicitamente à função para evitar divergência entre SSR e hidratação.

## Consequências

- **Positivas**: cálculo único e testável, fácil de explicar no conteúdo e de
  ajustar futuramente (ex.: inflacionar combustível por região).
- **Negativas/riscos**: alíquotas de IPVA e preços são aproximações; valores
  reais variam por UF, combustível e perfil. Documentado como estimativa.
