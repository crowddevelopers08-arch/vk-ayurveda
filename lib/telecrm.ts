export interface TeleCRMPayload {
  fields: Record<string, string>;
  actions: { type: "SYSTEM_NOTE"; text: string }[];
}

// TeleCRM matches leads on phone, so it expects the number with the 91 country code.
export function telecrmPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

export function istTimestamp() {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

// Creates or updates (by phone) a TeleCRM lead. Throws on any failure so callers decide
// whether it is fatal.
export async function postToTeleCRM(payload: TeleCRMPayload) {
  const url = process.env.TELECRM_API_URL;
  const key = process.env.TELECRM_API_KEY;
  if (!url || !key) throw new Error("TELECRM_API_URL / TELECRM_API_KEY not set");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      "X-Client-ID": "nextjs-website-integration",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`TeleCRM HTTP ${res.status}: ${text.slice(0, 200)}`);
  try {
    return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
