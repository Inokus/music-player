import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeXmark, faVolumeLow, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/store'
import Button from './Button'

function VolumeBar() {
  const volume = useStore(state => state.volume)
  const lastVolume = useStore(state => state.lastVolume)
  const isMuted = useStore(state => state.isMuted)
  const setVolume = useStore(state => state.setVolume)
  const setLastVolume = useStore(state => state.setLastVolume)
  const setIsMuted = useStore(state => state.setIsMuted)

  const handleMute = () => {
    if (isMuted) {
      setIsMuted(false)
      setVolume(lastVolume)
      return
    }
    if (volume > 0) {
      setLastVolume(volume)
      setIsMuted(true)
      setVolume(0)
      return
    }
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
    if (newVolume <= 0 && !isMuted) {
      setIsMuted(true)
    } else if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  return (
    <div className="flex gap-1">
      <Button
        type="button"
        className="w-6"
        onClick={handleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <FontAwesomeIcon
          icon={volume === 0 ? faVolumeXmark : volume < 0.5 ? faVolumeLow : faVolumeHigh}
        />
      </Button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className={'accent-text-100 cursor-pointer'}
        aria-label={`Volume: ${volume * 100}%`}
      />
    </div>
  )
}

export default VolumeBar
