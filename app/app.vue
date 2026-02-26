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
  <div class="main-container">
    <div class="header">
      <h1>Discogs Watcher</h1>
    </div>
    <div class="container">
      <div class="input">
        <form @submit.prevent="submitForm">
          <input id="url-input" v-model="url" placeholder="Discogs URL" />
          <button id="add-button" type="submit" :disabled="submitting">
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
                id="delete-button"
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

<style scoped>

  /* Basic resets */
*, *::before, *::after {
  box-sizing: border-box;
}
*:not(dialog) {
  margin: 0;
}
:global(body) {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: 'Allerta Stencil', sans-serif;
}

/* Global body styling */
:global(body) {
  background-color: #050836;
  min-height: 100vh;
  color: aliceblue;
}

/* Main page container */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;       /* horizontal centering */
  justify-content: flex-start; /* top-aligned */
  width: 100%;
  padding: 2rem;
}

/* Header */
.header {
  font-size: 38px;
  margin-bottom: 2rem;
  text-align: center;
}

/* Container holding form + watchlist */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;       /* horizontal centering */
  width: 100%;
  max-width: 600px;
  gap: 2rem;                 /* spacing between input and watchlist */
}

/* Input row */
.input form {
  display: flex;
  flex-direction: row;        /* horizontal layout */
  justify-content: center;    /* center row horizontally */
  align-items: center;        /* vertical alignment */
  width: 100%;
  gap: 0.5rem;                /* space between input and button */
}

.input input {
  flex: 1;                    /* stretch to fill remaining space */
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
}

.input button {
  flex: 0;                    /* natural width */
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  //background-color: #ff6b6b;
  color: black;
  cursor: pointer;
}

/* Watchlist */
.watchlist ul {
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
}

.watchlist li {
  display: flex;
  justify-content: space-between; /* text left, button right */
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background-color: rgba(255, 255, 255, 0.05);
}

.watchlist a {
  color: #ffffff;
  text-decoration: none;
  word-break: break-word;
}

#delete-button {
  background-color: #ff6b6b;
  margin-left: 10px;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

</style>
