'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Lock, Users, BarChart3 } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';

export default function LandingPage() {
  const router = useRouter();
  const { mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-sava-dark transition-colors duration-300">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-sava-dark/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sava-primary to-sava-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-lg text-sava-primary dark:text-white">SAVA</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2 bg-sava-primary hover:bg-sava-secondary text-white rounded-lg transition-all duration-300 font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden bg-gradient-to-br from-sava-primary via-sava-secondary to-sava-primary dark:from-sava-dark dark:via-sava-primary dark:to-sava-dark"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sava-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fadeInUp">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="w-full h-full bg-white rounded-lg flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-sava-primary">SAVA</span>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            SAVA Technical Institute
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Enterprise Resource Planning System for Complete Institute Management
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              <Users className="w-8 h-8 text-sava-accent mx-auto mb-3" />
              <p className="text-white font-medium">1000+ Users</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              <BarChart3 className="w-8 h-8 text-sava-accent mx-auto mb-3" />
              <p className="text-white font-medium">Advanced Analytics</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              <Lock className="w-8 h-8 text-sava-accent mx-auto mb-3" />
              <p className="text-white font-medium">Secure Access</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/login')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-sava-accent hover:bg-sava-accent/90 text-sava-primary font-bold text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            Get Started
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-sava-primary dark:text-white mb-16">
            Complete Institute Management
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Student Management', desc: 'Track profiles, grades, attendance, and payments' },
              { title: 'Teacher Dashboard', desc: 'Manage classes, grades, and student performance' },
              { title: 'Admin Control', desc: 'Full system configuration and user management' },
              { title: 'Exam System', desc: 'Quiz, midterm, final, and practical exams' },
              { title: 'Payment Tracking', desc: 'Monitor tuition and remaining balances' },
              { title: 'Reports & Analytics', desc: 'Comprehensive performance insights' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
              >
                <h3 className="text-xl font-bold text-sava-primary dark:text-sava-accent mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sava-primary dark:bg-black py-8 px-4 text-center text-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-300 mb-4">© 2026 SAVA Technical Institute. All rights reserved.</p>
          <p className="text-sm text-gray-400">Enterprise Resource Planning System v1.0</p>
        </div>
      </footer>
    </div>
  );
}
