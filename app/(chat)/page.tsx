import { cookies } from 'next/headers';
import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[
            {
              id: generateUUID(),
              role: 'assistant',
              content: 'Qué más parcero? Cómo va todo?',
              parts: [{ type: 'text', text: 'Qué más parcero? Cómo va todo?' }]
            },
            {
              id: generateUUID(),
              role: 'assistant',
              content: 'Recordá seguirme en mis redes sociales para desbloquear el modo experto. @blessd',
              parts: [{ type: 'text', text: 'Recordá seguirme en mis redes sociales para desbloquear el modo experto. @blessd' }]
            }
          ]}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[
          {
            id: generateUUID(),
            role: 'assistant',
            content: '¡Bienvenido al Asistente Blessd x Gaming!',
            parts: [{ type: 'text', text: '¡Bienvenido al Asistente Blessd x Gaming!' }]
          },
          {
            id: generateUUID(),
            role: 'assistant',
            content: 'Pregúntame lo que quieras sobre Blessd, su música, o pídele consejos sobre tus juegos favoritos.',
            parts: [{ type: 'text', text: 'Pregúntame lo que quieras sobre Blessd, su música, o pídele consejos sobre tus juegos favoritos.' }]
          }
        ]}
        initialChatModel={modelIdFromCookie.value}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
