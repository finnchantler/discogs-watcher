<script setup lang="ts">
import type {WatchlistItem} from "~~/types/watchlist"
import type {Release} from "~~/types/release";

const url = ref('')
const submitting = ref(false)

const { data: watchlist, pending, error, refresh } =
    await useFetch<WatchlistItem[]>('/api/watchlist', {
      default: () => []
    })

async function submitForm() {
  if (!url.value) return

  submitting.value = true

  const releaseId = getReleaseId(url.value)

  try {
    if (!releaseId) {
      console.error("Invalid releaseId")
      return
    }

    const name = await getReleaseDetails(releaseId)

    await $fetch('/api/watchlist', {
      method: 'POST',
      body: {
        name: name,
        releaseId: releaseId,
        url: url.value
      }
    })

    // clear form
    url.value = ''

    // refresh list
    await refresh()
  } catch (err) {
    console.error(err)
  } finally {
    submitting.value = false
  }
}

function getReleaseId(url: string) {
  const match = url.match(/release\/(\d+)/)

  if (!match) {
    throw new Error('Invalid Discogs URL')
  }

  return match[1]
}

async function getReleaseDetails(releaseId: string): Promise<string> {
  try {
    const release = await $fetch<Release>(
        `/api/releases/${releaseId}`
    )

    const artists = release.artists.map(artist => artist.name).join(', ')

    return `${artists} - ${release.title}`

  } catch (err) {
    console.error(err)
    throw err
  }
}

async function deleteItem(id: number): Promise<void> {
  try {
    await $fetch(`/api/watchlist/${id}`, {
      method: 'DELETE'
    })

    await refresh()
  } catch (err) {
    console.error(err)
  }
}

</script>
<template>
  <div>
    <div class="header">
      <h1>Discogs Watcher</h1>
    </div>
    <div class="container">
      <div class="input">
        <form @submit.prevent="submitForm">
          <input v-model="url" placeholder="Discogs URL" />
          <button type="submit" :disabled="submitting">
            {{ submitting ? 'Adding...' : 'Add' }}
          </button>
        </form>
      </div>
      <div class="watchlist">
        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Something went wrong</div>
        <ul v-else>
          <li v-for="item in watchlist" :key="item.id">
            <a :href="item.url" target="_blank" rel="noopener">
              {{ item.name }}
            </a>
            <button
                class="delete-button"
                type="button"
                @click="deleteItem(item.id)"
            >
              X
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
