import { fipe } from "@/lib/fipe";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ marca: string; modelo: string }> },
) {
  const { marca, modelo } = await params;
  try {
    return Response.json(await fipe.anos(marca, modelo));
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Erro ao buscar anos" },
      { status: 502 },
    );
  }
}
