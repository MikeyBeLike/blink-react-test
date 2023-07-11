interface ConversationListProps {
    conversationList: Array<{
        id: string
        name: string
    }>
    className?: string
    onConversationClick: (id: string) => void
}

export default function ConversationList(props: ConversationListProps) {

    const { conversationList, onConversationClick } = props

    return (
        <ul className="space-y-3" data-testid="conversation-list-component">
            {
                conversationList.map(cl =>
                    <li key={cl.id}>
                        <button className="underline" onClick={() => onConversationClick(cl.id)}>{cl.name}</button>
                    </li>
                )
            }
        </ul>
    )
}
