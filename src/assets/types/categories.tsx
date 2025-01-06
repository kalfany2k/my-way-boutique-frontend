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
    description:
      "Descopera colectia noastra completa pentru botez, de la trusouri elegante si lumanari personalizate, pana la accesorii si cadouri deosebite. Cream cu pasiune pentru momentele care conteaza.",
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
    description:
      "Primul ritual de ingrijire al bebelusului merita cele mai delicate si sigure produse. Seturile noastre pentru prima baie sunt create special pentru a face aceasta experienta memorabila si confortabila.",
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
    description:
      "Sarbatoreste primul an al micutului tau cu produse create special pentru acest moment unic. De la seturile traditionale pentru mot si turta, pana la tinute personalizate si decoratiuni festive.",
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
    description:
      "Tricouri personalizate pentru toate ocaziile speciale din viata copilului tau. Fie ca este vorba de botez, prima aniversare sau sarbatori, cream piese unice care spun povestea voastra.",
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
    description:
      "Prosoape delicate pentru pielea sensibila a celor mici, disponibile brodate sau imprimate pentru orice ocazie. Personalizam fiecare piesa pentru a crea cadouri cu insemnatate deosebita.",
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
    description:
      "Surprinde-i pe cei dragi cu cadouri atent selectionate si personalizate. Pentru botez, aniversari sau sarbatori, fiecare dar este creat sa aduca zambete si sa pastreze amintiri pretioase.",
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
    description:
      "Celebreaza magia Craciunului si frumusetea Pastelui cu colectiile noastre speciale de sezon. Creatii unice care aduc spiritul sarbatorilor in casa si in inima ta.",
    subcategories: [
      { name: "Craciun", path: "/categorii/craciun" },
      { name: "Paste", path: "/categorii/paste" },
    ],
  },
];
