// TODO:
// [+] придумать как передать состояние формы (состояние радио-кнопки), для того, чтобы правильно отображать тайтл модалки
// [-] подумать как правильно вынести этот компонент и правильно ли его выносить вообще

import { useContext, useRef } from 'react'
import AddForm from './AddForm'
import { Modal, Button, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { INITIAL_STATE } from '../context/data-context'
import { FromDataContext } from '../context/FormDataContext'

import styles from './AddContent/AddContent.module.css'

export default function AddModal() {
  const { radioValue, setIsModalOpen, isModalOpen } =
    useContext(FromDataContext)
  const formRef = useRef(null)

  const showModal = () => {
    setIsModalOpen(true)
  }

  //добавить отправление данных формы
  const handleOk = () => {
    setIsModalOpen(false)
    const newData = [...INITIAL_STATE, formData]
    console.log(INITIAL_STATE)
    console.log(newData)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    formRef.current.resetFields()
  }

  const handleChange = (name, value) => {
    setIsModalOpen(...(prev) => ({ ...prev, [name]: value }))
  }

  const handleModalClose = () => {}

  return (
    <>
      <Tooltip title="Добавить">
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={showModal}
          className={styles.button}
        />
      </Tooltip>
      {radioValue === false ? (
        <Modal
          closeIcon={null}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[null]}
        >
          <AddForm onChange={handleChange} formRef={formRef} />
        </Modal>
      ) : (
        <Modal
          closeIcon={null}
          open={isModalOpen}
          onCancel={handleCancel}
          afterClose={handleModalClose}
          footer={[null]}
        >
          <AddForm onChange={handleChange} formRef={formRef} />
        </Modal>
      )}
    </>
  )
}
