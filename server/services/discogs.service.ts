import {Release} from "~~/types/release"

export async function getRelease(releaseId: string): Promise<Release> {
    const config = useRuntimeConfig()

    const url = `${config.discogsBaseUrl}/releases/${releaseId}`

    return await $fetch<Release>(
        url as string,
        {
            headers: {
                "User-Agent": config.discogsUserAgent,
                "Authorization": `Discogs key=${config.discogsConsumerKey}, secret=${config.discogsConsumerSecret}`
            }
        }
    )
}