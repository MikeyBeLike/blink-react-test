import { fireEvent, render, screen } from '@testing-library/react';
import ConversationList from './ConversationList';

test('renders conversations and handles clicks', () => {
    const mockConversationList = [
        { id: '1', name: 'Conversation 1' },
        { id: '2', name: 'Conversation 2' },
    ];

    const handleClick = jest.fn();

    render(<ConversationList conversationList={mockConversationList} onConversationClick={handleClick} />);

    mockConversationList.forEach(convo => {
        expect(screen.getByText(convo.name)).toBeInTheDocument();
    });

    const firstButton = screen.getByText(mockConversationList[0].name);
    fireEvent.click(firstButton);
    expect(handleClick).toHaveBeenCalledWith(mockConversationList[0].id);
});
