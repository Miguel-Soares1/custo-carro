/** Gera um slug amigável para URLs a partir de um texto. */
export function slugify(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const brlInt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** Formata um número como moeda brasileira (ex.: R$ 1.234,56). */
export function formatarBRL(valor: number): string {
  return brl.format(valor);
}

/** Formata um número como moeda brasileira sem centavos (ex.: R$ 1.235). */
export function formatarBRLInt(valor: number): string {
  return brlInt.format(valor);
}

/** Formata um número com até 1 casa decimal no padrão brasileiro. */
export function formatarNumero(valor: number): string {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(valor);
}
