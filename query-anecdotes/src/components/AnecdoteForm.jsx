import { useAnecdotes } from "../hooks/useAnecdotes"
import useNotification from "../hooks/useNotify"

const AnecdoteForm = () => {
  const { addAnecdote: addAnecdotetoServer } = useAnecdotes()
  const { creation, lengthRequirement, timeOut } = useNotification()
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    if (content.length >= 5) {
      addAnecdotetoServer(content)
      creation(content)
    }
    else {lengthRequirement()}
    timeOut()
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm 