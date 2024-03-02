import { useContext } from 'react'
import { DataArrayContext } from '../context/data-context'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { FromDataContext } from '../context/FormDataContext'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function AddChart() {
  const { addDataArray } = useContext(DataArrayContext)
  const { radioValue } = useContext(FromDataContext)

  console.log(radioValue)

  function noneData() {
    const chartDataNone = {
      labels: ['Нет данных'],
      datasets: [
        {
          label: '',
          data: [1],
          backgroundColor: ['grey'],
        },
      ],
    }
    console.log('HI')
    return chartDataNone
  }

  function updateChartData() {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Р',
          data: [],
          backgroundColor: [],
        },
      ],
    }

    addDataArray.forEach((item) => {
      const existingIndex = chartData.labels.findIndex(
        (label) => label === item.category
      )
      if (existingIndex !== -1) {
        chartData.datasets[0].data[existingIndex] += item.amount
      } else {
        chartData.labels.push(item.category)
        chartData.datasets[0].data.push(item.amount)
        chartData.datasets[0].backgroundColor.push(item.color)
      }
    })

    console.log('data')
    return chartData
  }

  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '2rem',
        justifyContent: 'center',
        height: 300,
      }}
    >
      <Pie data={addDataArray.length > 0 ? updateChartData() : noneData()} />
    </div>
  )
}
