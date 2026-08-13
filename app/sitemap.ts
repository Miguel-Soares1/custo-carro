import type { MetadataRoute } from "next";
import { veiculos } from "@/data/veiculos";
import { URL_SITE } from "@/lib/constantes";
import { slugify } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotasModelos = veiculos.map((v) => ({
    url: `${URL_SITE}/quanto-custa-manter/${slugify(v.marca)}/${slugify(v.modelo)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${URL_SITE}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...rotasModelos,
  ];
}
