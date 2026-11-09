import { useAnecdoteActions } from "../store"

const Anecdote = ({ anecdote }) => {
    const { voteCounter } = useAnecdoteActions()

    return (
        <div>
            <div>{anecdote.content}</div>
            <div>has {anecdote.votes}
            <button onClick={() => voteCounter(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote