import React from 'react';

const ConversationList = ({ users, selectedUserId, onSelectConversation }) => {
  if (users.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 text-sm">
        No active conversations found
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {users.map((user) => {
        const isSelected = selectedUserId === user.id;
        const hasUnread = user.unreadCount > 0;

        return (
          <div
            key={user.id}
            onClick={() => onSelectConversation(user)}
            className={`flex items-center px-4 py-3.5 cursor-pointer transition-colors duration-150 ${
              isSelected
                ? 'bg-indigo-50/70 border-l-4 border-indigo-600'
                : 'hover:bg-slate-50'
            }`}
          >
            {/* Avatar Container */}
            <div className="relative shrink-0 mr-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold text-lg shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              {/* Online indicator dot optional */}
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Conversation Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h4
                  className={`text-sm truncate ${
                    hasUnread || isSelected
                      ? 'font-bold text-slate-900'
                      : 'font-medium text-slate-700'
                  }`}
                >
                  {user.name}
                </h4>
                {user.lastMessageTime && (
                  <span className="text-[11px] text-slate-400 shrink-0 ml-2">
                    {new Date(user.lastMessageTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p
                  className={`text-xs truncate max-w-[180px] ${
                    hasUnread
                      ? 'font-semibold text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  {user.lastMessage || `${user.role || 'User'}`}
                </p>

                {/* Unread Counter Badge */}
                {hasUnread && (
                  <span className="ml-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center">
                    {user.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;