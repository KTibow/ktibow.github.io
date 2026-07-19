/**
 * Module-level in-memory caches that persist during a build or SSR render.
 * Prevents redundant fetches when multiple _Offer components refer to the
 * same offer UUID or seller profile.
 */

const offerDetailCache = new Map<string, any>();
const profileCache = new Map<string, any>();

export function getCachedOfferDetail(uuid: string): any | undefined {
  return offerDetailCache.get(uuid);
}

export function setCachedOfferDetail(uuid: string, data: any): void {
  offerDetailCache.set(uuid, data);
}

export function getCachedProfile(username: string): any | undefined {
  return profileCache.get(username);
}

export function setCachedProfile(username: string, data: any): void {
  profileCache.set(username, data);
}
