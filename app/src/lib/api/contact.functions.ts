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

// The office mailbox on Hostinger: the form sends from it, to it (as on the old site).
const MAILBOX = "office@webmasters.bg";

/** Sends the contact request to office@webmasters.bg through Hostinger SMTP. */
async function sendLeadEmail(lead: Lead, password: string) {
  // Imported lazily: it needs `cloudflare:sockets`, which only the Workers runtime has.
  const { WorkerMailer } = await import("worker-mailer");
  const rows: Array<[string, string]> = [
    ["Име", lead.name],
    ["Имейл", lead.email],
    ["Телефон", lead.phone || "-"],
    ["Услуга", lead.service || "-"],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", lead.message].join("\n");
  await WorkerMailer.send(
    {
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      credentials: { username: MAILBOX, password },
      authType: ["plain", "login"],
    },
    {
      from: { name: "Webmasters.bg - форма", email: MAILBOX },
      to: { email: MAILBOX },
      // "Reply" in the mail client answers the client directly.
      reply: { name: lead.name, email: lead.email },
      subject: `Ново запитване от ${lead.name}`,
      text,
    },
  );
}

/** Emails a contact request to the office (and keeps a copy in D1 if a `DB` is bound). */
export const submitLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    const { DB, SMTP_PASSWORD } = bindings();
    if (!SMTP_PASSWORD) {
      console.error("SMTP_PASSWORD secret is not set; cannot email the lead.");
      return { ok: false as const, diag: "no-secret" };
    }
    try {
      await sendLeadEmail(data, SMTP_PASSWORD);
    } catch (error) {
      console.error("Sending the lead email failed", error);
      return { ok: false as const, diag: `len=${SMTP_PASSWORD.length} ${String(error).slice(0, 300)}` };
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
