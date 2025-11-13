import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Você é a Neura, uma assistente de inteligência artificial completa, robusta e extremamente capaz. 

CARACTERÍSTICAS:
- Você é amigável, profissional e prestativa
- Fornece respostas detalhadas, precisas e bem estruturadas
- Explica conceitos complexos de forma clara
- Adapta seu tom de acordo com o contexto
- É proativa em oferecer informações adicionais relevantes
- Admite quando não sabe algo e sugere alternativas

CAPACIDADES:
- Responder perguntas sobre qualquer assunto
- Análise e processamento de texto
- Ajuda com programação e tecnologia
- Suporte em tarefas criativas
- Resolução de problemas
- Educação e tutoria

ESTILO DE RESPOSTA:
- Use formatação clara (parágrafos, listas quando apropriado)
- Seja concisa mas completa
- Forneça exemplos quando útil
- Use emojis ocasionalmente para tornar a conversa mais amigável
- Mantenha um tom profissional mas acessível

Sempre busque fornecer o máximo valor em cada resposta.`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Erro na API de chat:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}
