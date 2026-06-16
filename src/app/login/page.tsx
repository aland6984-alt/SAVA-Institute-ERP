'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { authenticateByCustomId, signIn } from '@/lib/auth';
import toast from 'react-hot-toast';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { theme } = useTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!identifier || !password) {
        setError('Please enter both ID/Email and password');
        setIsLoading(false);
        return;
      }

      let authResult;

      // Check if identifier is an email or custom ID
      if (identifier.includes('@')) {
        authResult = await signIn(identifier, password);
      } else {
        authResult = await authenticateByCustomId(identifier, password);
      }

      if (authResult.error) {
        setError(authResult.error.message || 'Invalid credentials');
        toast.error('Login failed');
        setIsLoading(false);
        return;
      }

      if (authResult.data?.user) {
        toast.success('Login successful!');
        // Redirect will happen automatically
        router.push('/dashboard/student');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      toast.error('Login error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23001F3F;stop-opacity:1" /><stop offset="100%" style="stop-color:%230052A3;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="600" fill="url(%23grad1)"/></svg>')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-glass bg-glass dark:bg-glass-dark rounded-2xl p-8 shadow-glass dark:shadow-glass-dark border border-white/10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-sava-primary to-sava-secondary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">SAVA</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">SAVA Institute</h1>
            <p className="text-gray-200 text-sm">Enterprise Resource Planning System</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* ID/Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Student ID / Teacher ID / Email
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="STU00001 or email@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 dark:bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-sava-accent focus:ring-2 focus:ring-sava-accent/50 transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 dark:bg-black/20 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-sava-accent focus:ring-2 focus:ring-sava-accent/50 transition-all"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-sava-primary to-sava-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sava-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-300">
            <p>🔐 Secure Login • Multi-Role Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
