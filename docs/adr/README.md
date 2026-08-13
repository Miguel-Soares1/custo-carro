# ADRs — Architecture Decision Records

Registro das decisões de arquitetura do projeto. Cada ADR descreve o contexto,
a decisão tomada e as consequências.

## Índice

- [ADR-0001 — Next.js App Router com SSG para SEO programático](0001-nextjs-app-router-ssg.md)
- [ADR-0002 — Tailwind CSS v4, mobile-first, sem kit de UI](0002-tailwind-mobile-first.md)
- [ADR-0003 — Dados estáticos hardcoded (sem banco de dados) no MVP](0003-dados-estaticos-sem-db.md)
- [ADR-0004 — Proxy FIPE em `/api/fipe/*` com cache de 24h](0004-proxy-fipe-cache-24h.md)
- [ADR-0005 — Modelo de cálculo de custo mensal](0005-modelo-calculo.md)
- [ADR-0006 — SEO programático (metadata, JSON-LD, sitemap, robots)](0006-seo-programatico.md)
- [ADR-0007 — Exceções e isenções por idade do veículo](0007-excecoes-isencao-idade.md)

## Como criar um novo ADR

1. Copie o formato abaixo para `docs/adr/NNNN-titulo-curto.md` (NNNN = próximo número).
2. Preencha Contexto, Decisão e Consequências.
3. Adicione o link no índice acima.

```md
# ADR-NNNN: Título

- Status: proposto | aceito | substituído
- Data: YYYY-MM-DD

## Contexto
...

## Decisão
...

## Consequências
- Positivas: ...
- Negativas/riscos: ...
```
