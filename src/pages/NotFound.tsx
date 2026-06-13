import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SEO title="الصفحة غير موجودة | 404" description="الصفحة التي تبحث عنها غير موجودة." />
      <h1 className="text-6xl font-bold text-slate-300 dark:text-slate-700 mb-4">404</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">عذراً، الصفحة التي تحاول الوصول إليها غير موجودة.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">العودة للرئيسية</Link>
    </div>
  );
}
