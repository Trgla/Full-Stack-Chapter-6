import { createContext, useState } from "react"

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
    const [notification, setNotification] = useState('')

    const creation = (content) => setNotification(`anecdote '${content}' created`)
    const vote = (content) => setNotification(`anecdote '${content}' voted`)
    const lengthRequirement = () => setNotification('too short anecdote, must have length 5 or more')
    const timeOut = () => {
        setTimeout(() => {
        setNotification('')
        }, 5000)
    }
    return (
        <NotificationContext.Provider value={{ notification, creation, vote, lengthRequirement, timeOut }}>
            {props.children}
        </NotificationContext.Provider>
    )
}