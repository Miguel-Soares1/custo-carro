# ADR-0001: Next.js App Router com SSG para SEO programático

- Status: aceito
- Data: 2026-08-12

## Contexto

O produto precisa de muitas páginas indexáveis por modelo de carro
(`/quanto-custa-manter/[marca]/[modelo]`), com conteúdo pré-renderizado e
metadados únicos para ranquear bem em buscadores. O conteúdo é previsível e
baseado em uma lista finita e conhecida de modelos.

## Decisão

Usar **Next.js App Router** com **Static Site Generation (SSG)**:

- `generateStaticParams` gera, em build, uma página por modelo a partir do
  array `data/veiculos.ts`.
- `dynamicParams = false` garante que apenas as rotas conhecidas existam
  (rotas inválidas retornam 404 sem renderização sob demanda).
- O valor pré-calculado é gerado no servidor em build (`calcularCusto`) e
  reaproveitado no `generateMetadata`, no JSON-LD e no HTML inicial.
- A interatividade é isolada em um client component (`CalculadoraVeiculo`),
  que recebe os valores iniciais via props e recalcula client-side.

## Consequências

- **Positivas**: HTML estático, rápido e totalmente indexável; custo de
  hospedagem baixo (sem banco/servidor por requisição); previsibilidade.
- **Negativas/riscos**: o preço FIPE de referência vem de um valor hardcoded
  (o valor "vivo" da FIPE é usado apenas no seletor da home). A atualização de
  preços exige novo build/revalidação — ver ADR-0004 e o roadmap para ISR.
