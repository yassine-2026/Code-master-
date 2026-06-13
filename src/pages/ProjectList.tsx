import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, PlayCircle } from 'lucide-react';
import { realProjects, ProjectType, Level } from '../lib/projectsData';
import { SEO } from '../components/SEO';

export function ProjectList() {
  const { type, level } = useParams<{ type: ProjectType; level: Level }>();
  const navigate = useNavigate();

  const filteredProjects = realProjects.filter(p => p.type === type && p.level === level);

  const getLevelName = () => {
    switch (level) {
      case 'absolute_beginner': return 'مبتدئ تماماً';
      case 'beginner': return 'مبتدئ';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'متقدم';
      case 'pro': return 'محترف';
      default: return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <SEO 
        title={`مشاريع مستوى ${getLevelName()}`} 
        description={`قائمة المشاريع المتاحة لمستوى ${getLevelName()}. ابدأ ببناء مشاريع حقيقية لتطوير مهاراتك.`}
      />
      <button 
        onClick={() => navigate(`/projects/${type}`)}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowRight size={20} />
        العودة واختيار مستوى آخر
      </button>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">مشاريع مستوى {getLevelName()}</h1>
        <p className="text-slate-600 dark:text-slate-400">
          اختر مشروعاً للبدء في بنائه خطوة بخطوة.
        </p>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8 text-center text-slate-500">
          لا توجد مشاريع متاحة حالياً لهذا المستوى. سيتم إضافة مشاريع قريباً!
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">{project.description}</p>
              
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
                <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                  المراحل: {project.stages.length}
                </span>
                <Link
                  to={`/projects/workspace/${project.id}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
                >
                  <PlayCircle size={18} />
                  بدء العمل
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
