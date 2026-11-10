import { useAnecdoteActions } from "../store"

const AnecdoteForm = () => {
    const { add } = useAnecdoteActions()

    const addAnecdote = async (a) => {
        a.preventDefault()
        const content = a.target.anecdote.value
        await add(content)
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