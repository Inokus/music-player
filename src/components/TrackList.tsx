import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSadTear, faFaceFrown } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/store'
import useFilterTracks from '@/hooks/useFilterTracks'
import Track from './Track'

function TrackList() {
  useFilterTracks()

  const allTracks = useStore(state => state.allTracks)
  const filteredTracks = useStore(state => state.filteredTracks)

  const noTracks = allTracks.length === 0
  const noFilteredTracks = filteredTracks.length === 0 && allTracks.length > 0

  return (
    <>
      {noTracks || noFilteredTracks ? (
        <div className="h-full p-4 bg-gradient-to-b from-background-300 from-0% to-background-400 to-90% flex justify-center items-center gap-4">
          <span className="text-center">
            {noTracks
              ? "Oops! We couldn't find any tracks, please try again later."
              : "Oops! We couldn't find any tracks matching your filters."}
          </span>
          <FontAwesomeIcon icon={noTracks ? faFaceFrown : faFaceSadTear} className="w-8 h-8" />
        </div>
      ) : (
        <ul className="h-full p-4 bg-gradient-to-b from-background-300 from-0% to-background-400 to-90% overflow-y-auto flex flex-col gap-2">
          {filteredTracks.map((track: Track, index) => (
            <Track track={track} index={index} key={track.id} />
          ))}
        </ul>
      )}
    </>
  )
}

export default TrackList
