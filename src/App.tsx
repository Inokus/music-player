import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AudioPlayerProvider } from './context/AudioPlayerContext'
import useStore from './store'
import useFetchTracks from './hooks/useFetchTracks'
import useLocalStorage from './hooks/useLocalStorage'
import FilterControls from './components/FilterControls'
import PlaybackControls from './components/PlaybackControls'
import TrackList from './components/TrackList'
import ToastNotifications from './components/ToastNotifications'

function App() {
  const isInitializingStorage = useLocalStorage()
  const isFetchingTracks = useFetchTracks()

  const isLoading = useStore(state => state.isLoading)
  const currentTrackIndex = useStore(state => state.currentTrackIndex)
  const setIsLoading = useStore(state => state.setIsLoading)

  useEffect(() => {
    if (!isInitializingStorage && !isFetchingTracks) {
      setIsLoading(false)
    }
  }, [isInitializingStorage, isFetchingTracks, setIsLoading])

  return (
    <>
      {isLoading ? (
        <div className="h-screen text-2xl flex justify-center items-center gap-4">
          <span>Loading</span>
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : (
        <AudioPlayerProvider>
          <div className="h-screen flex flex-col">
            <header>
              <FilterControls />
            </header>
            <main className="flex-1 overflow-hidden">
              <TrackList />
            </main>
            {currentTrackIndex !== null && (
              <section>
                <PlaybackControls />
              </section>
            )}
          </div>
        </AudioPlayerProvider>
      )}
      <ToastNotifications />
    </>
  )
}

export default App
