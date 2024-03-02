import { createContext, useState, useReducer } from 'react'
import reducerHooks from '../reducer/reducerHooks'
import { initialState } from '../components/AddForm'

export const FromDataContext = createContext()

export function FormDataProvider({ children }) {
  const [radioValue, setRadioValue] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [state, dispatch] = useReducer(reducerHooks, initialState)

  const sendRadioValue = (data) => {
    setRadioValue(data)
  }

  return (
    <FromDataContext.Provider
      value={{ radioValue, sendRadioValue, setIsModalOpen, isModalOpen }}
    >
      {children}
    </FromDataContext.Provider>
  )
}
