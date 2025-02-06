import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import useStore from '@/store'
import Button from './Button'

function SearchBar() {
  const searchQuery = useStore(state => state.searchQuery)
  const setSearchQuery = useStore(state => state.setSearchQuery)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputFocus = () => {
    inputRef.current?.focus()
  }

  const handleInputClear = () => {
    setSearchQuery('')
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div className="relative flex">
      <Button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 h-1/2"
        onClick={handleInputFocus}
        aria-label="Focus search input"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-full" />
      </Button>
      <input
        type="text"
        name="search"
        value={searchQuery}
        placeholder="Search"
        className="w-full px-14 py-3 rounded-full bg-background-200"
        onChange={handleSearchChange}
        ref={inputRef}
        aria-label="Search"
      />
      {searchQuery && (
        <Button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 h-1/2"
          onClick={handleInputClear}
          aria-label="Clear search input"
        >
          <FontAwesomeIcon icon={faXmark} className="h-full" />
        </Button>
      )}
    </div>
  )
}

export default SearchBar
