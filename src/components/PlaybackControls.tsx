import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/store'
import useAudioPlayerContext from '@/hooks/useAudioPlayerContext'
import Button from './Button'
import VolumeBar from './VolumeBar'
import TrackInfo from './TrackInfo'
import ProgressBar from './ProgressBar'

function PlaybackControls() {
  const { togglePlayPause, prevTrack, nextTrack } = useAudioPlayerContext()

  const isPlaying = useStore(state => state.isPlaying)

  return (
    <div className="min-h-24 p-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-3 sm:gap-0">
      <div>
        <TrackInfo />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center gap-4">
          <Button
            className="w-10 h-10 rounded-full opacity-70 flex justify-center items-center  hover:opacity-100 hover:scale-105"
            onClick={prevTrack}
            aria-label="Previous track"
          >
            <FontAwesomeIcon icon={faBackwardStep} className="h-1/2 w-1/2" />
          </Button>
          <Button
            className="w-10 h-10 rounded-full bg-text-100 text-background-300 flex justify-center items-center hover:scale-105"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <FontAwesomeIcon
              icon={isPlaying ? faPause : faPlay}
              className={classNames('h-1/2 w-1/2', { 'ml-0.5': !isPlaying })}
            />
          </Button>
          <Button
            className="w-10 h-10 rounded-full opacity-70 flex justify-center items-center hover:opacity-100 hover:scale-105"
            onClick={nextTrack}
            aria-label="Next track"
          >
            <FontAwesomeIcon icon={faForwardStep} className="h-1/2 w-1/2" />
          </Button>
        </div>
        <ProgressBar />
      </div>
      <div className="hidden sm:flex sm:justify-end">
        <VolumeBar />
      </div>
    </div>
  )
}

export default PlaybackControls
