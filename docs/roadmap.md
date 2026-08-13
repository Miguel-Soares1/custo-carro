# Roadmap / Expansão futura

Ideias priorizadas para evoluir o produto além do MVP.

## Fase 1 — Dados e precisão

- **Ingestão automática da FIPE**: substituir `precoFipe`/`anoModelo` hardcoded
  por valores reais da FIPE, resolvendo `codigoFipe` por modelo no build.
- **ISR (revalidação incremental)**: em vez de SSG puro, usar `revalidate` por
  página para atualizar preços periodicamente sem rebuild completo.
- **Consumo e seguro reais**: alimentar `consumoKmPorLitro` e `seguroMedioAnual`
  por versão/ano (hoje é uma média por modelo).
- **Alíquotas de IPVA precisas**: tabela por UF × combustível (hoje é aproximada).

## Fase 2 — Cobertura de modelos

- Expandir de ~100 para centenas/milhares de modelos via dados da FIPE.
- Suporte a **elétricos e híbridos** (isenção de IPVA em alguns estados, custo de
  energia, depreciação própria).
- Páginas por **versão/ano** (`/modelo/2024-1.0-turbo`), não só por modelo.

## Fase 3 — Funcionalidades

- **Comparador** lado a lado de 2–4 modelos.
- **Persistência** (contas, salvar cenários, compartilhar cálculo por URL).
- **Geolocalização/preço de combustível** por estado/cidade.
- **Simulador de financiamento** mais completo (entrada, juros, prazo).
- Gráficos melhores (série temporal de depreciação, projeção de custo em 5 anos).

## Fase 4 — Monetização e distribuição

- Programas de afiliados (seguro, pneus, combustível).
- Artigos/blog de SEO (comprar vs. alugar, custo por km, etc.).
- Internacionalização (PT-BR → ES/EN).

## Fase 5 — Qualidade e operação

- **Testes** unitários do `lib/calculo.ts` (Vitest) e e2e (Playwright).
- **Observabilidade** (logs/erros do proxy FIPE, métricas).
- **CI/CD** (build + deploy automático, previews).
- **Monitoramento de SEO** (Search Console, validar dados estruturados).

## Dívidas técnicas conhecidas

- Valores de referência (preço, seguro, consumo, IPVA) são aproximações manuais.
- Matching marca/modelo da FIPE → modelo estático é heurístico (prefixo de slug).
- API FIPE é não-oficial e pode quebrar; manter `lib/fipe.ts` desacoplado.
