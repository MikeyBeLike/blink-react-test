import { format } from 'date-fns'
import { useEffect, useRef } from 'react'
import { ConversationListSchema, ConversationMessageSchema } from "../App"

interface ConversationProps {
    selectedConvo: ConversationListSchema | null
    onTriggerEdit: (message: ConversationMessageSchema) => void
}

export default function Conversation(props: ConversationProps) {
    const { selectedConvo, onTriggerEdit } = props

    const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

    const sortedMessages = [...selectedConvo?.messages ?? []].sort((a, b) => a.last_updated.localeCompare(b.last_updated))

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [sortedMessages]);

    function formatDate(date: string) {
        return format(new Date(date), 'EEEE do MMMM HH:mm:ss')
    }

    return (
        <>
            {selectedConvo && sortedMessages.map(message => {
                return (
                    <div key={message.id} className="mb-5" tabIndex={0}>
                        <div className="text-xs"><time dateTime={message.last_updated}>{formatDate(message.last_updated)}</time></div>
                        <div className="cursor-pointer" tabIndex={0} data-testid="message" onClick={() => onTriggerEdit(message)}>{message.text}</div>
                    </div>
                )
            })}
            <div ref={endOfMessagesRef} />
        </>
    )

}