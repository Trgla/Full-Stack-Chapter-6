import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/FilterWords"
import Notification from "./components/Notification"
import { useEffect } from 'react'
import { useAnecdoteActions, useNotification } from "./store"

const App = () => {
  const { initialize } = useAnecdoteActions()
  const notification = useNotification()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification content={notification} />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App