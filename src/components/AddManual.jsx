// TODO:
// [] обратную связь выводить в гугл таблицу
// [] очищать инпуты
// [+] селект для выбора категории
// [+] подтверждение упешной отправки формы
// [+] инпут

import { Drawer, FloatButton, Form, Input, Select, Button, message } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

const feedback = [
  { value: 'Похвалить 😌' },
  { value: 'Поругать 😰' },
  { value: 'Предложения 🤪' },
  { value: 'Проблемы 👀' },
  { value: 'Сотрудничесво 💸' },
]

export default function AddManual({}) {
  const [open, setOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Успешно!',
      duration: 1,
    })
  }

  const { TextArea } = Input
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      {contextHolder}
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="default"
        style={{
          right: 94,
        }}
        onClick={showDrawer}
      />
      <Drawer title="Обратная связь" onClose={onClose} open={open}>
        <h2
          style={{
            color: 'black',
            margin: '0px 0px 10px 0px',
            lineHeight: '1.8',
          }}
        >
          Возникли проблемы?
          <br />
          Напишите нам!😇
        </h2>
        <Form>
          <Form.Item>
            <Select
              defaultValue="Похвалить 😌"
              style={{
                width: 330,
              }}
              options={feedback}
            />
          </Form.Item>
          <Form.Item>
            <TextArea
              rows={4}
              placeholder="Ваши добрые / гневные комментарии"
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={success} type="primary">
              Отправить 💌
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
