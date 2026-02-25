import type { InferSelectModel } from "drizzle-orm"
import { watchlist } from "#server/db/schema"

export type WatchlistItem = InferSelectModel<typeof watchlist>