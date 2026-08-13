import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { NOME_SITE, URL_SITE } from "@/lib/constantes";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: "Custo do Carro — Quanto custa manter um carro no Brasil?",
  description:
    "Descubra o custo real mensal de manter qualquer carro no Brasil: IPVA, seguro, combustível, depreciação, manutenção e mais. Calcule e personalize.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 py-3">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              {NOME_SITE}
            </Link>
            <span className="text-sm text-slate-500">
              Custo real de manter um carro
            </span>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-4xl px-4 py-6 text-sm text-slate-500">
            <p>
              Os valores são estimativas baseadas em médias nacionais e não
              substituem um orçamento real de seguro, IPVA ou manutenção.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
