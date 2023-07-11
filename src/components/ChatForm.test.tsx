import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ChatForm from './ChatForm'

describe('ChatForm component', () => {
    const mockOnFormSubmit = jest.fn()
    const mockOnChatFormEdit = jest.fn()
    const mockMessageToEdit = {
        id: '1',
        conversation_id: '1',
        sender: 'sender',
        text: 'Edit this message',
        last_updated: '2021-01-01T00:00:00Z'
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    afterEach(cleanup)

    it('renders and is initially empty', () => {
        render(<ChatForm enabled={true} messageToEdit={null} onFormSubmit={mockOnFormSubmit} onChatFormEdit={mockOnChatFormEdit} />)
        const textarea = screen.getByLabelText<HTMLTextAreaElement>('Chat Input')
        expect(textarea.value).toBe('')
    })

    it('is not enabled when props.enabled is false', () => {
        render(<ChatForm enabled={false} messageToEdit={null} onFormSubmit={mockOnFormSubmit} onChatFormEdit={mockOnChatFormEdit} />)
        const textarea = screen.getByLabelText<HTMLTextAreaElement>('Chat Input')
        expect(textarea).toBeDisabled()
    })

    it('fills textarea with message text when a message is selected for editing', () => {
        render(<ChatForm enabled={true} messageToEdit={mockMessageToEdit} onFormSubmit={mockOnFormSubmit} onChatFormEdit={mockOnChatFormEdit} />)
        const textarea = screen.getByLabelText<HTMLTextAreaElement>('Chat Input')
        expect(textarea.value).toBe('Edit this message')
    })

    it('triggers the correct callback and clears form after submission', () => {
        render(<ChatForm enabled={true} messageToEdit={null} onFormSubmit={mockOnFormSubmit} onChatFormEdit={mockOnChatFormEdit} />)
        const textarea = screen.getByLabelText<HTMLTextAreaElement>('Chat Input')
        const submitButton = screen.getByText('Submit')

        fireEvent.input(textarea, { target: { value: 'New message' } })
        fireEvent.click(submitButton)
        expect(mockOnFormSubmit).toHaveBeenCalledWith('New message')
        expect(textarea.value).toBe('')
    })

    it('prevents form from being submitted when input is empty or contains white space', () => {
        render(<ChatForm enabled={true} messageToEdit={null} onFormSubmit={mockOnFormSubmit} onChatFormEdit={mockOnChatFormEdit} />)
        const textarea = screen.getByLabelText<HTMLTextAreaElement>('Chat Input')
        const submitButton = screen.getByText('Submit')

        fireEvent.input(textarea, { target: { value: '   ' } })
        fireEvent.click(submitButton)
        expect(mockOnFormSubmit).not.toHaveBeenCalled()
    })
})
