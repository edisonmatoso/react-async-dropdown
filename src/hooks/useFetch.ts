import { useEffect, useReducer } from 'react'

/* eslint-disable @typescript-eslint/indent */

interface State<T> {
  data?: T
  error?: Error
}
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched', payload: T }
  | { type: 'error', payload: Error }

export const useFetch = <T extends unknown> (url: string): State<T> => {
  const initialState: State<T> = {
    error: undefined,
    data: undefined
  }

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
    case 'loading':
      return { ...initialState }
    case 'fetched':
      return { ...initialState, data: action.payload }
    case 'error':
      return { ...initialState, error: action.payload }
    default:
      return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'loading' })

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = (await response.json()) as T

        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        dispatch({ type: 'error', payload: error as Error })
      }
    }

    void fetchData()
  }, [url])

  return state
}
