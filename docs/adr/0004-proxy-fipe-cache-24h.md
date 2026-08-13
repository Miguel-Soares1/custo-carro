# ADR-0004: Proxy FIPE em `/api/fipe/*` com cache de 24h

- Status: aceito
- Data: 2026-08-12

## Contexto

A home precisa de uma seleção em cascata marca → modelo → ano usando a tabela
FIPE. A API pública (`parallelum.com.br/fipe/api/v1/carros`) não deve ser
chamada diretamente pelo navegador (CORS, falta de controle de erro, acoplamento
e exposição de chave/host), e seus dados mudam pouco ao longo do dia.

## Decisão

Criar um **proxy server-side** em `app/api/fipe/*`:

- Rotas: `marcas`, `marcas/[marca]/modelos`, `.../anos`, `.../anos/[ano]`.
- O cliente (`lib/fipe.ts`) usa `fetch(..., { next: { revalidate: 86400 } })`,
  ou seja, **cache de 24 horas** no Data Cache do Next.
- Erros retornam `502` com um JSON `{ error }` amigável.
- A base da API é configurável via `FIPE_BASE_URL`.

## Consequências

- **Positivas**: controla CORS/erros, reduz chamadas à API de terceiros
  (cache), isola o cliente de mudanças na FIPE e centraliza a integração.
- **Negativas/riscos**: a API pública da FIPE é não-oficial e pode mudar/quebrar
  sem aviso; se isso ocorrer, basta trocar a implementação de `lib/fipe.ts` ou o
  `FIPE_BASE_URL`. O cache de 24h pode servir preço levemente defasado — aceitável
  para o MVP.
