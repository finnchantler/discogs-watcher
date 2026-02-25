import {sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const watchlist = sqliteTable("watchlist", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    releaseId: text("releaseId").notNull(),
    url: text("url").notNull(),
    alerted: integer("alerted", { mode: "boolean" })
        .notNull()
        .default(false),
    added: integer("added", { mode: "timestamp" })
        .notNull()
})