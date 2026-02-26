<script setup lang="ts">
import type {WatchlistItem} from "~~/types/watchlist"

const { data: watchlist, pending, error } = await useFetch<WatchlistItem[]>('/api/watchlist')
</script>
<template>
  <div>
    <div class="header">
      <h1>Discogs Watcher</h1>
    </div>
    <div class="container">
      <div class="input">

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
