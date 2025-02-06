type ButtonProps = React.ComponentProps<'button'> & { children: React.ReactNode }

type Track = {
  id: string
  title: string
  artist: string
  audioSrc: string
  coverSrc: string
  artistUrl: string
  duration: number
}

type Notification = {
  id: string
  message: string
  type: NotificationType
}

type NotificationType = 'error' | 'warning' | 'info'

type StoreState = {
  isLoading: boolean
  allTracks: Track[]
  currentTracks: Track[]
  filteredTracks: Track[]
  currentTrackIndex: number | null
  favorites: string[]
  showFavorites: boolean
  searchQuery: string
  volume: number
  lastVolume: number
  isPlaying: boolean
  isMuted: boolean
  notifications: Notification[]
  setIsLoading: (newState: boolean) => void
  setAllTracks: (newTracks: Track[]) => void
  setCurrentTracks: (newTracks: Track[]) => void
  setFilteredTracks: (newTracks: Track[]) => void
  setCurrentTrackIndex: (newIndex: number | null) => void
  setFavorites: (newFavorites: string[]) => void
  toggleShowFavorites: () => void
  setSearchQuery: (newSearchQueery: string) => void
  setVolume: (newVolume: number) => void
  setLastVolume: (newVolume: number) => void
  setIsPlaying: (newState: boolean | ((prev: boolean) => boolean)) => void
  setIsMuted: (newState: boolean) => void
  addNotification: (message: string, type: NotificationType) => void
  removeNotification: (id: string) => void
}

type AudioPlayer = {
  currentTime: number
  duration: number
  togglePlayPause: () => void
  nextTrack: () => void
  prevTrack: () => void
  seekTo: (position: number) => void
}

export type { ButtonProps, Track, Notification, StoreState, AudioPlayer }
