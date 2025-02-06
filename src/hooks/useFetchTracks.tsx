import { useState, useEffect } from 'react'
import useStore from '@/store'

const useFetchTracks = () => {
  const setAllTracks = useStore(state => state.setAllTracks)
  const addNotification = useStore(state => state.addNotification)

  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('/data.json')
        const data = await response.json()
        setAllTracks(data.data)
      } catch {
        addNotification('Failed to fetch tracks.', 'error')
      } finally {
        setIsFetching(false)
      }
    }

    fetchTracks()
  }, [setAllTracks, addNotification])

  return isFetching
}

export default useFetchTracks
