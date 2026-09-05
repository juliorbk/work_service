'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Send, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AnimatedLogo } from '@/components/ui/animated-logo';
import { cn } from '@/lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_YOKO_API_URL ?? 'http://localhost:8080/api';
const ORG_SLUG = process.env.NEXT_PUBLIC_YOKO_ORG_SLUG ?? 'work-service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME: ChatMessage = {
  role: 'assistant',
  content:
    '¡Hola! Soy Vega, el concierge virtual de Work Services. Puedo ayudarte con información de nuestros espacios, precios y reservas. ¿Qué necesitas saber?',
};

const SUGGESTIONS = [
  '¿Qué espacios tienen disponibles?',
  '¿Cuánto cuesta una sala de reuniones?',
  'Quiero reservar un escritorio',
];

export function YokoWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open, sending]);

  const ensureSession = useCallback(async (): Promise<string> => {
    if (sessionIdRef.current) return sessionIdRef.current;
    const res = await fetch(`${API_BASE}/sessions/widget`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organizationSlug: ORG_SLUG }),
    });
    if (!res.ok) throw new Error('No se pudo iniciar la conversación');
    const session: { id: string } = await res.json();
    sessionIdRef.current = session.id;
    return session.id;
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;
      setInput('');
      setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
      setSending(true);
      try {
        const sessionId = await ensureSession();
        const res = await fetch(`${API_BASE}/sessions/widget/${sessionId}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: trimmed,
        });
        if (!res.ok) throw new Error();
        const reply = await res.text();
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Disculpa, tuve un problema de conexión. Intenta de nuevo en unos momentos.',
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [ensureSession, sending],
  );

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente de Work Services'}
        className={cn(
          'fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl overflow-hidden',
          open && 'bg-secondary text-secondary-foreground',
        )}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <AnimatedLogo
            light="/brand/isotipo.png"
            dark="/brand/isotipo-gold.png"
            alt=""
            width={56}
            height={56}
            className="w-14 h-14"
          />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-40 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[540px] max-h-[calc(100vh-12rem)] rounded-2xl bg-background border border-border shadow-2xl flex flex-col overflow-hidden animate-in">
          {/* Header */}
          <div className="bg-primary px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
              <AnimatedLogo
                light="/brand/isotipo.png"
                dark="/brand/isotipo-gold.png"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            <div>
              <p className="font-semibold text-primary-foreground leading-tight">Vega · Work Services</p>
              <p className="text-xs text-primary-foreground/80">Concierge virtual · En línea</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md',
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary/50 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-secondary/50 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-secondary/50 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Suggestions: solo al inicio */}
            {messages.length === 1 && !sending && (
              <div className="flex flex-col gap-2 pt-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left text-sm px-4 py-2.5 rounded-xl border border-border text-secondary hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Enviar mensaje"
              className="rounded-lg bg-primary text-primary-foreground p-2.5 disabled:opacity-40 hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
