# ADR-0003: Dados estáticos hardcoded (sem banco de dados) no MVP

- Status: aceito
- Data: 2026-08-12

## Contexto

O MVP precisa listar os ~100 modelos mais populares do Brasil (marca, modelo,
categoria, consumo, seguro médio e preço FIPE de referência), mas não há
necessidade de persistência nem de um backend de escrita.

## Decisão

Manter tudo em um **array TypeScript hardcoded** (`data/veiculos.ts`):

- Cada entrada é um objeto `Veiculo` tipado (`lib/tipos.ts`).
- A lista é curada manualmente e versionada no repositório.
- Sem banco de dados, sem ORM, sem camada de persistência.

## Consequências

- **Positivas**: zero infraestrutura, fácil de revisar/testar, build 100%
  determinístico e rápido.
- **Negativas/riscos**: a lista fica desatualizada e precisa de manutenção
  manual; adicionar/remover modelos exige mudança de código. A evolução natural
  é migrar para um CMS ou banco + ingestão automática da FIPE (ver roadmap).
