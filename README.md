# Custo do Carro

Site (**Next.js + Tailwind CSS**) que calcula e exibe publicamente o **custo real mensal** de manter um carro no Brasil, com foco em **SEO programático**.

## O que ele faz

- **Páginas dinâmicas (SSG)** em `/quanto-custa-manter/[marca]/[modelo]`, geradas com `generateStaticParams` a partir de uma lista hardcoded com os ~100 modelos mais populares do Brasil.
- **Cálculo completo** do custo mensal: depreciação, IPVA, seguro, manutenção, pneus, combustível, financiamento, estacionamento, lavagem e licenciamento.
- **Exceções/isenções**: carros com 15+ anos ficam isentos de IPVA, licenciamento e depreciação, além de um checkbox manual de isenção de IPVA para regras estaduais diferentes (com indicador automático no resultado).
- **Formulário interativo** (client component) que permite ajustar os valores sem perder o SSG da página.
- **SEO**: `generateMetadata` dinâmico (título e description com o valor calculado), JSON-LD `FAQPage`, `sitemap.xml` e `robots.txt`.
- **Modelos relacionados** (mesma categoria/concorrentes) linkados em cada página.
- **Seleção em cascata** marca → modelo → ano na home, consumindo a tabela FIPE via proxy próprio (`/api/fipe/*`) com cache de 24h.

## Stack

| Camada      | Tecnologia                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack)  |
| UI          | React 19                            |
| Estilo      | Tailwind CSS v4 (mobile-first)      |
| Linguagem   | TypeScript                          |
| Dados       | Estáticos (array hardcoded, sem DB) |
| Fonte FIPE  | API pública `parallelum` via proxy  |

## Como rodar

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build de produção

```bash
npm run build
npm start
```

## Deploy no Vercel

1. Suba o repositório para o GitHub (ou GitLab/Bitbucket).
2. No Vercel, vá em **Add New → Project** e importe o repositório.
3. O framework **Next.js** é detectado automaticamente (build: `next build`).
4. (Opcional) Se tiver domínio próprio, defina `NEXT_PUBLIC_SITE_URL` em
   **Settings → Environment Variables**.
5. Clique em **Deploy**.

A URL pública (sitemap, canonical, Open Graph) é resolvida automaticamente via
`VERCEL_PROJECT_PRODUCTION_URL`/`VERCEL_URL` — só configure `NEXT_PUBLIC_SITE_URL`
para um domínio customizado.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste:

| Variável                 | Descrição                                          |
| ------------------------ | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | URL pública (opcional — auto-detectada na Vercel)  |
| `FIPE_BASE_URL`          | Base da API FIPE (padrão: parallelum)              |

## Estrutura

```
app/
  page.tsx                              # Home (hero + seletor FIPE + lista)
  layout.tsx                            # Layout raiz (header/footer)
  sitemap.ts / robots.ts                # SEO
  quanto-custa-manter/[marca]/[modelo]/ # Página SSG por modelo
  api/fipe/...                          # Proxy FIPE (cache 24h)
components/
  SeletorVeiculo.tsx                    # Cascata marca → modelo → ano
  FormularioUso.tsx                     # Inputs do cálculo
  CalculadoraVeiculo.tsx                # Estado client-side
  ResultadoDestaque.tsx                 # Métricas principais
  IndicadorIsencao.tsx                  # Selos de isenção (idade/checkbox)
  Breakdown.tsx                         # Barras por categoria
  ModelosRelacionados.tsx               # Links de concorrentes
lib/
  tipos.ts / constantes.ts / calculo.ts # Tipos, defaults e fórmulas
  fipe.ts                               # Cliente da API FIPE
  jsonld.ts / utils.ts                  # FAQPage e helpers
data/
  veiculos.ts                           # ~100 modelos populares
docs/                                   # ADRs, specs e roadmap
```

## Documentação

- [ADRs (decisões de arquitetura)](docs/adr/README.md)
- [Especificação de requisitos](docs/spec/requisitos.md)
- [Arquitetura](docs/spec/arquitetura.md)
- [API FIPE](docs/spec/api.md)
- [Roadmap / expansão futura](docs/roadmap.md)

## Aviso

Os valores exibidos são **estimativas** baseadas em médias nacionais e não substituem um orçamento real de seguro, IPVA ou manutenção.
