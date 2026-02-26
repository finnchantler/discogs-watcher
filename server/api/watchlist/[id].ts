import {deleteWatchlistItem} from "#server/repository/watchlist.repository"

export default defineEventHandler(async (event) => {
    const idParam = event.context?.params?.id

    if (!idParam) {
        throw createError({ statusCode: 400, statusMessage: "Missing ID" })
    }

    const id = Number(idParam)
    if (isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: "Invalid ID" })
    }

    await deleteWatchlistItem(id)

    return { success: true }
})