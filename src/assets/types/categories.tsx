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
        path: "/produse/trusouri?gender=fete&category=botez",
      },
      {
        name: "Trusouri baieti",
        path: "/produse/trusouri?gender=baieti&category=botez",
      },
      { name: "Trusouri complete", path: "/produse/trusouri" },
      { name: "Trusouri economice", path: "/produse/trusouri" },
      {
        name: "Trusouri personalizate",
        path: "/produse/trusouri",
      },
      { name: "Lumanari", path: "/produse/lumanari?category=botez" },
      { name: "Cutii", path: "/produse/cutii?category=botez" },
      { name: "Accesorii", path: "/produse/accesorii?category=botez" },
      { name: "Cadouri", path: "/produse/cadouri?category=botez" },
    ],
  },
  {
    name: "Prima baie",
    path: "/categorii/prima_baie",
    subcategories: [
      { name: "Set produse prima baita", path: "/produse/prima_baie/set" },
      { name: "Haine", path: "/produse/haine?category=prima_baie" },
      { name: "Accesorii", path: "/produse/accesorii?category=prima_baie" },
      { name: "Cadouri", path: "/produse/cadouri?category=prima_baie" },
    ],
  },
  {
    name: "Prima aniversare",
    path: "/categorii/prima_aniversare",
    subcategories: [
      { name: "Baietei", path: "/categorii/prima_aniversare?gender=baieti" },
      { name: "Fetite", path: "/categorii/prima_aniversare?gender=fete" },
      { name: "Set mot", path: "/categorii/prima_aniversare/set_mot" },
      { name: "Set turta", path: "/categorii/prima_aniversare/set_turta" },
      { name: "Tricouri", path: "/produse/tricouri?category=prima_aniversare" },
      { name: "Tavite", path: "/produse/tavite?category=prima_aniversare" },
      { name: "Hainute", path: "/produse/haine?category=prima_aniversare" },
      {
        name: "Cadouri nasi",
        path: "/produse/cadouri?category=prima_aniversare",
      },
      {
        name: "Cadouri bebelusi",
        path: "/produse/cadouri?category=prima_aniversare",
      },
    ],
  },
  {
    name: "Tricouri",
    path: "/produse/tricouri",
    subcategories: [
      {
        name: "Seturi aniversare un an",
        path: "/produse/tricouri/aniversare_un_an",
      },
      {
        name: "Seturi aniversare 2_10 ani",
        path: "/produse/tricouri/aniversare_2_10_ani",
      },
      { name: "Botez", path: "/produse/tricouri?category=botez" },
      { name: "Craciun", path: "/produse/tricouri?category=craciun" },
      { name: "Paste", path: "/produse/tricouri?category=paste" },
    ],
  },
  {
    name: "Prosoape",
    path: "/produse/prosoape",
    subcategories: [
      { name: "Brodate", path: "/produse/prosoape?category=brodate" },
      { name: "Imprimate", path: "/produse/prosoape?category=imprimate" },
      { name: "Botez", path: "/produse/prosoape?category=botez" },
      { name: "Prima baita", path: "/produse/prosoape?category=prima_baie" },
      {
        name: "Prima aniversare",
        path: "/produse/prosoape?category=prima_aniversare",
      },
      { name: "Craciun", path: "/produse/prosoape?category=craciun" },
      { name: "Paste", path: "/produse/prosoape?category=paste" },
    ],
  },
  {
    name: "Cadouri",
    path: "/produse/cadouri",
    subcategories: [
      { name: "Botez", path: "/produse/cadouri?category=botez" },
      {
        name: "Prima aniversare",
        path: "/produse/cadouri?category=prima_aniversare",
      },
      { name: "Craciun", path: "/produse/cadouri?category=craciun" },
      { name: "Paste", path: "/produse/cadouri?category=paste" },
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
