import { createContext, useEffect, useState } from 'react'

export const DataArrayContext = createContext()

let nextId = 4
export const INITIAL_STATE = [
  {
    id: 1,
    operation: true,
    title: 'Прил',
    category: 'машина',
    color: 'cyan',
    date: new Date(2024, 2, 19),
    amount: 250,
  },
  {
    id: 2,
    operation: false,
    title: 'Коммуналкаffffffff',
    category: 'дом',
    color: 'lime',
    date: new Date(2023, 2, 20),
    amount: 3500,
  },
  {
    id: 3,
    operation: true,
    title: 'Игрушки',
    category: 'другое',
    color: '#dd98ff',
    date: new Date(2024, 4, 1),
    amount: 1100,
  },
]

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

// const newArrayToLocalStorage = localStorage.getItem(
//   'note',
//   JSON.stringify(addDataArray)
// )

// function localStorageParse() {
//   if (newArrayToLocalStorage) {
//     array = JSON.parse(newArrayToLocalStorage)
//   }
// }

// operation: radioValue,
// title: text,
// category: addCategory,
// date: addDate ?? new Date(),
// amount: addAmount,

// const [addDataArrayFalse, setAddDataArrayFalse] = useState(INITIAL_STATE)
// const [addDataArrayTrue, setAddDataArrayTrue] = useState(INITIAL_STATE)

// const sendAddDataArray = (
//   operation,
//   title,
//   category,
//   color,
//   date,
//   amount
// ) => {
//   {
//     operation === false
//       ? setAddDataArrayFalse([
//           ...addDataArrayFalse,
//           {
//             id: nextId++, // Уникальный идентификатор
//             operation: operation, // Тип операции (расходы, доходы и т.д.)
//             title: title, // Заголовок или описание
//             category: category, // Категория
//             color: color, // Цвет
//             date: date, // Дата
//             amount: amount, // Сумма
//           },
//         ])
//       : setAddDataArrayTrue([
//           ...addDataArrayTrue,
//           {
//             id: nextId++, // Уникальный идентификатор
//             operation: operation, // Тип операции (расходы, доходы и т.д.)
//             title: title, // Заголовок или описание
//             category: category, // Категория
//             color: color, // Цвет
//             date: date, // Дата
//             amount: amount, // Сумма
//           },
//         ])
//   }
//   console.log(addDataArrayFalse)
//   console.log(addDataArrayTrue)
// }

// {
//   operation === true ?
// } рабочий вариант для разведения массивов
