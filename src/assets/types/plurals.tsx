export const pluralToSingular: Record<string, string> = {
  trusouri: "trusou",
  lumanari: "lumanare",
  cutii: "cutie",
  accesorii: "accesoriu",
  cadouri: "cadou",
  tricouri: "tricou",
  tavite: "tava",
  haine: "haina",
  prosoape: "prosop",
  perii: "perie",
  oglinzi: "oglinda",
} as const;

export const singularToPlural: Record<string, string> = Object.entries(
  pluralToSingular,
).reduce(
  (acc, [plural, singular]) => ({
    ...acc,
    [singular]: plural,
  }),
  {},
);
