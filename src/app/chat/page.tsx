'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/supabase';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Send, 
  Loader2, 
  Trash2, 
  LogOut, 
  Mic, 
  Volume2, 
  Image as ImageIcon,
  Video,
  Sparkles,
  User
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
      setChecking(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <Sparkles className="h-4 w-4 text-pink-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Neura
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Assistente IA Completa
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              {user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="text-gray-600 hover:text-purple-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Olá! Sou a Neura 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Sua assistente de IA completa. Posso responder perguntas, analisar imagens, 
                processar áudio e muito mais. Como posso ajudar?
              </p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-purple-900">
                  <Mic className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Comando de Voz</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-pink-200 dark:border-pink-900">
                  <Volume2 className="h-6 w-6 text-pink-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Resposta em Áudio</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-blue-200 dark:border-blue-900">
                  <ImageIcon className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Análise de Imagens</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-indigo-200 dark:border-indigo-900">
                  <Video className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Processamento de Vídeo</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-800">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500">
                    <Brain className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>

              {message.role === 'user' && (
                <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-800">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500">
                    <User className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-800">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500">
                  <Brain className="h-4 w-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700">
                <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem... (Shift+Enter para nova linha)"
                className="min-h-[60px] max-h-[200px] resize-none pr-24 border-purple-200 focus:border-purple-400 dark:border-purple-800"
                disabled={isLoading}
              />
              <div className="absolute right-2 bottom-2 flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-purple-600"
                  title="Comando de voz (em breve)"
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                  title="Enviar imagem (em breve)"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-500 hover:text-indigo-600"
                  title="Enviar vídeo (em breve)"
                >
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-[60px] px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Neura pode cometer erros. Considere verificar informações importantes.
          </p>
        </div>
      </div>
    </div>
  );
}
