import { create } from 'domain'
import { useContext, createContext } from 'react'

export const AppContext = createContext(null)

export const useAppContext = () => {
  return useContext(AppContext)
}