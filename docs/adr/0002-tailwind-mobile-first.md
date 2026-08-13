# ADR-0002: Tailwind CSS v4, mobile-first, sem kit de UI

- Status: aceito
- Data: 2026-08-12

## Contexto

O design precisa ser limpo, responsivo (mobile-first) e de rápida iteração.
Não há necessidade de componentes complexos (apenas formulários, listas e
barras de progresso).

## Decisão

Usar **Tailwind CSS v4** (configuração via CSS com `@theme`) e **nenhum kit de
UI** (sem shadcn/ui, MUI etc.):

- Tema customizado mínimo em `app/globals.css` (cores `brand-*` e fonte do
  sistema).
- Layout mobile-first: conteúdo em uma coluna e grades `sm:`/`lg:`.
- Componentes presentacionais simples em `components/`.

## Consequências

- **Positivas**: bundle de CSS pequeno, sem dependências extras, total controle
  visual, iteração rápida.
- **Negativas/riscos**: acessibilidade e padrões de componentes ficam sob nossa
  responsabilidade; se o produto crescer muito, pode valer migrar para um kit.
