import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const sum = () => { return good + bad + neutral }

  const Average = () => {
    if (sum() === 0) return 0
    return (good - bad) / sum()
  }

  const Positive = () => {
    if (sum() === 0) return 0
    return good / sum() * 100
  }

  if (sum() === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given.</p>

      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>

      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Total" value={good + bad + neutral} />
          <Statistic text="Average" value={Average()} />
          <Statistic text="Positive" value={Positive() + "%"} />
        </tbody>
      </table>
    </div>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback </h1>

      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
