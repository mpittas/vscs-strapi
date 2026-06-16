import { unstable_cache } from "next/cache";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

async function fetchCoordinates(
  location: string,
): Promise<[number, number] | null> {
  if (!MAPBOX_TOKEN || !location.trim()) return null;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location.trim(),
  )}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    const center = data.features?.[0]?.center as [number, number] | undefined;
    if (!center || center.length < 2) return null;

    return [center[0], center[1]];
  } catch {
    return null;
  }
}

/**
 * Resolve [lng, lat] for a location label via Mapbox Geocoding (cached 24h).
 */
export async function geocodeLocation(
  location: string,
): Promise<[number, number] | null> {
  const normalized = location.trim().toLowerCase();
  if (!normalized) return null;

  return unstable_cache(
    () => fetchCoordinates(location),
    ["mapbox-geocode", normalized],
    { revalidate: 86400 },
  )();
}

export type MapCoordinates = [number, number];

export async function resolveProjectCoordinates(project: {
  location: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
}): Promise<MapCoordinates | null> {
  const lat = parseCoordinate(project.latitude);
  const lng = parseCoordinate(project.longitude);

  if (lat != null && lng != null) {
    return [lng, lat];
  }

  return geocodeLocation(project.location);
}

function parseCoordinate(value: number | string | null | undefined) {
  if (value == null || value === "") return null;
  const num = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(num) ? num : null;
}
