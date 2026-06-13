import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserPlus, Zap, Book, Shield, Trophy } from 'lucide-react';
import { Level } from '../lib/projectsData';
import { SEO } from '../components/SEO';

export function ProjectLevelSelect() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const getTypeName = () => {
    switch (type) {
      case 'web': return 'موقع ويب';
      case 'app': return 'تطبيق';
      case 'game': return 'لعبة';
      default: return 'مشروع';
    }
  };

  const levels: { id: Level; title: string; desc: string; icon: any; bgClass: string; textClass: string }[] = [
    {
      id: 'absolute_beginner',
      title: 'مبتدئ تماماً',
      desc: 'لا تعرف البرمجة وتريد أن نبدأ معك خطوة بخطوة من الصفر.',
      icon: UserPlus,
      bgClass: 'bg-green-100 dark:bg-green-900/30',
      textClass: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'beginner',
      title: 'مبتدئ',
      desc: 'تعرف بعض الأساسيات البسيطة وتريد مشروعاً سهلاً للتدرب.',
      icon: Book,
      bgClass: 'bg-blue-100 dark:bg-blue-900/30',
      textClass: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'intermediate',
      title: 'متوسط',
      desc: 'قمت ببناء مشاريع صغيرة من قبل وتريد شيئاً أكثر تحدياً.',
      icon: Zap,
      bgClass: 'bg-amber-100 dark:bg-amber-900/30',
      textClass: 'text-amber-600 dark:text-amber-400'
    },
    {
      id: 'advanced',
      title: 'متقدم',
      desc: 'تفهم أغلب المفاهيم وتريد بناء مشاريع متقدمة وعملية.',
      icon: Shield,
      bgClass: 'bg-indigo-100 dark:bg-indigo-900/30',
      textClass: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      id: 'pro',
      title: 'محترف',
      desc: 'تريد التدريب العملي بدون تلميحات أو شروحات إضافية للمساعدة.',
      icon: Trophy,
      bgClass: 'bg-red-100 dark:bg-red-900/30',
      textClass: 'text-red-600 dark:text-red-400'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <SEO 
        title={`تحديد المستوى لبناء ${getTypeName()}`} 
        description={`اختر مستواك الحالي للبدء في تطبيق مشاريع ${getTypeName()} خطوة بخطوة.`}
      />
      <button 
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowRight size={20} />
        العودة لأنواع المشاريع
      </button>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">ما هو مستواك الحالي؟</h1>
        <p className="text-slate-600 dark:text-slate-400">
          اختر مستواك ليتم عرض المشاريع التي تناسبك لبناء {getTypeName()}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`/projects/${type}/${level.id}`}
            className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-slate-400 dark:hover:border-slate-600 transition-colors group"
          >
            <div className={`w-14 h-14 ${level.bgClass} ${level.textClass} rounded-xl flex items-center justify-center shrink-0 ml-6`}>
              <level.icon size={28} className={level.textClass} />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-xl font-bold mb-1">{level.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{level.desc}</p>
            </div>
            <ArrowLeft className="text-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors hidden sm:block" />
          </Link>
        ))}
      </div>
    </div>
  );
}
