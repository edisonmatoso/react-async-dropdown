import React from 'react'
import { Item } from '../Autocomplete'
import './DropdownItem.css'

interface DropdownItemProps {
  item: Item
  onSelect: (item: Item) => void
  term: string
}

export const DropdownItem = ({ item, term, onSelect }: DropdownItemProps) => {
  const Label = () => {
    const { label } = item
    if (!term.length) {
      return <p>{label}</p>
    }

    const firstIndex = label.indexOf(term)
    const lastIndex = firstIndex === -1 ? -1 : firstIndex + term.length

    const firstPart = label.slice(0, firstIndex)
    const lastPart = label.slice(lastIndex, label.length)
    const highlighted = label.slice(firstIndex, lastIndex)

    return (
      <p>{firstPart}<strong>{highlighted}</strong>{lastPart}</p>
    )
  }

  return (
    <li className='item' onClick={() => onSelect(item)}><Label /></li>
  )
}
