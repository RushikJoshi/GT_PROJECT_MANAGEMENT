import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       await login(email, password);
//       if (role === 'admin') navigate('/admin', { replace: true });
//       else if (role === 'manager') navigate('/manager', { replace: true });
//       else navigate('/me', { replace: true });
//     } catch (err: any) {
//       const message =
//         err?.response?.data?.error?.message || 'Login failed. Check your credentials.';
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        className="w-full max-w-md rounded-2xl bg-slate-950/90 border border-white/10 shadow-soft px-6 py-6"
      >
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-slate-50">Sign in to TaskHub</h1>
          <p className="text-xs text-slate-400 mt-1">
            Use your email and password. Roles are assigned on the backend.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-3 py-2 text-sm text-slate-50 outline-none focus:border-brand-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-3 py-2 text-sm text-slate-50 outline-none focus:border-brand-500"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-600 hover:bg-brand-500 text-sm font-medium text-white py-2.5 mt-2 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

