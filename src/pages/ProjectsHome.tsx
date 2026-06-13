import { Link } from 'react-router-dom';
import { Globe, Smartphone, Gamepad2, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function ProjectsHome() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <SEO 
        title="المشاريع العملية" 
        description="توقف عن المشاهدة وابدأ ببناء مشاريع حقيقية خطوة بخطوة. اختر المسار الذي تريده وابدأ التطبيق العملي."
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          مشاريع العالم الحقيقي
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          توقف عن المشاهدة وابدأ ببناء مشاريع حقيقية خطوة بخطوة. اختر المسار الذي تريده وابدأ التطبيق العملي.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Link 
          to="/projects/web"
          className="group bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Globe size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">أنشئ موقعك الأول</h2>
              <p className="text-slate-500 dark:text-slate-400">ابنِ مواقع وتطبيقات ويب تفاعلية باستخدام HTML, CSS, JavaScript والمزيد.</p>
            </div>
          </div>
          <ArrowLeft size={24} className="text-slate-400 group-hover:text-blue-500 group-hover:-translate-x-2 transition-all opacity-0 sm:opacity-100 hidden sm:block" />
        </Link>

        <Link 
          to="/projects/app"
          className="group bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Smartphone size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">أنشئ تطبيقك الأول</h2>
              <p className="text-slate-500 dark:text-slate-400">برمج تطبيقات هواتف ذكية أو تطبيقات إنتاجية تساعدك في حياتك اليومية.</p>
            </div>
          </div>
          <ArrowLeft size={24} className="text-slate-400 group-hover:text-indigo-500 group-hover:-translate-x-2 transition-all opacity-0 sm:opacity-100 hidden sm:block" />
        </Link>

        <Link 
          to="/projects/game"
          className="group bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Gamepad2 size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">أنشئ لعبتك الأولى</h2>
              <p className="text-slate-500 dark:text-slate-400">ادخل عالم الألعاب وابدأ ببرمجة ألعاب الذكاء والأكشن الخاصة بك بمتعة.</p>
            </div>
          </div>
          <ArrowLeft size={24} className="text-slate-400 group-hover:text-emerald-500 group-hover:-translate-x-2 transition-all opacity-0 sm:opacity-100 hidden sm:block" />
        </Link>
      </div>
    </div>
  );
}
