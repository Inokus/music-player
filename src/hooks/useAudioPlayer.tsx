import { useState, useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'
import useStore from '@/store'

const useAudioPlayer = () => {
  const currentTracks = useStore(state => state.currentTracks)
  const currentTrackIndex = useStore(state => state.currentTrackIndex)
  const isPlaying = useStore(state => state.isPlaying)
  const volume = useStore(state => state.volume)
  const setCurrentTrackIndex = useStore(state => state.setCurrentTrackIndex)
  const setIsPlaying = useStore(state => state.setIsPlaying)

  const [isTrackLoaded, setIsTrackLoaded] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const trackRef = useRef<Howl | null>(null)
  const volumeRef = useRef(volume)

  const seekTo = (position: number) => {
    if (trackRef.current) {
      trackRef.current.seek(position)
      setCurrentTime(position)
    }
  }

  const handlePrevTrack = useCallback(() => {
    if (currentTrackIndex !== null) {
      if (currentTracks.length === 1) {
        seekTo(0)
        setIsPlaying(true)
        return
      }
      const prevIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : currentTracks.length - 1
      setCurrentTrackIndex(prevIndex)
    }
  }, [currentTracks, currentTrackIndex, setCurrentTrackIndex, setIsPlaying])

  const handleNextTrack = useCallback(() => {
    if (currentTrackIndex !== null) {
      if (currentTracks.length === 1) {
        seekTo(0)
        setIsPlaying(true)
        return
      }
      const nextIndex = (currentTrackIndex + 1) % currentTracks.length
      setCurrentTrackIndex(nextIndex)
    }
  }, [currentTracks, currentTrackIndex, setCurrentTrackIndex, setIsPlaying])

  const loadTrack = useCallback(() => {
    if (currentTracks.length === 0 || currentTrackIndex === null) return

    const currentTrack = currentTracks[currentTrackIndex]

    if (trackRef.current) {
      trackRef.current.unload()
      setIsTrackLoaded(false)
    }

    trackRef.current = new Howl({
      src: [currentTrack.audioSrc],
      volume: volumeRef.current,
      html5: true,
      onend: () => {
        handleNextTrack()
      },
      onload: () => {
        setIsTrackLoaded(true)
        setIsPlaying(true)
      },
    })
  }, [currentTracks, currentTrackIndex, setIsPlaying, handleNextTrack])

  useEffect(() => {
    const updateTime = () => {
      if (trackRef.current) {
        setCurrentTime(trackRef.current.seek())
      }
    }

    updateTime()

    const intervalId = isPlaying && isTrackLoaded ? setInterval(updateTime, 1000) : null

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying, isTrackLoaded])

  // Handle play/pause based on isPlaying state
  useEffect(() => {
    if (trackRef.current && isTrackLoaded) {
      if (isPlaying) {
        trackRef.current.play()
      } else {
        trackRef.current.pause()
      }
    }
  }, [isTrackLoaded, isPlaying])

  // Handle volume changes
  useEffect(() => {
    volumeRef.current = volume

    if (trackRef.current) {
      trackRef.current.volume(volume)
    }
  }, [volume])

  useEffect(() => {
    loadTrack()

    return () => {
      if (trackRef.current) {
        trackRef.current.unload()
      }
    }
  }, [loadTrack])

  return {
    currentTime,
    duration: currentTrackIndex !== null ? currentTracks[currentTrackIndex].duration : 0,
    togglePlayPause: () => setIsPlaying(currentState => !currentState),
    nextTrack: handleNextTrack,
    prevTrack: handlePrevTrack,
    seekTo,
  }
}

export default useAudioPlayer
