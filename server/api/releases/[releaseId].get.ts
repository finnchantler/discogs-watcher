import { getRelease } from "#server/services/discogs.service"

export default defineEventHandler(async (event) => {
    const releaseId = getRouterParam(event, "releaseId")

    if (!releaseId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Release ID is required"
        })
    }

    return getRelease(releaseId)
})