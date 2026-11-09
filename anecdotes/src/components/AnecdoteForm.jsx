import { useAnecdoteActions } from "../store"

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()

    const addAnecdote = (a) => {
        a.preventDefault()
        const content = a.target.anecdote.value
        add({ content, id: generateId(), votes: 0 })
        a.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote"/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm