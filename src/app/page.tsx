'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';
import { Loader2, Brain, Sparkles } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await getCurrentUser();
    if (user) {
      router.push('/chat');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">
      <div className="relative mb-6">
        <Brain className="h-20 w-20 text-purple-600 dark:text-purple-400 animate-pulse" />
        <Sparkles className="h-8 w-8 text-pink-500 absolute -top-2 -right-2 animate-bounce" />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
        Neura
      </h1>
      <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2" />
      <p className="text-gray-600 dark:text-gray-400">Carregando sua assistente IA...</p>
    </div>
  );
}
