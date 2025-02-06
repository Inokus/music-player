import { createContext } from 'react'
import useAudioPlayer from '@/hooks/useAudioPlayer'
import type { AudioPlayer } from '@/types'

const AudioPlayerContext = createContext<AudioPlayer | null>(null)

const AudioPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioPlayer = useAudioPlayer()

  return <AudioPlayerContext.Provider value={audioPlayer}>{children}</AudioPlayerContext.Provider>
}

export { AudioPlayerContext, AudioPlayerProvider }
