// TODO:
// [+] реализовать удаление элементов

import { useContext } from 'react'
import { DataArrayContext } from '../context/data-context'
import { Tag, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export default function AddNote({ id, title, category, color, date, amount }) {
  const { addDataArray, sendAddDataArray } = useContext(DataArrayContext)

  if (!(date instanceof Date)) {
    date = new Date(date)
  }

  const deleteItem = (id) => {
    const updatedArray = addDataArray.filter((item) => item.id !== id)
    sendAddDataArray(null, null, null, null, null, null, updatedArray)
    console.log(updatedArray)
  }

  return (
    <>
      <h3>{title}</h3>
      <Tag color={color}>{category}</Tag>
      <p>{date.toLocaleDateString()}</p>
      <p>{amount}</p>
      <Button
        onClick={() => deleteItem(id)}
        type="primary"
        shape="circle"
        style={{ backgroundColor: '#242527' }}
        icon={
          <DeleteOutlined
            style={{ backgroundColor: '#242527', color: 'white' }}
          />
        }
      />
    </>
  )
}
