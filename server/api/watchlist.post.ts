import {addWatchlistItem} from "#server/repository/watchlist.repository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body || !body.releaseId || !body.url) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields'
        })
    }

    await addWatchlistItem({
        name: body.name,
        releaseId: body.releaseId,
        url: body.url
    })

    return { success: true }
})