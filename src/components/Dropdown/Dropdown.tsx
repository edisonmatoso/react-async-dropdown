import { Item } from '../Autocomplete'
import { DropdownItem } from '../DropdownItem'
import './Dropdown.css'

interface DropdownProps {
  id: string
  items: Item[] | undefined
  onSelect: (item: Item) => void
  term: string
}

export const Dropdown = ({ id, items, term, onSelect }: DropdownProps) => {
  return (
    <ul className='dropdown' aria-labelledby={id}>
      {items?.length
        ? items?.map(item => (
          <DropdownItem onSelect={onSelect} item={item} term={term} key={item.value} />
        ))
        : <p>No items were found</p>}
    </ul>
  )
}
