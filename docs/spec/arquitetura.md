# Arquitetura

Visão geral da arquitetura do "Custo do Carro".

## Diagrama conceitual

```
[ Browser ]
   │  GET /quanto-custa-manter/{marca}/{modelo}   (HTML estático, SSG)
   │  GET /api/fipe/*                             (proxy com cache 24h)
   ▼
[ Next.js (App Router) ]
   ├── app/quanto-custa-manter/[marca]/[modelo]/page.tsx  (Server Component)
   │      ├── generateStaticParams → data/veiculos.ts
   │      ├── generateMetadata → lib/calculo + lib/utils
   │      ├── CalculadoraVeiculo (Client Component)
   │      │      ├── FormularioUso
   │      │      ├── ResultadoDestaque
   │      │      └── Breakdown
   │      └── ModelosRelacionados + JSON-LD (lib/jsonld)
   ├── app/api/fipe/* → lib/fipe → [parallelum FIPE API]
   ├── app/sitemap.ts / robots.ts
   └── data/veiculos.ts (lista estática)
```

## Camadas

| Camada          | Arquivos                                   | Responsabilidade                        |
| --------------- | ------------------------------------------ | --------------------------------------- |
| Dados           | `data/veiculos.ts`                         | Lista estática dos ~100 modelos         |
| Domínio/cálculo | `lib/calculo.ts`, `lib/constantes.ts`, `lib/tipos.ts` | Fórmulas, defaults e tipos        |
| Integração FIPE | `lib/fipe.ts`, `app/api/fipe/*`            | Proxy com cache de 24h                 |
| SEO             | `lib/jsonld.ts`, `app/sitemap.ts`, `app/robots.ts`, `generateMetadata` | metadata, JSON-LD, sitemap  |
| UI              | `components/*`, `app/page.tsx`, `app/layout.tsx` | Interface, formulário, breakdown |

## Fluxo de renderização

1. **Build (SSG)**: `generateStaticParams` lê `data/veiculos.ts` e gera uma
   página por modelo. Para cada página, `calcularCusto(entradasPadrao(veiculo))`
   produz o valor pré-calculado usado no `generateMetadata`, JSON-LD e HTML.
2. **Hidratação**: `CalculadoraVeiculo` recebe `entradasIniciais` e `anoAtual`
   e recalcula client-side a cada mudança no formulário, sem navegação.
3. **Home**: `SeletorVeiculo` (client) consome `/api/fipe/*` para a cascata e
   redireciona para a página estática correspondente.

## Decisões-chave

Ver `docs/adr/` para o detalhamento das decisões (SSG, Tailwind, dados estáticos,
proxy FIPE, modelo de cálculo e SEO).

## Pontos de extensão

- `lib/calculo.ts` é o ponto único para alterar/acrescentar fórmulas.
- `data/veiculos.ts` é o ponto único para adicionar modelos.
- `lib/fipe.ts` isola a integração com a API da FIPE.
- `components/*` são autocontidos e de baixo acoplamento.
