import { createContext, useContext } from 'react'

export const ChatWidgetContext = createContext({ openChat: () => {} })
export const useChatWidget = () => useContext(ChatWidgetContext)
