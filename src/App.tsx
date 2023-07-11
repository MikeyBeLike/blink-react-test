import { useEffect, useState } from 'react';
import ChatForm from './components/ChatForm';
import Conversation from './components/Conversation';
import ConversationList from './components/ConversationList';

export interface ConversationListSchema {
  id: string
  name: string
  last_updated: string
  messages: ConversationMessageSchema[]
}

export interface ConversationMessageSchema {
  id: string
  text: string
  last_updated: string
}

function App() {

  const [chatData, setChatData] = useState<ConversationListSchema[]>([])
  const [selectedConvo, setSelectedConvo] = useState<ConversationListSchema | null>(null)
  const [messageToEdit, setMessageToEdit] = useState<ConversationMessageSchema | null>(null)

  useEffect(() => {
    fetch('/chat-data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((sortedConvos: ConversationListSchema[]) => {
        sortedConvos.sort((a, b) => a.last_updated.localeCompare(b.last_updated));
        setChatData(sortedConvos);
      })
      .catch(error => {
        console.error('Unable to fetch data: ', error)
        alert('Unable to fetch data')
      })
  }, [])

  function updateSelectedConvo(id: string) {
    const convo = chatData.find(c => c.id === id)

    if (!convo) {
      alert('Unable to find the selected conversation.')
      return
    }

    setSelectedConvo(convo)
    setMessageToEdit(null)
  }

  function onChatFormSubmit(inputText: string) {
    if (!selectedConvo) return

    const chatIndex = chatData.findIndex(c => c.id === selectedConvo.id)

    const lastUpdated = new Date().toISOString()

    const newMessage: ConversationMessageSchema = {
      id: new Date().getTime().toString(),
      last_updated: lastUpdated,
      text: inputText
    }

    const updatedConvo: ConversationListSchema = {
      ...selectedConvo,
      last_updated: lastUpdated,
      messages: [
        ...selectedConvo.messages,
        newMessage
      ]
    }

    setChatData(prev => prev.map((cd, i) => i === chatIndex ? updatedConvo : cd))

    setSelectedConvo(updatedConvo)
  }

  function onTriggerEdit(message: ConversationMessageSchema) {
    setMessageToEdit(message)
  }

  function onChatFormEdit(inputText: string) {
    if (!selectedConvo || !messageToEdit) return

    const chatIndex = chatData.findIndex(c => c.id === selectedConvo.id)

    const lastUpdated = new Date().toISOString()

    const updatedConvo: ConversationListSchema = {
      ...selectedConvo,
      last_updated: lastUpdated,
      messages: selectedConvo.messages.map(m => {
        if (m.id === messageToEdit.id) {
          return {
            ...m,
            text: inputText,
          }
        } else {
          return m
        }
      })
    }

    setChatData(prev => prev.map((cd, i) => i === chatIndex ? updatedConvo : cd))

    setSelectedConvo(updatedConvo)
    setMessageToEdit(null)
  }

  return (
    <div className="App h-screen py-8 text-base" data-testid="app-component">
      <div className="flex max-w-screen-xl mx-auto border border-black h-full">
        <div className="w-72 pt-8 px-6 border-r border-black">
          <ConversationList
            conversationList={chatData.map(c => ({ id: c.id, name: c.name }))}
            onConversationClick={(id) => updateSelectedConvo(id)}
          />
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="px-8 overflow-scroll pt-8 border-b border-black flex-grow">
            <Conversation
              selectedConvo={selectedConvo}
              onTriggerEdit={message => onTriggerEdit(message)}
            />
          </div>
          <ChatForm
            enabled={!!selectedConvo}
            messageToEdit={messageToEdit}
            onFormSubmit={inputText => onChatFormSubmit(inputText)}
            onChatFormEdit={inputText => onChatFormEdit(inputText)}
          />
        </div>

      </div>

    </div>
  );
}

export default App;
