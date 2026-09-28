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

/** Stores a contact request in the site's own D1 `leads` table. */
export const submitLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const };
    }
    await DB.prepare(
      "CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, service TEXT, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))",
    ).run();
    await DB.prepare(
      "INSERT INTO leads (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)",
    )
      .bind(data.name, data.email, data.phone, data.service, data.message)
      .run();
    return { ok: true as const };
  });
