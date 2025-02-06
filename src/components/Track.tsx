import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import useStore from '@/store'
import useAudioPlayerContext from '@/hooks/useAudioPlayerContext'
import formatTime from '@/utils/formatTime'
import Button from './Button'
import type { Track } from '@/types'

function Track({ track, index }: { track: Track; index: number }) {
  const { togglePlayPause } = useAudioPlayerContext()

  const currentTracks = useStore(state => state.currentTracks)
  const filteredTracks = useStore(state => state.filteredTracks)
  const currentTrackIndex = useStore(state => state.currentTrackIndex)
  const favorites = useStore(state => state.favorites)
  const isPlaying = useStore(state => state.isPlaying)
  const setCurrentTracks = useStore(state => state.setCurrentTracks)
  const setCurrentTrackIndex = useStore(state => state.setCurrentTrackIndex)
  const setFavorites = useStore(state => state.setFavorites)

  const isFavorite = favorites.includes(track.id)
  const isCurrentTrack =
    currentTrackIndex !== null && currentTracks[currentTrackIndex].id === track.id

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      togglePlayPause()
      return
    }
    setCurrentTracks(filteredTracks)
    setCurrentTrackIndex(index)
  }

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav !== track.id)
      setFavorites(newFavorites)
    } else {
      setFavorites([...favorites, track.id])
    }
  }

  return (
    <li
      className={classNames('p-3 rounded flex items-center justify-between gap-4 group', {
        'bg-background-100': isCurrentTrack,
        'hover:bg-background-200': !isCurrentTrack,
      })}
    >
      <div className="min-w-0 flex gap-4">
        <div className="relative w-12 h-12 shrink-0">
          <img src={track.coverSrc} alt={`${track.title} cover`} className="rounded" />
          <Button
            type="button"
            className="absolute inset-0 "
            onClick={handlePlayPause}
            aria-label={isCurrentTrack && isPlaying ? 'Pause' : 'Play'}
          >
            <FontAwesomeIcon
              icon={isCurrentTrack && isPlaying ? faPause : faPlay}
              className={classNames('group-hover:visible', {
                'ml-0.5': !isPlaying,
                'sm:invisible': !isCurrentTrack,
                'sm:visible': isCurrentTrack,
              })}
            />
          </Button>
        </div>
        <div className="flex flex-col overflow-hidden">
          <span
            className={classNames('font-bold truncate', {
              'text-accent': isCurrentTrack,
            })}
          >
            {track.title}
          </span>
          <span
            className={classNames('text-sm truncate', {
              'opacity-70': !isCurrentTrack,
              'opacity-100': isCurrentTrack,
            })}
          >
            {track.artist}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className=" text-text-500">{formatTime(track.duration)}</span>
        <Button
          className="h-10 w-10 p-2 hover:scale-110 hover:opacity-80"
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
        >
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            className="h-full hover:text-accent"
          />
        </Button>
      </div>
    </li>
  )
}

export default Track
