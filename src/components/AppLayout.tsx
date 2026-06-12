import { Outlet, Link, useLocation } from 'react-router-dom';
import { useStore } from '../lib/store';
import { BookOpen, Home, LayoutDashboard, Settings, Menu, X, Moon, Sun, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const theme = useStore(state => state.theme);
  const setTheme = useStore(state => state.setTheme);

  const navigation = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'المسارات', href: '/courses', icon: BookOpen },
    { name: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
    { name: 'الإعدادات', href: '/settings', icon: Settings },
  ];

  // Handle theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Close sidebar on navigate
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans flex flex-col w-full text-right text-[#1e293b] dark:text-slate-100 transition-colors">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 h-16 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600"
              >
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-blue-700 transition-colors">
                  C
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white hidden sm:block">CodeMaster Academy</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-semibold transition-colors",
                    location.pathname === item.href 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  )}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-full p-1">
                 <button onClick={() => setTheme('light')} className={cn("p-1.5 rounded-full transition-colors", theme === 'light' ? "bg-white dark:bg-slate-700 shadow" : "text-slate-500")} title="فاتح"><Sun size={18}/></button>
                 <button onClick={() => setTheme('system')} className={cn("p-1.5 rounded-full transition-colors", theme === 'system' ? "bg-white dark:bg-slate-700 shadow" : "text-slate-500")} title="تلقائي"><Monitor size={18}/></button>
                 <button onClick={() => setTheme('dark')} className={cn("p-1.5 rounded-full transition-colors", theme === 'dark' ? "bg-white dark:bg-slate-700 shadow" : "text-slate-500")} title="ليلي"><Moon size={18}/></button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 transform transition-transform">
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg">أكاديمية كود ماستر</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg font-medium",
                    location.pathname === item.href
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto shrink-0 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
               <BookOpen size={20} className="text-blue-600" />
               أكاديمية كود ماستر
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              تعلم البرمجة من الصفر حتى الاحتراف بدون الحاجة لخوادم. كل شيء محفوظ محلياً في جهازك.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/courses" className="hover:text-blue-600 transition-colors">جميع المسارات</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-600 transition-colors">لوحة التحكم</Link></li>
              <li><Link to="/settings" className="hover:text-blue-600 transition-colors">الإعدادات والبيانات</Link></li>
            </ul>
          </div>
          <div>
             <h4 className="font-semibold mb-4">قانوني ومساعدة</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">تواصل معنا</Link></li>
              <li><Link to="/faq" className="hover:text-blue-600 transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">شروط الاستخدام</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500">
           جميع الحقوق محفوظة © {new Date().getFullYear()} كود ماستر. لا يتم جمع أو إرسال أي بيانات لخوادم خارجية.
        </div>
      </footer>
    </div>
  );
}
