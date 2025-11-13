import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Pegar token do cookie
  const token = request.cookies.get('sb-access-token')?.value;

  // Verificar se está autenticado
  const { data: { user } } = await supabase.auth.getUser(token);

  // Se não está autenticado e tenta acessar /chat, redireciona para login
  if (!user && request.nextUrl.pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se está autenticado e tenta acessar /login, redireciona para chat
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/chat', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat/:path*', '/login'],
};
