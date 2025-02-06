import { useState, useEffect } from 'react'
import useStore from '@/store'

const useLocalStorage = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const {
    favorites,
    volume,
    lastVolume,
    isMuted,
    setFavorites,
    setVolume,
    setLastVolume,
    setIsMuted,
    addNotification,
  } = useStore()

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites')
      const storedVolumeState = localStorage.getItem('volumeState')

      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }

      if (storedVolumeState) {
        const { volume, lastVolume, isMuted } = JSON.parse(storedVolumeState)
        setVolume(volume)
        setLastVolume(lastVolume)
        setIsMuted(isMuted)
      }
    } catch {
      addNotification('Could not retrieve data from local storage.', 'warning')
    } finally {
      setIsInitializing(false)
    }
  }, [setFavorites, setVolume, setLastVolume, setIsMuted, addNotification])

  useEffect(() => {
    try {
      if (!isInitializing) {
        localStorage.setItem('favorites', JSON.stringify(favorites))
      }
    } catch {
      addNotification('Could not update favorites in local storage.', 'warning')
    }
  }, [favorites, isInitializing, addNotification])

  useEffect(() => {
    try {
      if (!isInitializing) {
        localStorage.setItem('volumeState', JSON.stringify({ volume, lastVolume, isMuted }))
      }
    } catch {
      addNotification('Could not update volume in local storage.', 'warning')
    }
  }, [volume, lastVolume, isMuted, isInitializing, addNotification])

  return isInitializing
}

export default useLocalStorage
