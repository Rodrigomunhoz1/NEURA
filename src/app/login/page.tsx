'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthForm } from '@/components/custom/auth-form';
import { getCurrentUser } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const user = await getCurrentUser();
    if (user) {
      router.push('/chat');
    } else {
      setChecking(false);
    }
  };

  const handleSuccess = () => {
    router.push('/chat');
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return <AuthForm onSuccess={handleSuccess} />;
}
