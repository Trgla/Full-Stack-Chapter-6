import anecdoteService from './services/anecdotes'
import { create } from 'zustand'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    }, 
    voteCounter: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({ anecdotes: state.anecdotes.map(a => a.id === id ? updated: a) }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({ anecdotes: state.anecdotes.filter(a => a.id !== id) }))
    },
    setFilter: value => set(() => ({ filter: value }))
  },
}))

const useNotificationStore = create(set => ({
  notification: '',
  actions: {
    setNotification: content => set(() => ({ notification: content }))
  }
}))

export default useAnecdoteStore

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const sortedAnecdotes = anecdotes.toSorted((a,b) => b.votes - a.votes)
  const filter = useAnecdoteStore((state) => state.filter)

  if (filter) return sortedAnecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  return sortedAnecdotes
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)