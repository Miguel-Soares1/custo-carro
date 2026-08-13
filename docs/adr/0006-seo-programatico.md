# ADR-0006: SEO programático (metadata, JSON-LD, sitemap, robots)

- Status: aceito
- Data: 2026-08-12

## Contexto

O foco do produto é SEO programático: cada página de modelo precisa de título e
description únicos com o valor calculado, dados estruturados e boa
descobribilidade pelos buscadores.

## Decisão

- **`generateMetadata`** dinâmico na página `[marca]/[modelo]`:
  título "Quanto custa manter um {Marca} {Modelo}? Custo real por mês" e
  description incluindo o valor mensal calculado, além de `canonical` e
  `openGraph`.
- **JSON-LD `FAQPage`** gerado por `lib/jsonld.ts` e injetado via
  `<script type="application/ld+json">`, respondendo "quanto custa manter um X".
- **`app/sitemap.ts`**: lista a home + todas as páginas de modelo.
- **`app/robots.ts`**: permite indexação e aponta para o sitemap.
- **`metadataBase`** no layout raiz resolve as URLs canônicas absolutas a partir
  de `URL_SITE`, que é resolvida automaticamente (NEXT_PUBLIC_SITE_URL →
  VERCEL_PROJECT_PRODUCTION_URL → VERCEL_URL → localhost).

## Consequências

- **Positivas**: páginas prontas para rich results (FAQ), canonicalização
  correta e sitemap automático de todos os modelos.
- **Negativas/riscos**: sem domínio configurado, usa a URL detectada da Vercel
  (ou `localhost` em dev). Para domínio próprio, defina `NEXT_PUBLIC_SITE_URL`.
