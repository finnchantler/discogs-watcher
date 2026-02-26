import {Release} from "~~/types/release"

export async function checkRelease(releaseId: string): Promise<number> {
    const config = useRuntimeConfig()

    const url = `${config.discogsBaseUrl}/releases/${releaseId}`

    const response: Release = await $fetch(
        url,
        {
            headers: {
                UserAgent: config.discogsUserAgent,
            }
        }
    )

    let numForSale = 0
    if(response) {
        numForSale = response.num_for_sale
    }

    return numForSale
}