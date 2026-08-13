import { fipe } from "@/lib/fipe";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ marca: string }> },
) {
  const { marca } = await params;
  try {
    return Response.json(await fipe.modelos(marca));
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Erro ao buscar modelos" },
      { status: 502 },
    );
  }
}
