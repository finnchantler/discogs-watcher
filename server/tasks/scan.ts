import {checkRelease} from "#server/services/discogs.service"
import {sendNotification} from "#server/services/notification.service"

export default defineTask({
    meta: {
        name: "scan",
        description: "scan discogs listings for new items",
    },
    async run({ payload, context }) {
        console.log("Scanning discogs listings...")

        // const watchlist = await getWatchlist()
        const watchlist = [
            {
                name: "Various – Orangemusik 001",
                releaseId: "670931"
            }
        ]

        for (const item of watchlist) {
            const listings = await checkRelease(item.releaseId)

            if (listings > 0) {
                // @ts-ignore
                await sendNotification(item)
            }
            else {
                console.log(item.name + " has none for sale")
            }
        }

        return { result: "success" }
    },
})