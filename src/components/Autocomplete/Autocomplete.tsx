import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { Dropdown } from '../Dropdown'
import './Autocomplete.css'

export interface Item {
  value: string
  label: string
}

interface AutocompleteProps {
  label?: string
  placeholder?: string
  items: Item[] | undefined
  onSelect: (item: Item) => void
  error: boolean
}

export const Autocomplete = ({ label, placeholder, items, error, onSelect }: AutocompleteProps) => {
  const [term, setTerm] = useState('')
  const [filteredItems, setFilteredItems] = useState<Item[] | undefined>()
  const debouncedTerm = useDebounce(term)

  const hasResult = !!items?.length

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.currentTarget.value)
  }

  const search = async (): Promise<Item[]> => {
    return await new Promise((resolve, reject) => {
      const result = items?.filter(({ label }) => label.toLowerCase().includes(term.toLowerCase()))

      if (result?.length) {
        resolve(result)
      } else {
        reject(new Error('No items were found'))
      }
    })
  }

  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  useEffect(() => {
    if (term.length === 0) {
      return setFilteredItems(items)
    }

    const handleSearch = async () => {
      try {
        const items = await search()
        setFilteredItems(items)
      } catch (error) {
        setFilteredItems([])
        console.error(error)
      }
    }

    void handleSearch()
  }, [debouncedTerm])

  // used to avoid same identifier when multiple Autocompletes are rendered together
  const randomId = Math.random().toString()

  return (
    <div className='autocomplete-container'>
      {label?.length ? <label htmlFor={randomId}>{label}</label> : null}
      <input
        type="text"
        onChange={handleChange}
        value={term}
        id={randomId}
        placeholder={placeholder}
        aria-haspopup="true"
        aria-expanded={hasResult}
      />
      {error && <p className='error'>Some error ocurred.</p>}

      <Dropdown id={randomId} items={filteredItems} term={term} onSelect={onSelect} />
    </div>
  )
}
