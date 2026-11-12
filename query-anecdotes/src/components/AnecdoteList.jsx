import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotification from '../hooks/useNotify'

const AnecdoteList = () => {
    const { anecdotes, increaseVote } = useAnecdotes()
    const { vote, timeOut } = useNotification()

    const handleChange = async (anecdote) => {
        vote(anecdote.content)
        increaseVote(anecdote)
        timeOut()
    }
    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleChange(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList