export const sportCategories = [
  {
    label: "Ski",
    value: "SKI",
  },
  {
    label: "Snowboard",
    value: "SNOWBOARD",
  },
  {
    label: "Kitesurf",
    value: "KITESURF",
  },
  {
    label: "Windsurf",
    value: "WINDSURF",
  },
  {
    label: "Surf",
    value: "SURF",
  },
  {
    label: "Mountain Biking",
    value: "MTB",
  },
  {
    label: "BMX",
    value: "BMX",
  },
  {
    label: "Skate",
    value: "SKATE",
  },
  {
    label: "Climbing",
    value: "CLIMBING",
  },
  {
    label: "Hiking",
    value: "HIKING",
  },
  {
    label: "Canyoning",
    value: "CANYONING",
  },
  {
    label: "Paragliding",
    value: "PARAGLIDING",
  },
  {
    label: "Wingsuit",
    value: "WINGSUIT",
  },
  {
    label: "Skydiving",
    value: "SKYDIVING",
  },
] as const;

export type SportCategoriesFull = (typeof sportCategories)[number]["value"];
