import { useAnecdoteActions, useNotificationActions } from "../store"

const Anecdote = ({ anecdote }) => {
    const { voteCounter, remove } = useAnecdoteActions()
    const { setNotification } = useNotificationActions()

    const handleVote = (anecdote) => {
        voteCounter(anecdote.id)
        setNotification(`you voted '${anecdote.content}'`)
        setTimeout(() => {
        setNotification('')
        }, 5000)
    }

    const handleRemove = (id) => {
        remove(id)
    }
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && < button onClick={() => handleRemove(anecdote.id)}>delete</button>}
            </div>
        </div>
    )
}

export default Anecdote