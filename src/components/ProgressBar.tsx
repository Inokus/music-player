import { useState, useEffect } from 'react'
import useAudioPlayerContext from '@/hooks/useAudioPlayerContext'
import formatTime from '@/utils/formatTime'

const ProgressBar = () => {
  const { currentTime, duration, seekTo } = useAudioPlayerContext()

  const [sliderValue, setSliderValue] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    setSliderValue(newValue)
  }

  const handleStartChange = () => {
    setIsChanging(true)
  }

  const handleEndChange = () => {
    setIsChanging(false)
    seekTo(sliderValue)
  }

  useEffect(() => {
    if (!isChanging) {
      setSliderValue(currentTime)
    }
  }, [currentTime, isChanging])

  return (
    <div className="flex gap-2">
      <span aria-label="Current time">{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration}
        step="0.01"
        value={sliderValue}
        onChange={handleProgressChange}
        onMouseDown={handleStartChange}
        onMouseUp={handleEndChange}
        onTouchStart={handleStartChange}
        onTouchEnd={handleEndChange}
        className={'accent-text-100 cursor-pointer w-full'}
        aria-label="Progress"
      />
      <span aria-label="Duration">{formatTime(duration)}</span>
    </div>
  )
}

export default ProgressBar
