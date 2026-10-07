import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  service: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional().default(""),
});

type Lead = z.infer<typeof leadSchema>;

// Leads go to the office mailbox (hosted on Hostinger).
const OFFICE = "office@webmasters.bg";
// Sender on the domain verified in Resend. Hostinger SMTP can't be used: its
// servers sit behind Cloudflare, and Workers may not open sockets to Cloudflare IPs.
const SENDER = "Webmasters.bg - форма <forma@webmasters.bg>";

/** Sends the contact request to office@webmasters.bg through the Resend API. */
async function sendLeadEmail(lead: Lead, apiKey: string) {
  const rows: Array<[string, string]> = [
    ["Име", lead.name],
    ["Имейл", lead.email],
    ["Телефон", lead.phone || "-"],
    ["Услуга", lead.service || "-"],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", lead.message].join("\n");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: SENDER,
      to: [OFFICE],
      // "Reply" in the mail client answers the client directly.
      reply_to: `${lead.name} <${lead.email}>`,
      subject: `Ново запитване от ${lead.name}`,
      text,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend ${response.status}: ${await response.text()}`);
  }
}

/** Emails a contact request to the office (and keeps a copy in D1 if a `DB` is bound). */
export const submitLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    const { DB, RESEND_API_KEY } = bindings();
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY secret is not set; cannot email the lead.");
      return { ok: false as const };
    }
    try {
      await sendLeadEmail(data, RESEND_API_KEY);
    } catch (error) {
      console.error("Sending the lead email failed", error);
      return { ok: false as const };
    }
    if (DB) {
      await DB.prepare(
        "CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, service TEXT, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))",
      ).run();
      await DB.prepare(
        "INSERT INTO leads (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)",
      )
        .bind(data.name, data.email, data.phone, data.service, data.message)
        .run();
    }
    return { ok: true as const };
  });
