// TODO:
// [] сохранение  в локалсторедж
// [+] добавление расходов при нажатии на кнопку (модалка) (диаграмма)
// [+] добавление доходов (диаграмма)
// [+] категории (добавление категорий в селекте)
// [+] если записей нет, то 2 диаграммы пустые (серые)
// [+] фильтрация
// [+/-] решить коллизию с диаграммой, добавляются новые элементы, а не плюсуются старые
// [-] статистические данные (в сайдер)
// [-] чтобы история обновлялась каждый месяц
// [-] переключение темы
// [-] в истории нужно нужно сделать эффект матового стекла

import './App.css'
import { Layout } from 'antd'
import AddHeader from './components/AddHeader/AddHeader'
import AddContent from './components/AddContent/AddContent'

function App() {
  return (
    <Layout>
      <AddHeader />
      <AddContent />
    </Layout>
  )
}

export default App
