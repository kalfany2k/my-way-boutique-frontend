interface Category {
  name: string;
  path: string;
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
        name: "Trusouri fete",
        path: "/produse/trusouri?gender=fete&categories=botez",
      },
      {
        name: "Trusouri baieti",
        path: "/produse/trusouri?gender=baieti&categories=botez",
      },
      { name: "Trusouri complete", path: "/produse/trusouri" },
      { name: "Trusouri economice", path: "/produse/trusouri" },
      {
        name: "Trusouri personalizate",
        path: "/produse/trusouri",
      },
      { name: "Lumanari", path: "/produse/lumanari?categories=botez" },
      { name: "Cutii", path: "/produse/cutii?categories=botez" },
      { name: "Accesorii", path: "/produse/accesorii?categories=botez" },
      { name: "Cadouri", path: "/produse/cadouri?categories=botez" },
    ],
  },
  {
    name: "Prima baie",
    path: "/categorii/prima_baie",
    subcategories: [
      { name: "Set produse prima baie", path: "/seturi/prima_baie" },
      { name: "Haine", path: "/produse/haine?categories=prima_baie" },
      { name: "Accesorii", path: "/produse/accesorii?categories=prima_baie" },
      { name: "Cadouri", path: "/produse/cadouri?categories=prima_baie" },
    ],
  },
  {
    name: "Prima aniversare",
    path: "/categorii/prima_aniversare",
    subcategories: [
      { name: "Baietei", path: "/categorii/prima_aniversare?gender=baieti" },
      { name: "Fetite", path: "/categorii/prima_aniversare?gender=fete" },
      { name: "Set mot", path: "/seturi/mot" },
      { name: "Set turta", path: "/seturi/turta" },
      {
        name: "Tricouri",
        path: "/produse/tricouri?categories=prima_aniversare",
      },
      { name: "Tavite", path: "/produse/tavite?categories=prima_aniversare" },
      { name: "Hainute", path: "/produse/haine?categories=prima_aniversare" },
      {
        name: "Cadouri nasi",
        path: "/produse/cadouri?categories=prima_aniversare",
      },
      {
        name: "Cadouri bebelusi",
        path: "/produse/cadouri?categories=prima_aniversare",
      },
    ],
  },
  {
    name: "Tricouri",
    path: "/produse/tricouri",
    subcategories: [
      {
        name: "Seturi aniversare un an",
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
    name: "Prosoape",
    path: "/produse/prosoape",
    subcategories: [
      { name: "Brodate", path: "/produse/prosoape?categories=brodate" },
      { name: "Imprimate", path: "/produse/prosoape?categories=imprimate" },
      { name: "Botez", path: "/produse/prosoape?categories=botez" },
      { name: "Prima baita", path: "/produse/prosoape?categories=prima_baie" },
      {
        name: "Prima aniversare",
        path: "/produse/prosoape?categories=prima_aniversare",
      },
      { name: "Craciun", path: "/produse/prosoape?categories=craciun" },
      { name: "Paste", path: "/produse/prosoape?categories=paste" },
    ],
  },
  {
    name: "Cadouri",
    path: "/produse/cadouri",
    subcategories: [
      { name: "Botez", path: "/produse/cadouri?categories=botez" },
      {
        name: "Prima aniversare",
        path: "/produse/cadouri?categories=prima_aniversare",
      },
      { name: "Craciun", path: "/produse/cadouri?categories=craciun" },
      { name: "Paste", path: "/produse/cadouri?categories=paste" },
    ],
  },
  {
    name: "Sarbatori",
    path: "/categorii",
    subcategories: [
      { name: "Craciun", path: "/categorii/craciun" },
      { name: "Paste", path: "/categorii/paste" },
    ],
  },
];
