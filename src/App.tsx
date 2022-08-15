import { useState } from 'react'
import './App.css'
import { Autocomplete, Item } from './components'
import { useFetch } from './hooks'
import { Repo } from './types'

function App () {
  const { data, error } = useFetch<Repo[]>('https://api.github.com/users/edisonmatoso/repos')

  const [selected, setSelected] = useState<Item>()

  const items = data?.map(item => ({
    label: item.name,
    value: item.id
  }))

  const handleSelected = (item: Item) => {
    setSelected(item)
  }

  return (
    <div className="App">
      <div className="autocomplete-area">
        <Autocomplete
          onSelect={handleSelected}
          placeholder='Search something'
          items={items}
          error={!!error}
        />
        {
          selected && (
            <div>
              <p>name: {selected?.label}</p>
              <p>id: {selected?.value}</p>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default App
