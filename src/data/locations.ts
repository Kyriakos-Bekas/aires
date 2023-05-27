export const locations = [
  {
    name: "Albaquerque",
    code: "ABQ",
  },
  {
    name: "Athens (Greece)",
    code: "ATH",
  },
] as const;

export type LocationCode = (typeof locations)[number]["code"];
