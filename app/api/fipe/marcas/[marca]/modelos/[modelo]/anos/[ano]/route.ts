import { fipe } from "@/lib/fipe";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ marca: string; modelo: string; ano: string }> },
) {
  const { marca, modelo, ano } = await params;
  try {
    return Response.json(await fipe.detalhe(marca, modelo, ano));
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Erro ao buscar detalhe" },
      { status: 502 },
    );
  }
}
