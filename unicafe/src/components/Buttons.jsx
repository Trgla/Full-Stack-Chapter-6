import { useCounterActions } from '../store'

const Buttons = () => { 
  const { goodCounter, neutralCounter, badCounter } = useCounterActions()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={goodCounter}>good</button>
      <button onClick={neutralCounter}>neutral</button>
      <button onClick={badCounter}>bad</button>
    </div>
  )
}

export default Buttons