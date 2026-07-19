/**
 * Extra-conservative filter for physical-card / cash-only offers.
 *
 * We only exclude an offer when the trading_conditions very clearly state
 * that this specific offer is for physical cards (not digital codes) or
 * for cash only.  Ambiguous / dual-offer text (e.g. "physical cards and
 * codes") is kept – only explicit "this offer is for physical" language
 * triggers exclusion.
 *
 * Returns `true` when the offer should be hidden.
 */

const EXCLUDE_PATTERNS = [
  // "Offer is for physical card with cash and activation receipts"
  // "Ad is for physical with cash and activation receipt only"
  /\b(?:offer|ad)\s+is\s+for\s+physical\b/i,

  // "Physical card only" / "Physical only"
  /\bphysical\s+(?:card\s+)?only\b/i,
  /\bphysical with cash and activation receipts only\b/i,

  // "Cash only"
  /\bcash\s+only\b/i,

  // "Cash receipt only" / "Cash receipts only" / "Cash and receipt only"
  // Seller wants physical cards with cash-register receipts (not digital codes).
  /\bcash\s+(?:and\s+)?receipts?\s+only\b/i,

  // Bare "cash receipt" / "cash receipts" — in gift-card trading this
  // always means physical cards with cash-register receipts, not codes.
  /\bcash\s+receipts?\b/i,

  // "Physical … ecodes have separate offer" / "… codes have their own offer"
  // Implies this particular offer does NOT accept digital codes.
  /\bphysical\b[\s\S]{0,200}?\b(?:ecodes?|e[-\s]?codes?)\s+(?:have|has)\s+(?:their\s+own|separate)\s+offer/i,
];

export function isPhysicalOrCashOnly(tradingConditions: string | null | undefined): boolean {
  if (!tradingConditions) return false;
  const text = tradingConditions.trim();
  if (!text) return false;
  return EXCLUDE_PATTERNS.some((re) => re.test(text));
}
