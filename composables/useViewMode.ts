import { onMounted, ref, watch, type Ref } from 'vue'
import type { ViewMode } from '../types'

const STORAGE_KEY = 'articleViewMode'
const viewMode: Ref<ViewMode> = ref<ViewMode>('list')
let initialized = false

export function useViewMode(): { viewMode: Ref<ViewMode>; setMode: (next: ViewMode) => void } {
  // The server always renders with the default 'list' mode (localStorage is
  // unavailable during SSR). Reading the stored preference must be deferred
  // to onMounted rather than done synchronously here: applying it during
  // setup would make the very first client render diverge from the
  // server-rendered HTML, and Vue's hydration intentionally does not
  // rectify attribute/class-only mismatches it finds while adopting SSR
  // markup (see "Hydration ... mismatch" warnings), which previously left
  // parts of the article grid stuck with the wrong layout classes. Applying
  // the stored value after mount, once hydration has already settled on the
  // matching 'list' output, makes it a normal reactive update instead.
  if (!initialized && import.meta.client) {
    onMounted(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === 'list' || stored === 'grid') {
        viewMode.value = stored
      }
    })
    watch(viewMode, (next) => {
      window.localStorage.setItem(STORAGE_KEY, next)
    })
    initialized = true
  }

  function setMode(next: ViewMode): void {
    viewMode.value = next
  }

  return { viewMode, setMode }
}
