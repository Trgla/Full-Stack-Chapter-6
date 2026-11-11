import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from './store'
import anecdoteService from './services/anecdotes'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
        remove: vi.fn(),
    }
}))

beforeEach(()  => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialized with the anecdotes returned by the backend', async () => {
    const mockAnecdotes = [{ content:'Test anecdote', id:'1', votes:0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const {result} = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })
    const {result: anecdoteResult} = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(mockAnecdotes)
})

  it('the component displaying anecdotes receives the anecdotes from the store sorted by votes', async () => {
    const mockAnecdotes = [{ content:'Second voted anecdote', id:'1', votes:8 },
                           { content:'Least voted anecdote', id:'2', votes:1 },
                           { content:'Most voted anecdote', id:'3', votes:10 },
                           { content:'Third voted anecdote', id:'4', votes:5 }]
    const sortedMockAnecdotes = mockAnecdotes.toSorted((a,b) => b.votes - a.votes)
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const {result} = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.initialize()
    })
    const {result: anecdoteResult} = renderHook(() => useAnecdotes()) 
    expect(anecdoteResult.current).toEqual(sortedMockAnecdotes)
  })

  it('voting increases the number of votes for an anecdote', async () => {
    const anecdote = { content:'Test anecdote', id:'1', votes:0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes:1 })

    const {result} = renderHook(() => useAnecdoteActions())
    await act(async () => {
      await result.current.voteCounter('1')
    })

    const {result: anecdoteResult} = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current[0].votes).toBe(1)
  })
})

describe('the correct React component receives a properly filtered list of anecdotes', () => {
  const anecdotes = [{ content:'Most voted anecdote means the most favorite of people', id:'3', votes:10 },
                     { content:'Second voted anecdote means the second most favorite', id:'1', votes:8 },
                     { content:'Third voted anecdote', id:'4', votes:5 },
                     { content:'Least voted anecdote from people', id:'2', votes:1 }]
  beforeEach(() => {
    useAnecdoteStore.setState({anecdotes})
  })

  it('returns all anecdotes with no filter', async () => {
    const {result} = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(4)
  })

  it(`returns anecdotes inlcuding 'people' `, async () => {
    useAnecdoteStore.setState({ anecdotes, filter: 'people' })
    const {result} = renderHook(() => useAnecdotes())
    expect(result.current).toEqual([anecdotes[0], anecdotes[3]])
  })

it(`returns anecdotes including 'third' `, async () => {
  useAnecdoteStore.setState({ anecdotes, filter: 'third' })
  const {result} = renderHook(() => useAnecdotes())
  expect(result.current).toEqual([anecdotes[2]])  
  })
})