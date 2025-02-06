import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart, faFilter } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import useStore from '@/store'
import SearchBar from './SearchBar'
import Button from './Button'

function FilterControls() {
  const showFavorites = useStore(state => state.showFavorites)
  const toggleShowFavorites = useStore(state => state.toggleShowFavorites)
  return (
    <div className="h-20 p-4 border-b-2  bg-background-300 border-background-400 flex justify-end gap-4">
      <SearchBar />
      <Button
        className="py-2 px-2 rounded-full hover:bg-background-200"
        onClick={toggleShowFavorites}
        aria-label={showFavorites ? 'Show all tracks' : 'Show favorite tracks'}
      >
        <span className="relative">
          <FontAwesomeIcon icon={faFilter} className="h-full mt-1" />
          <FontAwesomeIcon
            icon={showFavorites ? solidHeart : regularHeart}
            className="absolute bottom-3.5 left-1/2 transform -translate-x-1/2 text-background-100"
          />
        </span>
      </Button>
    </div>
  )
}

export default FilterControls
