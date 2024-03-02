// TODO:
// [+] сделать фильтр по (доходы(макс, мин), расходы(макс, мин), дата(старое, новое), фильтр по календарю??)
// [+] ровно за диаграммой сделать серый круг, который будет появляться, если диаграммы нет
// [+] если записей нет, то сделать надпись, что нужно добавить запись
// [-] сделать инструкцию по нажатию на кноку знака вопроса (модалнку с обьяснялкой)

import { Pie } from 'react-chartjs-2'

import { Layout } from 'antd'
import styles from './AddContent.module.css'
import AddCard from '../AddCard/AddCard'
import AddModal from '../AddModal'
import { FormDataProvider } from '../../context/FormDataContext'
import { DataContext } from '../../context/data-context'
import AddManual from '../AddManual'
import AddChart from '../AddChart'
import AddSelector from '../AddSelector/AddSelector'

export default function AppContent() {
  return (
    <DataContext>
      <FormDataProvider>
        <Layout.Content className={styles.content}>
          <AddModal />
          <AddChart />
          <AddSelector />
          <AddCard />
          <AddManual />
        </Layout.Content>
      </FormDataProvider>
    </DataContext>
  )
}
