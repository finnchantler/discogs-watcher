import { db } from "../db"
import { watchlist } from "#server/db/schema"
import { WatchlistItem } from "~~/types/watchlist"


export async function getWatchlist(): Promise<WatchlistItem[]> {
    console.log("Getting watchlist from db")
    return db.select().from(watchlist)
}