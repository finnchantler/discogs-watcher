import { db } from "../db"
import { watchlist } from "#server/db/schema"
import { WatchlistItem } from "~~/types/watchlist"

export async function getWatchlist(): Promise<WatchlistItem[]> {
    console.log("Getting watchlist from db")
    return db.select().from(watchlist)
}

export async function addWatchlistItem(
    item: Pick<WatchlistItem, 'name' | 'releaseId' | 'url'>
): Promise<void> {
    await db.insert(watchlist).values({
        name: item.name,
        releaseId: item.releaseId,
        url: item.url,
        alerted: false,
        added: new Date()
    })
}