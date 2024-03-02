import { createContext, useEffect, useState } from 'react'

export const DataArrayContext = createContext()

let nextId = 4
export const INITIAL_STATE = []

export function DataContext({ children }) {
  const [addDataArray, setAddDataArray] = useState(() => {
    const savedData = localStorage.getItem('addDataArray')
    return savedData ? JSON.parse(savedData) : INITIAL_STATE
  })

  useEffect(() => {
    localStorage.setItem('addDataArray', JSON.stringify(addDataArray))
  }, [addDataArray])

  const sendAddDataArray = (
    operation,
    title,
    category,
    color,
    date,
    amount,
    sortedData,
    updatedArray
  ) => {
    if (sortedData) {
      setAddDataArray(sortedData)
    } else if (updatedArray) {
      setAddDataArray(updatedArray)
    } else {
      setAddDataArray([
        ...addDataArray,
        {
          id: nextId++, // Уникальный идентификатор
          operation: operation, // Тип операции (расходы, доходы и т.д.)
          title: title, // Заголовок или описание
          category: category, // Категория
          color: color, // Цвет
          date: date, // Дата
          amount: amount, // Сумма
        },
      ])
    }
  }

  return (
    <DataArrayContext.Provider value={{ addDataArray, sendAddDataArray }}>
      {children}
    </DataArrayContext.Provider>
  )
}
