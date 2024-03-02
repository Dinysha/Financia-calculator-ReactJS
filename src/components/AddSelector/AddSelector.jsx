// TODO:
// [+] придумать как обновлять массив

import styles from './AddSelector.module.css'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import { DataArrayContext } from '../../context/data-context'
import { useContext } from 'react'

export default function AddSelector() {
  const { addDataArray, sendAddDataArray } = useContext(DataArrayContext)

  const items = [
    {
      key: '1',
      label: 'по дате',
      disabled: false,
      children: [
        {
          key: '1-1',
          label: 'старое',
          onClick: () => {
            handleSortByDate('asc')
          },
        },
        {
          key: '1-2',
          label: 'новое',
          onClick: () => {
            handleSortByDate('desc')
          },
        },
      ],
    },
    {
      key: '2',
      label: 'по сумме',
      disabled: false,
      children: [
        {
          key: '2-1',
          label: 'по возврастанию',
          onClick: () => {
            handleSortByAmount('asc')
          },
        },
        {
          key: '2-2',
          label: 'по убыванию',
          onClick: () => {
            handleSortByAmount('desc')
          },
        },
      ],
    },
  ]

  const handleSortByDate = (order) => {
    const sortedData = [...addDataArray].sort((a, b) => {
      if (order === 'asc') {
        return a.date - b.date
      } else {
        return b.date - a.date
      }
    })
    sendAddDataArray(null, null, null, null, null, null, sortedData)
    console.log(sortedData)
  }

  const handleSortByAmount = (order) => {
    const sortedData = [...addDataArray].sort((a, b) => {
      if (order === 'asc') {
        return a.amount - b.amount
      } else {
        return b.amount - a.amount
      }
    })
    sendAddDataArray(null, null, null, null, null, null, sortedData)
    console.log(sortedData)
  }

  return (
    <Dropdown
      className={styles.dropdown}
      menu={{
        items,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Сортировать
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}
