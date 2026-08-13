import { fipe } from "@/lib/fipe";

export async function GET() {
  try {
    return Response.json(await fipe.marcas());
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Erro ao buscar marcas" },
      { status: 502 },
    );
  }
}
