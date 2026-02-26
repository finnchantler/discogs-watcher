import {getRelease} from "#server/services/discogs.service"
import {sendNotification} from "#server/services/notification.service"
import {getWatchlist} from "#server/repository/watchlist.repository"

export default defineTask({
    meta: {
        name: "scan",
        description: "scan discogs listings for new items",
    },
    async run() {
        console.log("Scanning discogs listings...")

        const watchlist = await getWatchlist()

        for (const item of watchlist) {
            const release = await getRelease(item.releaseId)

            if (release.num_for_sale > 0) {
                await sendNotification(item)
            }
        }

        return { result: "success" }
    },
})