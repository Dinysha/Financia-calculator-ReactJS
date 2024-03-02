// TODO:
// [-] кнопка и функционал переклюения темы
// [-] логотип??
// [-] баланс (при первом входе в приложение нужно указать даланс на карте) ??

import { Layout } from 'antd'
import styles from './AddHeader.module.css'

export default function AppHeader() {
  return (
    <Layout.Header className={styles.header}>
      <h1>Financia Note</h1>
    </Layout.Header>
  )
}
