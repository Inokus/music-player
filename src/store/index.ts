import { create } from 'zustand'
import { nanoid } from 'nanoid'
import type { StoreState } from '@/types'

const useStore = create<StoreState>(set => ({
  isLoading: true,
  allTracks: [],
  currentTracks: [],
  filteredTracks: [],
  favorites: [],
  showFavorites: false,
  searchQuery: '',
  currentTrackIndex: null,
  volume: 0.1,
  lastVolume: 0.1,
  isPlaying: false,
  isMuted: false,
  notifications: [],
  setIsLoading: newState => set({ isLoading: newState }),
  setAllTracks: newTracks => set({ allTracks: newTracks }),
  setCurrentTracks: newTracks => set({ currentTracks: newTracks }),
  setFilteredTracks: newTracks => set({ filteredTracks: newTracks }),
  setCurrentTrackIndex: newIndex => set({ currentTrackIndex: newIndex }),
  setFavorites: newFavorites => set({ favorites: newFavorites }),
  toggleShowFavorites: () => set(state => ({ showFavorites: !state.showFavorites })),
  setSearchQuery: newSearchQuery => set({ searchQuery: newSearchQuery }),
  setVolume: newVolume => set({ volume: newVolume }),
  setLastVolume: newVolume => set({ lastVolume: newVolume }),
  setIsPlaying: newState =>
    set(state => ({
      isPlaying: typeof newState === 'function' ? newState(state.isPlaying) : newState,
    })),
  setIsMuted: newState => set({ isMuted: newState }),
  addNotification: (message, type) => {
    const id = nanoid(10)
    set(state => ({
      notifications: [...state.notifications, { id, message, type }],
    }))
  },
  removeNotification: id =>
    set(state => ({
      notifications: state.notifications.filter(notification => notification.id !== id),
    })),
}))

export default useStore
