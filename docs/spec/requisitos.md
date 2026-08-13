# Especificação de Requisitos

Documento de referência do produto "Custo do Carro".

## Objetivo

Calcular e **exibir publicamente** o custo real mensal de manter um carro no
Brasil, com foco em **SEO programático** (uma página indexável por modelo).

## Requisitos funcionais

### Páginas dinâmicas (SEO)

- **RF-01** — Rota `/quanto-custa-manter/[marca]/[modelo]` gerada via
  `generateStaticParams`, a partir de uma lista manual (hardcoded) dos ~100
  modelos mais populares do Brasil.
- **RF-02** — Cada página vem pré-calculada com valores médios nacionais
  (1.200 km/mês, combustível médio, seguro médio por categoria) e permite
  ajustar via formulário interativo (client component) **sem perder o SSG**.
- **RF-03** — `generateMetadata` dinâmico: título
  "Quanto custa manter um {marca} {modelo}? Custo real por mês" e description
  incluindo o valor calculado.
- **RF-04** — JSON-LD (`schema.org FAQPage`) respondendo "quanto custa manter
  um {modelo}".
- **RF-05** — Cada página linka para 3–4 modelos relacionados (mesma
  categoria/concorrentes).

### Dados do veículo (FIPE)

- **RF-06** — Proxy `/api/fipe/*` com cache de 24h.
- **RF-07** — Seleção em cascata marca → modelo → ano na home, redirecionando
  para a página estática do modelo quando disponível.

### Cálculo

- **RF-08** — Depreciação: `preço FIPE × taxa por idade / 12`
  (0–3a ≈ 13%/ano, 4–8a ≈ 9%/ano, 8+a ≈ 5%/ano).
- **RF-09** — IPVA: `preço FIPE × alíquota do estado / 12`.
- **RF-10** — Seguro: input anual / 12.
- **RF-11** — Manutenção: input mensal direto.
- **RF-12** — Pneus: `(preço do jogo ÷ vida útil km) × km/mês`
  (default R$ 2.400 / 40.000 km).
- **RF-13** — Combustível: `(km/mês ÷ consumo km/l) × preço do combustível`.
- **RF-14** — Financiamento: parcela mensal opcional (soma direta).
- **RF-15** — Estacionamento: input mensal opcional.
- **RF-16** — Lavagem: input mensal opcional.
- **RF-17** — Licenciamento: input anual / 12.

### Exceções e isenções

- **RF-22** — Seguro obrigatório (SPVAT/DPVAT): item anual no cálculo
  (default R$ 0, suspenso no Brasil).
- **RF-23** — Isenção por idade: carros com 15+ anos ficam isentos de IPVA,
  licenciamento, depreciação e seguro obrigatório.
- **RF-24** — Checkbox manual "meu carro é isento de IPVA" para cobrir regras
  estaduais divergentes.
- **RF-25** — Breakdown exibe itens isentos como "Isento" (em vez de omiti-los).

### Saídas

- **RF-18** — Custo mensal real (destaque): "Seu carro custa aproximadamente
  R$ X/mês".
- **RF-19** — Custo por km: `custo mensal ÷ km rodados/mês`.
- **RF-20** — Custo anual: `custo mensal × 12`.
- **RF-21** — Breakdown visual (barras) por categoria.

## Requisitos não funcionais

- **RNF-01** — Sem banco de dados no MVP; tudo estático (SSG) exceto o
  formulário interativo (client-side).
- **RNF-02** — Design limpo, mobile-first, Tailwind CSS.
- **RNF-03** — TypeScript com tipagem estrita.
- **RNF-04** — Build determinístico (sem dependência de rede no build das
  páginas estáticas).
- **RNF-05** — SEO: sitemap, robots, canonical e dados estruturados.

## Fora de escopo (MVP)

- Suporte a veículos elétricos/híbridos no cálculo (isentos de IPVA em alguns
  estados, sem combustível).
- Persistência/contas de usuário, salvar cálculos.
- Comparador lado a lado de múltiplos modelos.
