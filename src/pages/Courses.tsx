import { useState } from 'react';
import { Link } from 'react-router-dom';
import { specialties } from '../lib/data';
import { Search } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Courses() {
  const [search, setSearch] = useState('');

  const filtered = specialties.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <SEO 
        title="المسارات التعليمية" 
        description="تصفح جميع المسارات التعليمية المتاحة لتعلم التقنيات المختلفة ولغات البرمجة."
      />
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">المسارات التعليمية</h1>
          <p className="text-slate-500 dark:text-slate-400">اختر مسارك وابدأ التعلم فوراً ببيئة تفاعلية منظمة.</p>
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="ابحث عن مسار..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
          <Search className="absolute right-3 top-3.5 text-slate-400" size={20} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
           <p className="text-slate-500 text-lg">لم يتم العثور على مسارات تطابق بحثك.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(spec => (
             <Link key={spec.id} to={`/course/${spec.id}`} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-400 transition-all flex flex-col h-full cursor-pointer">
                <div className={`w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                   <span className="font-bold text-xl">{spec.name[0]}</span>
                </div>
                <h4 className="font-bold text-sm mb-1">{spec.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex-1">{spec.description}</p>
                <div className="flex items-center text-[10px] font-bold text-slate-400 mt-auto justify-between">
                   <span>إبدأ الآن</span>
                   <span className="text-blue-600 group-hover:underline">استكشف</span>
                </div>
             </Link>
          ))}
        </div>
      )}
    </div>
  );
}
