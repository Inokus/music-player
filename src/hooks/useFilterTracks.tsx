import { useEffect } from 'react'
import useStore from '@/store'

function useFilterTracks() {
  const allTracks = useStore(state => state.allTracks)
  const favorites = useStore(state => state.favorites)
  const showFavorites = useStore(state => state.showFavorites)
  const searchQuery = useStore(state => state.searchQuery)
  const setFilteredTracks = useStore(state => state.setFilteredTracks)

  useEffect(() => {
    let filteredTracks = allTracks

    if (searchQuery) {
      filteredTracks = allTracks.filter(
        track =>
          track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (showFavorites) {
      filteredTracks = filteredTracks.filter(track =>
        favorites.some(favoriteId => favoriteId === track.id),
      )
    }

    setFilteredTracks(filteredTracks)
  }, [allTracks, favorites, showFavorites, searchQuery, setFilteredTracks])
}

export default useFilterTracks
