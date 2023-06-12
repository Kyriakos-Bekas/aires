import { locations, type LocationCode } from "~/data/locations";

export default function mapCodeToLocation(code: LocationCode) {
  const location = locations.find((location) => location.city_code === code);
  if (!location) {
    throw new Error(`Location with code ${code} not found`);
  }

  return location.name;
}
