import { useAnecdotes } from "../store"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const sortedList = anecdotes.sort((a,b) => b.votes - a.votes)

    return (
        <div>
            {sortedList.map(anecdote => (
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            ))}
        </div>
    )
}

export default AnecdoteList