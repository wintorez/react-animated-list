import { useState } from 'react'
import { startCase } from 'lodash'

const enters = [
  'fadeIn',
  'bounce',
  'pulse',
  'rubberBand',
  'shakeX',
  'shakeY',
  'headShake',
  'jello',
  'heartBeat',
  'flipInX',
  'backInLeft',
  'backInRight',
  'bounceInLeft',
  'bounceInRight',
]

const exists = [
  'fadeOut',
  'fadeOutLeft',
  'fadeOutRight',
  'flipOutX',
  'backOutLeft',
  'backOutRight',
  'bounceOutLeft',
  'bounceOutRight',
]

function App() {
  const [enter, setEnter] = useState('fadeIn')
  const [exit, setExit] = useState('fadeOut')
  const [items, setItems] = useState([])

  function removeItem(value) {
    if (!value) return

    setItems((prev) =>
      prev.map((each) =>
        each.value === value
          ? { ...each, animation: exit, exiting: true }
          : each
      )
    )
    window.setTimeout(
      () =>
        setItems((prev) =>
          prev
            .map((each) => (each.value === value ? null : each))
            .filter(Boolean)
        ),
      750
    )
  }

  return (
    <div>
      <div>
        <h1>Animated List in React</h1>
        <p className="notice">
          List animation on enter and exist using{' '}
          <a href="https://animate.style/">Animate.css</a>
        </p>
        <div>
          Enter:{' '}
          <select value={enter} onChange={(e) => setEnter(e.target.value)}>
            {enters.map((each) => (
              <option key={each} value={each}>
                {startCase(each)}
              </option>
            ))}
          </select>{' '}
          <button
            onClick={() =>
              setItems((prev) => [
                ...prev,
                { value: Date.now(), animation: enter },
              ])
            }
          >
            +1
          </button>{' '}
          Exit:{' '}
          <select value={exit} onChange={(e) => setExit(e.target.value)}>
            {exists.map((each) => (
              <option key={each} value={each}>
                {startCase(each)}
              </option>
            ))}
          </select>{' '}
          <button
            onClick={() => removeItem(items.find((one) => !one.exiting)?.value)}
            disabled={!items.length}
          >
            -1
          </button>
        </div>
        <ul>
          {items.map((each) => (
            <li
              key={each.value}
              className={`animate__animated animate__${each.animation}`}
              onClick={() => removeItem(each.value)}
            >
              {each.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
