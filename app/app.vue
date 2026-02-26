<script setup lang="ts">
import type {WatchlistItem} from "~~/types/watchlist"

const name = ref('')
const releaseId = ref('')
const url = ref('')
const submitting = ref(false)

const { data: watchlist, pending, error, refresh } =
    await useFetch<WatchlistItem[]>('/api/watchlist', {
      default: () => []
    })

async function submitForm() {
  if (!name.value || !releaseId.value || !url.value) return

  submitting.value = true

  try {
    await $fetch('/api/watchlist', {
      method: 'POST',
      body: {
        name: name.value,
        releaseId: releaseId.value,
        url: url.value
      }
    })

    // clear form
    name.value = ''
    releaseId.value = ''
    url.value = ''

    // refresh list
    await refresh()
  } catch (err) {
    console.error(err)
  } finally {
    submitting.value = false
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
          <input v-model="name" placeholder="Name" />
          <input v-model="releaseId" placeholder="Release ID" />
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
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
