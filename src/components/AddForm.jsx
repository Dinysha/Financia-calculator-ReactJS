// TODO:
// [] убрать баг, если выбрать категорию и "иное", то можно выбрать расход
// [?] оптимизировать селекты, слишком большой кусок обловляется
// [] подкорректировать цвета тэгов
// [+] сделать лимит на инпут тайтл
// [+] добавить кнопку возвращения на главную страницу
// [+] при успешном добавлении в плашке убрать крестик и название модалки
// [+] очищать форму при выходе из нее
// [+] добавлять данные в массив контекста data-context
// [+] проверка формы на валидность
// [+] добавить сабмит по нажатию кнопки
// [+] при нажатии на поинт доходов, показывать другую форму
// [+] поменять название инпутов в самой форме
// [-] сделать более красивое расположнеие инпутов в модалке
// [-] поправить отступы в форме
// [-] отслеживаниие на радио-кнопки, чтобы вести 2 массива на расходы и доходы/ для чего?? (для развездения двух диаграмм)

import React, { useContext, useReducer, useRef, useState } from 'react'
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Tag,
  Button,
  Result,
} from 'antd'
import { FromDataContext } from '../context/FormDataContext'
import { DataArrayContext } from '../context/data-context'
import reducerHooks from '../reducer/reducerHooks'

const options = [
  {
    id: 'семья',
    label: 'семья',
    value: '#ff9898',
  },
  {
    label: 'дом',
    value: '#98ffc5',
  },
  {
    label: 'кредит',
    value: '#9aff98',
  },
  {
    label: 'машина',
    value: '#98ecff',
  },
  {
    label: 'другое',
    value: '#dd98ff',
  },
]

const receips = [
  {
    label: 'работа',
    value: '#ffe498',
  },
  {
    label: 'иное',
    value: '#98a6ff',
  },
]

const tagRender = (props) => {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  )
}

export const initialState = {
  text: '',
  addCategory: '',
  addColor: '',
  addDate: '',
  addAmount: '',
}

export default function AddForm({ formRef, onChange }) {
  const [state, dispatch] = useReducer(reducerHooks, initialState)
  const [componentDisabled, setComponentDisabled] = useState(false)
  const [submittingForm, setSubmittingForm] = useState(false)
  const { sendRadioValue, radioValue, setIsModalOpen, isModalOpen } =
    useContext(FromDataContext)
  const { addDataArray, sendAddDataArray } = useContext(DataArrayContext)
  const [addCategory, setAddCategory] = useState('')

  const validateMessages = {
    required: '💰',
    types: {
      number: 'количесво денег не соответсвует',
    },
    number: {
      range: '💸',
    },
  }

  function onFinish() {
    sendAddDataArray(
      radioValue,
      state.text,
      state.addCategory,
      state.addColor,
      state.addDate ?? new Date(),
      state.addAmount
    )
    formRef.current.resetFields()
    setSubmittingForm(true)
  }

  if (submittingForm === true) {
    return (
      <Result
        status="success"
        title="Добавлено успешно"
        subTitle=""
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              setIsModalOpen(false)
              setSubmittingForm(false)
            }}
          >
            Вернуться на главную старницу
          </Button>,
          <Button
            key="buy"
            onClick={() => {
              setSubmittingForm(false)
            }}
          >
            Добавить еще
          </Button>,
        ]}
      />
    )
  }

  function hendleRadioButton(e) {
    console.log(e.target.value)
    const newValue = e.target.value === 'expenses' ? false : true
    sendRadioValue(newValue)
    dispatch({ type: 'CLEAR_CATEGORY' })
    console.log(newValue)
    return newValue
  }

  function handleGenInput(e) {
    dispatch({ type: 'SET_TEXT', payload: e.target.value })
  }

  function heandleSelect(label, value) {
    if (value && value.length > 0 && value[0].label) {
      const selectedLabel = value[0].label
      const selectedColor = value[0].value
      dispatch({ type: 'SET_CATEGORY', payload: selectedLabel })
      dispatch({ type: 'SET_COLOR', payload: selectedColor })
      console.log(selectedLabel)
      console.log(selectedColor)
    } else {
      console.log('ничего не выбрано')
    }
  }

  function heandleDate(value) {
    dispatch({ type: 'SET_ADD_DATE', payload: value })
  }

  function heandleAmount(value) {
    dispatch({ type: 'SET_ADD_AMOUNT', payload: value })
  }

  return (
    <>
      <Form
        ref={formRef}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
        onFinish={onFinish}
        initialValues={{ operation: false }}
      >
        <Form.Item
          name="добавить"
          rules={[
            {
              required: true,
              message: '🙈',
            },
          ]}
        >
          <Radio.Group onChange={hendleRadioButton}>
            <Radio value="expenses">Расходы</Radio>
            <Radio value="insome">Доходы</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="описание"
          rules={[
            {
              required: true,
              message: '🙈',
            },
          ]}
        >
          <Input
            placeholder="Описание"
            maxLength={20}
            onChange={handleGenInput}
          />
        </Form.Item>
        <Form.Item
          name="Категория"
          rules={[
            {
              required: true,
              message: '🙈',
            },
          ]}
        >
          {radioValue === false ? (
            <Select
              placeholder="Категория"
              mode="multiple"
              maxCount={1}
              tagRender={tagRender}
              style={{
                width: '100%',
              }}
              options={options}
              onChange={(label, value) => heandleSelect(label, value)}
            />
          ) : (
            <Select
              placeholder="Категория"
              mode="multiple"
              maxCount={1}
              tagRender={tagRender}
              style={{
                width: '100%',
              }}
              options={receips}
              onChange={(label, value) => heandleSelect(label, value)}
            />
          )}
        </Form.Item>
        <Form.Item
          name="Дата"
          rules={[
            {
              required: true,
              message: '🙈',
            },
          ]}
        >
          <DatePicker placeholder="Дата" onChange={heandleDate} />
        </Form.Item>
        <Form.Item
          name="сумма"
          rules={[
            {
              required: true,
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber placeholder="Сумма" onChange={heandleAmount} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 18,
            span: 10,
          }}
        >
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
