import type { Veiculo } from "@/lib/tipos";
import { slugify } from "@/lib/utils";

/**
 * Lista manual (hardcoded) dos ~100 modelos mais populares do Brasil.
 *
 * Campos:
 * - marca/modelo: nomes de exibição (o slug da URL é derivado via slugify()).
 * - categoria: agrupa concorrentes diretos para "modelos relacionados".
 * - combustivel: flex | gasolina | etanol | diesel.
 * - consumoKmPorLitro: média combinada (flex = equivalente gasolina).
 * - seguroMedioAnual: estimativa anual de seguro, em R$.
 * - precoFipe: preço FIPE de referência usado no SSG (fallback), em R$.
 * - anoModelo: ano-modelo de referência para o cálculo de depreciação.
 *
 * Os valores são aproximações médias nacionais e devem ser revisados
 * periodicamente (ver docs/adr e docs/roadmap).
 */
export const veiculos: Veiculo[] = [
  // Fiat
  { marca: "Fiat", modelo: "Argo", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 3800, precoFipe: 85000, anoModelo: 2024 },
  { marca: "Fiat", modelo: "Mobi", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 14.5, seguroMedioAnual: 3200, precoFipe: 65000, anoModelo: 2024 },
  { marca: "Fiat", modelo: "Cronos", categoria: "Sedã Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 4000, precoFipe: 90000, anoModelo: 2024 },
  { marca: "Fiat", modelo: "Pulse", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.5, seguroMedioAnual: 4800, precoFipe: 105000, anoModelo: 2024 },
  { marca: "Fiat", modelo: "Fastback", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 5200, precoFipe: 130000, anoModelo: 2024 },
  { marca: "Fiat", modelo: "Strada", categoria: "Picape Compacta", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 4700, precoFipe: 110000, anoModelo: 2024 },
  { marca: "Fiat", modelo: "Toro", categoria: "Picape Média", combustivel: "flex", consumoKmPorLitro: 10.5, seguroMedioAnual: 5500, precoFipe: 160000, anoModelo: 2024 },
  { marca: "Fiat", modelo: "Titano", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 9.0, seguroMedioAnual: 6500, precoFipe: 240000, anoModelo: 2024 },
  { marca: "Fiat", modelo: "Fiorino", categoria: "Minivan", combustivel: "flex", consumoKmPorLitro: 11.0, seguroMedioAnual: 3600, precoFipe: 90000, anoModelo: 2023 },
  { marca: "Fiat", modelo: "Doblò", categoria: "Minivan", combustivel: "flex", consumoKmPorLitro: 10.5, seguroMedioAnual: 3800, precoFipe: 105000, anoModelo: 2022 },

  // Volkswagen
  { marca: "Volkswagen", modelo: "Polo", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.5, seguroMedioAnual: 4200, precoFipe: 95000, anoModelo: 2024 },
  { marca: "Volkswagen", modelo: "Virtus", categoria: "Sedã Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 4400, precoFipe: 105000, anoModelo: 2024 },
  { marca: "Volkswagen", modelo: "T-Cross", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.5, seguroMedioAnual: 5200, precoFipe: 120000, anoModelo: 2024 },
  { marca: "Volkswagen", modelo: "Nivus", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 5400, precoFipe: 125000, anoModelo: 2024 },
  { marca: "Volkswagen", modelo: "Saveiro", categoria: "Picape Compacta", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 4600, precoFipe: 100000, anoModelo: 2024 },
  { marca: "Volkswagen", modelo: "Taos", categoria: "SUV Médio", combustivel: "flex", consumoKmPorLitro: 11.5, seguroMedioAnual: 6000, precoFipe: 175000, anoModelo: 2024 },
  { marca: "Volkswagen", modelo: "Gol", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 3400, precoFipe: 70000, anoModelo: 2022 },
  { marca: "Volkswagen", modelo: "Jetta", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 12.0, seguroMedioAnual: 6500, precoFipe: 210000, anoModelo: 2024 },
  { marca: "Volkswagen", modelo: "Amarok", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 9.0, seguroMedioAnual: 7000, precoFipe: 280000, anoModelo: 2024 },
  { marca: "Volkswagen", modelo: "Tiguan", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 7000, precoFipe: 260000, anoModelo: 2023 },

  // Chevrolet
  { marca: "Chevrolet", modelo: "Onix", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.5, seguroMedioAnual: 4100, precoFipe: 82000, anoModelo: 2024 },
  { marca: "Chevrolet", modelo: "Onix Plus", categoria: "Sedã Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 4400, precoFipe: 90000, anoModelo: 2024 },
  { marca: "Chevrolet", modelo: "Tracker", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 11.5, seguroMedioAnual: 5200, precoFipe: 115000, anoModelo: 2024 },
  { marca: "Chevrolet", modelo: "Spin", categoria: "Minivan", combustivel: "flex", consumoKmPorLitro: 10.5, seguroMedioAnual: 4200, precoFipe: 105000, anoModelo: 2024 },
  { marca: "Chevrolet", modelo: "S10", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 9.5, seguroMedioAnual: 6500, precoFipe: 250000, anoModelo: 2024 },
  { marca: "Chevrolet", modelo: "Cruze", categoria: "Sedã Médio", combustivel: "flex", consumoKmPorLitro: 11.0, seguroMedioAnual: 5500, precoFipe: 140000, anoModelo: 2023 },
  { marca: "Chevrolet", modelo: "Equinox", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.0, seguroMedioAnual: 6200, precoFipe: 220000, anoModelo: 2024 },
  { marca: "Chevrolet", modelo: "Montana", categoria: "Picape Compacta", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 5000, precoFipe: 125000, anoModelo: 2024 },
  { marca: "Chevrolet", modelo: "Silverado", categoria: "Picape Grande", combustivel: "diesel", consumoKmPorLitro: 7.5, seguroMedioAnual: 9500, precoFipe: 420000, anoModelo: 2024 },

  // Hyundai
  { marca: "Hyundai", modelo: "HB20", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.5, seguroMedioAnual: 4200, precoFipe: 85000, anoModelo: 2024 },
  { marca: "Hyundai", modelo: "HB20S", categoria: "Sedã Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 4400, precoFipe: 92000, anoModelo: 2024 },
  { marca: "Hyundai", modelo: "Creta", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 5200, precoFipe: 125000, anoModelo: 2024 },
  { marca: "Hyundai", modelo: "Tucson", categoria: "SUV Médio", combustivel: "flex", consumoKmPorLitro: 11.5, seguroMedioAnual: 6200, precoFipe: 185000, anoModelo: 2023 },
  { marca: "Hyundai", modelo: "HR", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 12.0, seguroMedioAnual: 7000, precoFipe: 220000, anoModelo: 2024 },
  { marca: "Hyundai", modelo: "Elantra", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 12.0, seguroMedioAnual: 6500, precoFipe: 200000, anoModelo: 2023 },

  // Toyota
  { marca: "Toyota", modelo: "Corolla", categoria: "Sedã Médio", combustivel: "flex", consumoKmPorLitro: 12.5, seguroMedioAnual: 6200, precoFipe: 155000, anoModelo: 2024 },
  { marca: "Toyota", modelo: "Corolla Cross", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 6000, precoFipe: 165000, anoModelo: 2024 },
  { marca: "Toyota", modelo: "Hilux", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 9.5, seguroMedioAnual: 7500, precoFipe: 300000, anoModelo: 2024 },
  { marca: "Toyota", modelo: "Yaris", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 14.0, seguroMedioAnual: 4200, precoFipe: 90000, anoModelo: 2024 },
  { marca: "Toyota", modelo: "Yaris Sedan", categoria: "Sedã Compacto", combustivel: "flex", consumoKmPorLitro: 14.0, seguroMedioAnual: 4300, precoFipe: 95000, anoModelo: 2024 },
  { marca: "Toyota", modelo: "SW4", categoria: "SUV Médio", combustivel: "diesel", consumoKmPorLitro: 9.0, seguroMedioAnual: 8500, precoFipe: 380000, anoModelo: 2024 },
  { marca: "Toyota", modelo: "Etios", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 14.0, seguroMedioAnual: 3600, precoFipe: 72000, anoModelo: 2022 },
  { marca: "Toyota", modelo: "RAV4", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 11.0, seguroMedioAnual: 7500, precoFipe: 280000, anoModelo: 2024 },

  // Honda
  { marca: "Honda", modelo: "Civic", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 12.5, seguroMedioAnual: 6800, precoFipe: 220000, anoModelo: 2024 },
  { marca: "Honda", modelo: "City", categoria: "Sedã Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 4800, precoFipe: 110000, anoModelo: 2024 },
  { marca: "Honda", modelo: "City Hatchback", categoria: "Hatch Médio", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 4800, precoFipe: 108000, anoModelo: 2024 },
  { marca: "Honda", modelo: "HR-V", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 5800, precoFipe: 145000, anoModelo: 2024 },
  { marca: "Honda", modelo: "Fit", categoria: "Hatch Médio", combustivel: "flex", consumoKmPorLitro: 13.5, seguroMedioAnual: 4400, precoFipe: 90000, anoModelo: 2021 },
  { marca: "Honda", modelo: "CR-V", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 11.0, seguroMedioAnual: 7200, precoFipe: 250000, anoModelo: 2024 },
  { marca: "Honda", modelo: "ZR-V", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 12.0, seguroMedioAnual: 6500, precoFipe: 230000, anoModelo: 2024 },

  // Jeep
  { marca: "Jeep", modelo: "Renegade", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 11.0, seguroMedioAnual: 5500, precoFipe: 120000, anoModelo: 2024 },
  { marca: "Jeep", modelo: "Compass", categoria: "SUV Médio", combustivel: "flex", consumoKmPorLitro: 11.0, seguroMedioAnual: 6500, precoFipe: 160000, anoModelo: 2024 },
  { marca: "Jeep", modelo: "Commander", categoria: "SUV Médio", combustivel: "flex", consumoKmPorLitro: 10.0, seguroMedioAnual: 7200, precoFipe: 210000, anoModelo: 2024 },
  { marca: "Jeep", modelo: "Gladiator", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 8.5, seguroMedioAnual: 9000, precoFipe: 400000, anoModelo: 2024 },
  { marca: "Jeep", modelo: "Wrangler", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 8.0, seguroMedioAnual: 9500, precoFipe: 450000, anoModelo: 2024 },
  { marca: "Jeep", modelo: "Cherokee", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.0, seguroMedioAnual: 7000, precoFipe: 240000, anoModelo: 2023 },

  // Renault
  { marca: "Renault", modelo: "Kwid", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 14.0, seguroMedioAnual: 3000, precoFipe: 60000, anoModelo: 2024 },
  { marca: "Renault", modelo: "Sandero", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 3600, precoFipe: 76000, anoModelo: 2023 },
  { marca: "Renault", modelo: "Logan", categoria: "Sedã Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 3700, precoFipe: 79000, anoModelo: 2023 },
  { marca: "Renault", modelo: "Duster", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 11.5, seguroMedioAnual: 5200, precoFipe: 120000, anoModelo: 2024 },
  { marca: "Renault", modelo: "Captur", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 11.5, seguroMedioAnual: 5400, precoFipe: 128000, anoModelo: 2023 },
  { marca: "Renault", modelo: "Oroch", categoria: "Picape Compacta", combustivel: "flex", consumoKmPorLitro: 11.5, seguroMedioAnual: 5200, precoFipe: 130000, anoModelo: 2024 },

  // Nissan
  { marca: "Nissan", modelo: "Kicks", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.5, seguroMedioAnual: 5200, precoFipe: 125000, anoModelo: 2024 },
  { marca: "Nissan", modelo: "Versa", categoria: "Sedã Compacto", combustivel: "flex", consumoKmPorLitro: 13.5, seguroMedioAnual: 4300, precoFipe: 98000, anoModelo: 2024 },
  { marca: "Nissan", modelo: "Sentra", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 12.0, seguroMedioAnual: 6200, precoFipe: 180000, anoModelo: 2024 },
  { marca: "Nissan", modelo: "Frontier", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 9.5, seguroMedioAnual: 6800, precoFipe: 260000, anoModelo: 2024 },
  { marca: "Nissan", modelo: "March", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.5, seguroMedioAnual: 3400, precoFipe: 68000, anoModelo: 2021 },

  // Ford
  { marca: "Ford", modelo: "Ranger", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 9.5, seguroMedioAnual: 7200, precoFipe: 290000, anoModelo: 2024 },
  { marca: "Ford", modelo: "Territory", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 6800, precoFipe: 210000, anoModelo: 2024 },
  { marca: "Ford", modelo: "Bronco", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 8.5, seguroMedioAnual: 9000, precoFipe: 400000, anoModelo: 2024 },
  { marca: "Ford", modelo: "Maverick", categoria: "Picape Média", combustivel: "gasolina", consumoKmPorLitro: 10.0, seguroMedioAnual: 6500, precoFipe: 220000, anoModelo: 2024 },
  { marca: "Ford", modelo: "EcoSport", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 11.0, seguroMedioAnual: 4400, precoFipe: 90000, anoModelo: 2022 },
  { marca: "Ford", modelo: "Ka", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.0, seguroMedioAnual: 3200, precoFipe: 60000, anoModelo: 2021 },

  // Peugeot
  { marca: "Peugeot", modelo: "208", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.5, seguroMedioAnual: 4000, precoFipe: 82000, anoModelo: 2024 },
  { marca: "Peugeot", modelo: "2008", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 5000, precoFipe: 110000, anoModelo: 2024 },
  { marca: "Peugeot", modelo: "3008", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 6200, precoFipe: 190000, anoModelo: 2024 },
  { marca: "Peugeot", modelo: "308", categoria: "Hatch Médio", combustivel: "gasolina", consumoKmPorLitro: 12.0, seguroMedioAnual: 5200, precoFipe: 140000, anoModelo: 2023 },

  // Citroën
  { marca: "Citroën", modelo: "C3", categoria: "Hatch Compacto", combustivel: "flex", consumoKmPorLitro: 13.5, seguroMedioAnual: 3800, precoFipe: 78000, anoModelo: 2024 },
  { marca: "Citroën", modelo: "C4 Cactus", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 11.5, seguroMedioAnual: 4600, precoFipe: 100000, anoModelo: 2023 },
  { marca: "Citroën", modelo: "Aircross", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 4900, precoFipe: 105000, anoModelo: 2024 },
  { marca: "Citroën", modelo: "Basalt", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.5, seguroMedioAnual: 5000, precoFipe: 112000, anoModelo: 2025 },

  // Caoa Chery
  { marca: "Caoa Chery", modelo: "Tiggo 5X", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 11.0, seguroMedioAnual: 4800, precoFipe: 115000, anoModelo: 2024 },
  { marca: "Caoa Chery", modelo: "Tiggo 7", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 5600, precoFipe: 160000, anoModelo: 2024 },
  { marca: "Caoa Chery", modelo: "Tiggo 8", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.0, seguroMedioAnual: 6000, precoFipe: 190000, anoModelo: 2024 },

  // Mitsubishi
  { marca: "Mitsubishi", modelo: "L200 Triton", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 9.0, seguroMedioAnual: 6800, precoFipe: 250000, anoModelo: 2024 },
  { marca: "Mitsubishi", modelo: "Eclipse Cross", categoria: "SUV Compacto", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 5600, precoFipe: 150000, anoModelo: 2024 },
  { marca: "Mitsubishi", modelo: "Outlander", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.0, seguroMedioAnual: 6500, precoFipe: 220000, anoModelo: 2023 },
  { marca: "Mitsubishi", modelo: "Pajero Sport", categoria: "SUV Médio", combustivel: "diesel", consumoKmPorLitro: 9.0, seguroMedioAnual: 7500, precoFipe: 320000, anoModelo: 2024 },

  // Kia
  { marca: "Kia", modelo: "Sportage", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 6000, precoFipe: 200000, anoModelo: 2024 },
  { marca: "Kia", modelo: "Sorento", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.0, seguroMedioAnual: 6800, precoFipe: 260000, anoModelo: 2024 },
  { marca: "Kia", modelo: "Cerato", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 12.0, seguroMedioAnual: 5800, precoFipe: 150000, anoModelo: 2023 },

  // RAM
  { marca: "Ram", modelo: "Rampage", categoria: "Picape Média", combustivel: "diesel", consumoKmPorLitro: 9.0, seguroMedioAnual: 8000, precoFipe: 300000, anoModelo: 2024 },
  { marca: "Ram", modelo: "1500", categoria: "Picape Grande", combustivel: "diesel", consumoKmPorLitro: 7.0, seguroMedioAnual: 11000, precoFipe: 500000, anoModelo: 2024 },

  // BMW
  { marca: "BMW", modelo: "320i", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 11.0, seguroMedioAnual: 9000, precoFipe: 320000, anoModelo: 2024 },
  { marca: "BMW", modelo: "X1", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 9500, precoFipe: 300000, anoModelo: 2024 },

  // Mercedes-Benz
  { marca: "Mercedes-Benz", modelo: "C200", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 11.0, seguroMedioAnual: 9500, precoFipe: 350000, anoModelo: 2024 },
  { marca: "Mercedes-Benz", modelo: "GLA", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 9500, precoFipe: 330000, anoModelo: 2024 },

  // Audi
  { marca: "Audi", modelo: "A3", categoria: "Sedã Médio", combustivel: "gasolina", consumoKmPorLitro: 11.5, seguroMedioAnual: 9000, precoFipe: 290000, anoModelo: 2024 },
  { marca: "Audi", modelo: "Q3", categoria: "SUV Médio", combustivel: "gasolina", consumoKmPorLitro: 10.5, seguroMedioAnual: 9500, precoFipe: 310000, anoModelo: 2024 },

  // Jeep (novos)
  { marca: "Jeep", modelo: "Avenger", categoria: "SUV Compacto", combustivel: "flex", consumoKmPorLitro: 12.0, seguroMedioAnual: 5200, precoFipe: 120000, anoModelo: 2025 },
];

/** Lista de categorias presentes, em ordem alfabética. */
export const categorias = [...new Set(veiculos.map((v) => v.categoria))].sort();

export interface ModeloEstaticoResumo {
  marca: string;
  modelo: string;
  marcaSlug: string;
  modeloSlug: string;
}

/** Resumo serializável dos modelos estáticos (para o seletor da home). */
export const modelosEstaticos: ModeloEstaticoResumo[] = veiculos.map((v) => ({
  marca: v.marca,
  modelo: v.modelo,
  marcaSlug: slugify(v.marca),
  modeloSlug: slugify(v.modelo),
}));

export function buscarVeiculo(
  marcaSlug: string,
  modeloSlug: string,
): Veiculo | undefined {
  return veiculos.find(
    (v) => slugify(v.marca) === marcaSlug && slugify(v.modelo) === modeloSlug,
  );
}

/**
 * Retorna modelos relacionados (mesma categoria e, se necessário, mesma marca).
 */
export function modelosRelacionados(
  veiculo: Veiculo,
  quantidade = 4,
): Veiculo[] {
  const mesmaCategoria = veiculos.filter(
    (v) =>
      v.categoria === veiculo.categoria &&
      !(v.marca === veiculo.marca && v.modelo === veiculo.modelo),
  );
  const mesmaMarca = veiculos.filter(
    (v) =>
      v.marca === veiculo.marca &&
      v.categoria !== veiculo.categoria &&
      !(v.modelo === veiculo.modelo),
  );
  return [...mesmaCategoria, ...mesmaMarca].slice(0, quantidade);
}
