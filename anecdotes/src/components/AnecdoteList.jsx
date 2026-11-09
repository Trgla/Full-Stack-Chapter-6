import { useAnecdotes } from "../store"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    anecdotes.sort((a,b) => b.votes - a.votes)

    return (
        <div>
            {anecdotes.map(anecdote => (
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            ))}
        </div>
    )
}

export default AnecdoteList