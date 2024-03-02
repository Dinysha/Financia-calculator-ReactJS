// TODO:
// [+] вынести отдельно массив с данными, вынести лист
// [+] придумать как доабвлять таг к каждой категории, чтобы цветом обозначался
// [+] добавить текст
// [+] добавить дату
// [+] добавить категорию
// [-] пагинация ??
// [-] добавить тэг в карточку к каждой записи (будет сумма расходов / доходов и разным цветом)
// [-] addnote, он выполняет ту же функцию

import { Card, Empty, List } from 'antd'
import styles from './AddCard.module.css'
import AddNote from '../AddNote'
import { DataArrayContext } from '../../context/data-context'
import { useContext } from 'react'

export default function AddCard() {
  const { addDataArray } = useContext(DataArrayContext)

  console.log(addDataArray.color)

  return (
    <>
      <h2>History</h2>
      <Card className={styles.card}>
        {addDataArray.length > 0 ? (
          <List
            className={styles.list}
            size="small"
            bordered
            dataSource={addDataArray}
            renderItem={(item) => (
              <List.Item>
                <AddNote
                  id={item.id}
                  title={item.title}
                  category={item.category}
                  color={item.color}
                  date={item.date}
                  amount={item.amount}
                />
              </List.Item>
            )}
          ></List>
        ) : (
          <Empty description={''}>Упс, у вас пока нет записей</Empty>
        )}
      </Card>
    </>
  )
}
