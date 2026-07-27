import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const MessageItem = ({ message, isOwnMessage, onDelete }) => {
  return (
    <div
      className={`flex flex-col group ${
        isOwnMessage ? 'items-end' : 'items-start'
      }`}
    >
      <div className="flex items-end space-x-2 max-w-[75%]">
        {/* Chat Bubble */}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm break-words ${
            isOwnMessage
              ? 'bg-indigo-600 text-white rounded-br-none'
              : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
          }`}
        >
          {message.content}
        </div>

        {/* Delete Action Button (Visible on Hover) */}
        {isOwnMessage && (
          <button
            onClick={onDelete}
            title="Delete message"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-red-500 text-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Timestamp */}
      <span className="text-[10px] text-slate-400 mt-1 px-1">
        {message.createdAt
          ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })
          : 'Just now'}
      </span>
    </div>
  );
};

export default MessageItem;