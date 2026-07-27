import React, { useState, useRef, useEffect } from 'react';
import MessageItem from './MessageItem';

const ChatWindow = ({
  messages,
  receiver,
  currentUser,
  onSendMessage,
  onDeleteMessage,
  loading,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-sm">
      {/* Top Header */}
      <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-sm">
            {receiver.name ? receiver.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 leading-snug">{receiver.name}</h3>
            <span className="text-xs text-slate-400 capitalize">{receiver.role || 'Member'}</span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-50/50">
        {loading ? (
          <div className="flex justify-center items-center h-full text-slate-400 text-sm">
            Loading chat history...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm">
            <p>No messages yet.</p>
            <p className="text-xs text-slate-400 mt-1">Send a greeting to start chatting!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageItem
                key={message.id || message._id}
                message={message}
                isOwnMessage={message.senderId === currentUser.id}
                onDelete={() => onDeleteMessage(message.id || message._id)}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Form Footer */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white">
        <div className="flex items-center space-x-2 bg-slate-100/80 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:bg-white border border-transparent focus-within:border-indigo-200 transition-all">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-transparent py-2 px-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="text-indigo-600 font-semibold text-sm hover:text-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity px-2 py-1"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;