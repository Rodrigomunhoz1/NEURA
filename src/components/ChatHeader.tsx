'use client';

import { Trash2, Sparkles, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClearChat: () => void;
  messageCount: number;
}

export function ChatHeader({ onClearChat, messageCount }: ChatHeaderProps) {
  return (
    <div className="border-b bg-white dark:bg-gray-900 p-4 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              IA Assistant
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {messageCount > 0 ? `${messageCount} mensagens` : 'Pronto para conversar'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {messageCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearChat}
              className="gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4" />
              Limpar Chat
            </Button>
          )}
          
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </Button>
        </div>
      </div>
    </div>
  );
}