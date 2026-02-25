import {Release} from "~~/types/release";
import {WatchlistItem} from "~~/types/watchlist";

export async function sendNotification(item: WatchlistItem) {
    console.log("Notification: ", item.name + " has an item for sale")
}