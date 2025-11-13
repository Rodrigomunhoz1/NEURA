'use client';

import { Message } from '@/lib/types';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-2xl max-w-4xl mx-auto",
      isUser ? "bg-blue-50 dark:bg-blue-950/30" : "bg-gray-50 dark:bg-gray-900/50"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser 
          ? "bg-blue-500 text-white" 
          : "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
      )}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">
            {isUser ? 'Você' : 'IA Assistant'}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}