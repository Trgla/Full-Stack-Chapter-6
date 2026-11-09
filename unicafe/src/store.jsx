import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useCounterStore = create(set => ({
  counter: 0,
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    goodCounter: () => set(state => ({ counter: state.counter + 1, good: state.good + 1 })),
    neutralCounter: () => set(state => ({ counter: state.counter + 1, neutral: state.neutral + 1 })),
    badCounter: () => set(state => ({ counter: state.counter + 1, bad: state.bad + 1 }))
  }
}))

export const useValues = () => useCounterStore(
    useShallow((state) => ({
        counter: state.counter,
        good: state.good,
        neutral: state.neutral,
        bad: state.bad
    }))
)

export const useCounterActions = () => useCounterStore(state => state.actions)