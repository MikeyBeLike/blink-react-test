import { fireEvent, render, screen } from '@testing-library/react'
import Conversation from './Conversation'

describe('Conversation component', () => {
    const mockOnTriggerEdit = jest.fn()
    const mockScrollIntoView = jest.fn()

    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders and sorts messages correctly', () => {
        const selectedConvo = {
            id: 'conversation1',
            name: 'Test Conversation',
            last_updated: new Date().toISOString(),
            messages: [
                { id: '1', text: 'Message 1', last_updated: '2023-07-14T12:00:00.000Z' },
                { id: '2', text: 'Message 2', last_updated: '2023-07-13T12:00:00.000Z' },
            ],
        }

        render(<Conversation selectedConvo={selectedConvo} onTriggerEdit={mockOnTriggerEdit} />)

        const renderedMessages = screen.getAllByTestId('message').map(ele => ele.textContent)
        const expectedMessages = [selectedConvo.messages[1].text, selectedConvo.messages[0].text]

        expect(renderedMessages).toEqual(expectedMessages)
    })

    it('calls onTriggerEdit when a message is clicked', () => {
        const selectedConvo = {
            id: 'conversation1',
            name: 'Test Conversation',
            last_updated: new Date().toISOString(),
            messages: [
                { id: '1', text: 'Message 1', last_updated: '2023-07-14T12:00:00.000Z' },
            ],
        }

        render(<Conversation selectedConvo={selectedConvo} onTriggerEdit={mockOnTriggerEdit} />)

        fireEvent.click(screen.getByText('Message 1'))

        expect(mockOnTriggerEdit).toHaveBeenCalled()
    })

    it('scrolls the most recent message into view when a new message is added', () => {
        const selectedConvo = {
            id: 'conversation1',
            name: 'Test Conversation',
            last_updated: '2023-07-14T12:00:00.000Z',
            messages: [
                { id: '1', text: 'Message 1', last_updated: '2023-07-14T12:00:00.000Z' },
            ],
        }

        const newConvo = {
            ...selectedConvo,
            messages: [
                ...selectedConvo.messages,
                { id: '2', text: 'Message 2', last_updated: '2023-07-15T12:00:00.000Z' },
            ],
        }

        const { rerender } = render(<Conversation selectedConvo={selectedConvo} onTriggerEdit={mockOnTriggerEdit} />)

        rerender(<Conversation selectedConvo={newConvo} onTriggerEdit={mockOnTriggerEdit} />)

        expect(mockScrollIntoView).toHaveBeenCalled()
    })
})
