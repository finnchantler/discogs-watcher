import { pgTable, text, integer, boolean, timestamp } from "drizzle-orm/pg-core"

export const watchlist = pgTable("watchlist", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    releaseId: text("releaseId").notNull(),
    url: text("url").notNull(),
    alerted: boolean("alerted")
        .notNull()
        .default(false),
    added: timestamp("added")
        .notNull()
})