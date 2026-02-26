import {getWatchlist} from "#server/repository/watchlist.repository"

export default defineEventHandler(async () => {
    return await getWatchlist()
})