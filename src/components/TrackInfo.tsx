import useStore from '@/store'

function TrackInfo() {
  const currentTracks = useStore(state => state.currentTracks)
  const currentTrackIndex = useStore(state => state.currentTrackIndex)

  const currentTrack =
    currentTrackIndex !== null && currentTrackIndex >= 0 && currentTrackIndex < currentTracks.length
      ? currentTracks[currentTrackIndex]
      : null

  return (
    <>
      {currentTrack && (
        <div className="flex h-full justify-center items-center gap-4 sm:justify-start">
          <img
            src={currentTrack.coverSrc}
            alt={`${currentTrack.title} cover`}
            className="h-20 rounded"
          />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold truncate">{currentTrack.title}</span>
            {currentTrack.artistUrl ? (
              <span>
                <a
                  href={currentTrack.artistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-200 hover:underline focus:underline"
                >
                  {currentTrack.artist}
                </a>
              </span>
            ) : (
              <span className="text-xs truncate">{currentTrack.artist}</span>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default TrackInfo
