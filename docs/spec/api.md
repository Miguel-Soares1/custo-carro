# API FIPE (proxy `/api/fipe/*`)

O site não chama a FIPE diretamente do navegador. Um proxy server-side em
`app/api/fipe/*` encapsula a API pública e aplica cache de 24 horas.

## Base

```
https://parallelum.com.br/fipe/api/v1/carros
```

Configurável via `FIPE_BASE_URL` (ver `.env.example`).

## Endpoints do proxy

| Método | Rota                                              | Retorno                          |
| ------ | ------------------------------------------------- | -------------------------------- |
| GET    | `/api/fipe/marcas`                                | `FipeMarca[]`                    |
| GET    | `/api/fipe/marcas/{marca}/modelos`                | `{ modelos: FipeModelo[] }`      |
| GET    | `/api/fipe/marcas/{marca}/modelos/{modelo}/anos`  | `FipeAno[]`                      |
| GET    | `/api/fipe/marcas/{marca}/modelos/{modelo}/anos/{ano}` | `FipeDetalhe`              |

Os segmentos `{marca}`, `{modelo}` e `{ano}` são os **códigos** da FIPE
(numéricos para marca/modelo; o ano é como `"2025-5"`).

## Tipos (resumo)

```ts
interface FipeMarca   { codigo: string; nome: string }
interface FipeModelo  { codigo: number; nome: string }
interface FipeAno     { codigo: string; nome: string }

interface FipeDetalhe {
  TipoVeiculo: number;
  Valor: string;          // ex.: "R$ 92.029,00"
  Marca: string;
  Modelo: string;         // ex.: "ARGO 1.0 6V Flex"
  AnoModelo: number;      // 32000 = zero-km
  Combustivel: string;
  CodigoFipe: string;
  MesReferencia: string;  // ex.: "agosto de 2026"
  SiglaCombustivel: string;
}
```

## Cache

Cada resposta usa `fetch(url, { next: { revalidate: 86400 } })` → **24 horas**
no Data Cache do Next.

## Erros

Em caso de falha, retorna `502` com:

```json
{ "error": "mensagem descritiva" }
```

## Observações

- A API `parallelum` é **não-oficial** e pode mudar sem aviso. A integração
  está isolada em `lib/fipe.ts`, então uma troca de provedor afeta apenas esse
  arquivo.
- A seleção da home usa o nome de marca/modelo retornado pela FIPE para tentar
  casar com um modelo estático (via slug) e redirecionar para a página do site.
