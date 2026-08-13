# ADR-0007: Exceções e isenções por idade do veículo

- Status: aceito
- Data: 2026-08-12

## Contexto

Carros antigos têm custos diferentes: em vários estados o IPVA é isento após
certa idade, a depreciação praticamente zera e o seguro obrigatório
(SPVAT/DPVAT) pode não incidir. O cálculo precisava refletir essas exceções.

## Decisão

- Idade de corte fixa de **15 anos** (`IDADE_ISENCAO`) para considerar o
  veículo "antigo".
- Veículos antigos ficam **isentos** de: IPVA, licenciamento, depreciação e
  seguro obrigatório (SPVAT/DPVAT).
- Além da regra automática, um **checkbox manual** ("meu carro é isento de
  IPVA") permite marcar isenção quando o estado do usuário tem outra regra.
- Adicionado o item "seguro obrigatório (SPVAT/DPVAT) anual" ao modelo de
  cálculo, com default `0` (atualmente suspenso no Brasil).
- A flag `isento` em `CategoriaCusto` permite ao breakdown exibir "Isento" em
  vez de simplesmente omitir o item.

## Consequências

- **Positivas**: cálculo mais realista para carros antigos; flexível (checkbox
  cobre regras estaduais divergentes); fácil de ajustar o limiar.
- **Negativas/riscos**: a regra real de isenção de IPVA varia por UF (RJ 15,
  SP 20, MG sem isenção por idade); a regra fixa de 15 anos é uma
  simplificação — o checkbox manual mitiga parte disso. Valores seguem
  documentados como estimativa.
