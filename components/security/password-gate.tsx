import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { motion } from '../../utils/motion';

type Status = 'checking' | 'locked' | 'unlocked';

interface PasswordGateProps<T> {
  /** Case study slug; its content is fetched from `/api/protected-post` once unlocked. */
  slug: string;
  /** Shown as the page h1 while the content is locked. */
  title?: string | null;
  children: (content: T) => ReactNode;
}

async function fetchContent<T>(slug: string): Promise<T | null> {
  const res = await fetch(`/api/protected-post?slug=${encodeURIComponent(slug)}`, { credentials: 'same-origin' });
  return res.ok ? ((await res.json()) as T) : null;
}

/**
 * Password form for protected case studies. The access cookie is httpOnly, so the gate
 * asks the server for the content: a visitor who already entered the password sees it
 * straight away, everyone else gets the form.
 */
export default function PasswordGate<T>({ slug, title, children }: PasswordGateProps<T>) {
  const [status, setStatus] = useState<Status>('checking');
  const [content, setContent] = useState<T | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchContent<T>(slug)
      .then((data) => {
        if (cancelled) return;
        setContent(data);
        setStatus(data ? 'unlocked' : 'locked');
      })
      .catch(() => !cancelled && setStatus('locked'));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError(res.status === 401 ? 'Password is incorrect' : 'Something went wrong. Try again later.');
        return;
      }
      const data = await fetchContent<T>(slug);
      if (!data) {
        setError('Something went wrong. Try again later.');
        return;
      }
      setContent(data);
      setStatus('unlocked');
    } catch {
      setError('Something went wrong. Try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  if (status === 'unlocked' && content) return <>{children(content)}</>;
  if (status === 'checking') {
    return (
      <div className="h-screen" aria-busy="true">
        <h1 className="sr-only">{title}</h1>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center px-4 w-full h-screen"
      style={{ backgroundColor: 'var(--background-color)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="flex flex-col w-full max-w-sm">
        {title && (
          <h1 className="mb-6 text-2xl font-normal" style={{ color: 'var(--text-color)' }}>
            {title}
          </h1>
        )}
        <label htmlFor="case-study-password" className="mb-2 text-sm" style={{ color: 'var(--text-color)' }}>
          This case study is password protected.
        </label>
        <div className="flex gap-1 w-full">
          <input
            id="case-study-password"
            type="password"
            autoComplete="current-password"
            required
            className="flex-grow p-4 font-normal rounded-xl border-2 text-md"
            style={{
              backgroundColor: 'var(--background-color)',
              color: 'var(--text-color)',
              borderColor: 'var(--accent)',
            }}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? 'case-study-password-error' : undefined}
          />
          <button
            type="submit"
            disabled={submitting}
            className="flex relative items-center px-4 py-3 text-xs uppercase rounded-xl cursor-pointer"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--text-color)' }}
          >
            Unlock
          </button>
        </div>
        <p
          id="case-study-password-error"
          role="alert"
          className="py-2 text-sm text-left"
          style={{ color: 'var(--text-color)' }}
        >
          {error}
        </p>
      </div>
    </motion.form>
  );
}
