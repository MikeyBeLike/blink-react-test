import { useEffect, useRef, useState } from "react"
import { ConversationMessageSchema } from "../App"

interface ChatFormProps {
    enabled: boolean
    messageToEdit: ConversationMessageSchema | null
    onFormSubmit: (input: string) => void
    onChatFormEdit: (input: string) => void
}

export default function ChatForm(props: ChatFormProps) {
    const { messageToEdit, onFormSubmit, onChatFormEdit } = props

    const [chatInput, setChatInput] = useState('')

    const inputRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (messageToEdit) {
            setChatInput(messageToEdit.text)
        } else {
            setChatInput('')
        }
        inputRef.current?.focus()
    }, [messageToEdit])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!props.enabled) return
        if (!chatInput.trim()) return

        if (messageToEdit) {
            onChatFormEdit(chatInput)
        } else {
            onFormSubmit(chatInput)
        }
        setChatInput('')
    }

    return (
        <div className="p-8">
            <form className="flex items-center" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="chat-input">Chat Input</label>
                <textarea
                    required
                    name="chat-input"
                    className="flex-grow resize-none border border-black p-2 mr-2 focus:outline-none focus:border-blue-500"
                    id="chat-input"
                    value={chatInput}
                    onInput={e => setChatInput((e.target as HTMLInputElement).value)}
                    placeholder="Type a message.."
                    disabled={!props.enabled}
                    rows={1}
                />
                {
                    messageToEdit ? <button className="py-2 px-6 border border-black" type="submit">Edit</button>
                        : <button className="py-2 px-6 border border-black" type="submit">Submit</button>
                }
            </form>
        </div>
    )
}
