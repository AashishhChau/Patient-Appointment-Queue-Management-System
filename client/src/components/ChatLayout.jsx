import React, { useContext, useEffect, useState } from 'react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import messageApi from '../api/messageApi';
import { AuthContext } from '../context/AuthContext';

const ChatLayout = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial list of users/conversations
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await messageApi.fetchUsers();
        // Assuming API returns an array or response object { data: [...] }
        const userList = res.data || res;
        setUsers(userList);
      } catch (err) {
        setError('Failed to load conversations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle selecting a user
  const handleSelectConversation = async (user) => {
    try {
      setSelectedUser(user);
      setMessagesLoading(true);

      // Fetch conversation messages
      const res = await messageApi.getConversation(user.id);
      const msgList = res.data || res;
      setMessages(msgList);

      // Clear unread status locally for selected user
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, unreadCount: 0 } : u
        )
      );

      // Mark messages as read on the server
      await messageApi.markAsRead(user.id);
    } catch (err) {
      setError('Failed to load conversation');
      console.error(err);
    } finally {
      setMessagesLoading(false);
    }
  };

  // Polling for incoming messages
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await messageApi.getConversation(selectedUser.id);
        const msgList = res.data || res;
        
        // Update messages state if new messages arrived
        setMessages(msgList);
      } catch (err) {
        console.error('Error polling messages:', err);
      }
    };

    const intervalId = setInterval(fetchMessages, 3000);
    return () => clearInterval(intervalId);
  }, [selectedUser]);

  const handleSendMessage = async (content) => {
    if (!selectedUser || !content.trim()) return;

    try {
      const receiverId = selectedUser.id;
      const res = await messageApi.sendMessage(receiverId, content);
      const newMessage = res.data || res;

      setMessages((prev) => [...prev, newMessage]);

      // Update sidebar latest message preview
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? { ...u, lastMessage: content, lastMessageTime: new Date() }
            : u
        )
      );
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await messageApi.deleteMessage(messageId);
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    } catch (err) {
      setError('Failed to delete message');
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 antialiased overflow-hidden">
      {/* Sidebar / Conversation List */}
      <div className="w-80 md:w-96 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Chats</h2>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full">
            {currentUser?.role || 'User'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32 text-slate-400 text-sm">
              Loading chats...
            </div>
          ) : (
            <ConversationList
              users={users.filter((u) => u.role !== currentUser?.role)}
              selectedUserId={selectedUser?.id}
              onSelectConversation={handleSelectConversation}
            />
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-100/50 relative">
        {selectedUser ? (
          <ChatWindow
            messages={messages}
            receiver={selectedUser}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            onDeleteMessage={handleDeleteMessage}
            loading={messagesLoading}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="font-medium text-slate-600">Select a conversation to start messaging</p>
          </div>
        )}

        {/* Global Error Toast */}
        {error && (
          <div className="absolute bottom-4 left-4 bg-red-600 text-white text-xs px-4 py-2.5 rounded-lg shadow-lg flex items-center space-x-2">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-bold ml-2">&times;</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;