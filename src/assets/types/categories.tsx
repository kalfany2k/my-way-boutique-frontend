interface Category {
  name: string;
  path: string;
  description?: string;
  subcategories: SubCategory[];
}

interface SubCategory {
  name: string;
  path: string;
}

export const categories: Category[] = [
  { name: "Acasa", path: "/", subcategories: [] },
  {
    name: "Botez",
    path: "/categorii/botez",
    subcategories: [
      {
        name: "Trusouri",
        path: "/produse/trusouri?categories=botez",
      },
      { name: "Lumanari", path: "/produse/lumanari?categories=botez" },
      { name: "Cutii", path: "/produse/cutii?categories=botez" },
      { name: "Prima baita", path: "/categories=prima_baie" },
      { name: "Accesorii", path: "/produse/accesorii?categories=botez" },
      { name: "Cadouri", path: "/produse/cadouri?categories=botez" },
    ],
  },
  {
    name: "Prima aniversare",
    path: "/categorii/prima_aniversare",
    subcategories: [
      { name: "Set Prima Aniversare", path: "/seturi/prima_aniversare" },
      { name: "Tavite", path: "/produse/tavite?categories=prima_aniversare" },
      {
        name: "Tricouri",
        path: "/produse/tricouri?categories=prima_aniversare",
      },
      { name: "Hainute", path: "/produse/haine?categories=prima_aniversare" },
      { name: "Cadouri", path: "/produse/cadouri?categories=prima_baie" },
    ],
  },
  {
    name: "Tricouri",
    path: "/produse/tricouri",
    subcategories: [
      {
        name: "Seturi aniversare 1 an",
        path: "/produse/tricouri?categories=prima_aniversare",
      },
      {
        name: "Seturi aniversare 2-10 ani",
        path: "/produse/tricouri?categories=aniversare",
      },
      { name: "Botez", path: "/produse/tricouri?categories=botez" },
      { name: "Craciun", path: "/produse/tricouri?categories=craciun" },
      { name: "Paste", path: "/produse/tricouri?categories=paste" },
    ],
  },
  {
    name: "Cadouri",
    path: "/produse/cadouri",
    description:
      "Prosoape delicate pentru pielea sensibila a celor mici, disponibile brodate sau imprimate pentru orice ocazie. Personalizam fiecare piesa pentru a crea cadouri cu insemnatate deosebita.",
    subcategories: [
      { name: "Botez", path: "/produse/cadouri?categories=botez" },
      { name: "Prima baita", path: "/produse/cadouri?categories=prima_baie" },
      {
        name: "Prima aniversare",
        path: "/produse/cadouri?categories=prima_aniversare",
      },
      { name: "Craciun", path: "/produse/cadouri?categories=craciun" },
      { name: "Paste", path: "/produse/cadouri?categories=paste" },
    ],
  },
];
