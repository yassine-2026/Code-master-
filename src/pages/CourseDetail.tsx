import { useParams, Link } from 'react-router-dom';
import { specialties, mockCourses, Course } from '../lib/data';
import { useStore } from '../lib/store';
import { PlayCircle, CheckCircle2, Circle, Heart, ArrowLeft, Trophy, Flag, BookOpen, Star, Zap } from 'lucide-react';

function LevelSelector({ course, onSelect }: { course: Course, onSelect: (level: any) => void }) {
  const levels = [
    { id: 'مبتدئ تماماً', icon: Flag, title: 'مبتدئ تماماً', desc: 'لم أكتب أي كود سابقاً، أريد البدء من الصفر.' },
    { id: 'معرفة بسيطة', icon: BookOpen, title: 'معرفة بسيطة', desc: 'أعرف الأساسيات وأحتاج لتثبيت المفاهيم.' },
    { id: 'متوسط', icon: Star, title: 'متوسط', desc: 'أمتلك خبرة جيدة وأريد دروساً متقدمة ومشاريع.' },
    { id: 'متقدم', icon: Zap, title: 'متقدم', desc: 'أبحث عن التحديات والممارسات الاحترافية فقط.' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 text-center space-y-8">
       <h2 className="text-3xl font-bold">بناء خطتك التعليمية</h2>
       <p className="text-slate-500">لتقديم أفضل تجربة مناسبة لك في مسار {course.title}، حدد مستواك الحالي:</p>
       <div className="grid sm:grid-cols-2 gap-4 text-right">
          {levels.map(level => (
             <button key={level.id} onClick={() => onSelect(level.id)} className="border border-slate-200 dark:border-slate-800 p-6 rounded-2xl bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-lg transition-all text-right flex flex-col items-start gap-4 group">
                <div className="w-12 h-12 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                   <level.icon size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-lg mb-1">{level.title}</h3>
                   <p className="text-sm text-slate-500">{level.desc}</p>
                </div>
             </button>
          ))}
       </div>
    </div>
  );
}

export function CourseDetail() {
  const { id } = useParams();
  const specialty = specialties.find(s => s.id === id);
  const course = mockCourses.find(c => c.specialtyId === id);
  
  const completedLessons = useStore(state => state.completedLessons);
  const favorites = useStore(state => state.favorites);
  const toggleFavorite = useStore(state => state.toggleFavorite);
  const courseLevels = useStore(state => state.courseLevels);
  const setCourseLevel = useStore(state => state.setCourseLevel);

  if (!specialty || !course) {
    return <div className="text-center py-20"><h2 className="text-2xl font-bold">المسار غير موجود</h2><Link to="/courses" className="text-blue-600 mt-4 inline-block">العودة للمسارات</Link></div>;
  }

  const currentLevel = courseLevels[course.id];
  if (!currentLevel) {
     return <LevelSelector course={course} onSelect={(level) => setCourseLevel(course.id, level)} />;
  }

  const isFavorite = favorites.includes(course.id);
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = course.modules.reduce((acc, m) => 
    acc + m.lessons.filter(l => completedLessons.includes(l.id)).length, 0);
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className={`${specialty.color} rounded-2xl p-8 md:p-12 text-white shadow-lg relative overflow-hidden`}>
         <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-black mb-4">{specialty.name}</h1>
              <p className="text-lg opacity-90 mb-6">{course.description}</p>
              <div className="flex flex-wrap gap-4 items-center">
                 <span className="bg-black/20 px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-md">المستوى: {course.level}</span>
                 <span className="bg-black/20 px-4 py-2 rounded-full font-semibold text-sm backdrop-blur-md">{totalLessons} درس</span>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 w-full md:w-auto min-w-[250px]">
               <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">تقدمك</span>
                  <span className="font-bold text-xl">{progressPercent}%</span>
               </div>
               <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden mb-6">
                 <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
               </div>
               <div className="flex flex-col gap-3">
                 <Link to={`/learn/${course.id}`} className="bg-white text-black text-center font-bold py-3 rounded-xl hover:scale-105 transition-transform">
                   {progressPercent > 0 ? "متابعة التعلم" : "ابدأ الآن"}
                 </Link>
                 <button 
                  onClick={() => toggleFavorite(course.id)} 
                  className={`border-2 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${isFavorite ? 'border-red-400 bg-red-500/20 text-white' : 'border-white/30 hover:bg-white/10 text-white'}`}>
                   <Heart size={20} className={isFavorite ? 'fill-red-400 text-red-400' : ''} />
                   {isFavorite ? 'في المفضلة' : 'أضف للمفضلة'}
                 </button>
               </div>
            </div>
         </div>
         {/* Background Decoration */}
         <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Modules List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
         <h2 className="text-2xl font-bold mb-6">محتوى المسار</h2>
         
         <div className="space-y-6 text-right">
           {course.modules.map((module, mIdx) => (
             <div key={module.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
               <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-lg flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 flex items-center justify-center text-sm">{mIdx + 1}</div>
                 {module.title}
               </div>
               <div className="divide-y divide-slate-100 dark:divide-slate-800">
                 {module.lessons.map((lesson) => {
                   const isCompleted = completedLessons.includes(lesson.id);
                   return (
                     <Link to={`/learn/${course.id}/${lesson.id}`} key={lesson.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group">
                       <div className="flex items-center gap-3">
                         {isCompleted ? (
                           <CheckCircle2 className="text-green-500" size={24} />
                         ) : (
                           <Circle className="text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors" size={24} />
                         )}
                         <div>
                           <div className="font-semibold">{lesson.title}</div>
                           <div className="text-sm text-slate-500 flex items-center gap-2">
                             {lesson.type === 'video' ? 'فيديو' : lesson.type === 'text' ? 'قراءة' : lesson.type === 'quiz' ? 'اختبار' : 'مشروع'}
                             <span>•</span>
                             {lesson.duration} دقيقة
                           </div>
                         </div>
                       </div>
                       <PlayCircle className="text-slate-400 group-hover:text-blue-600 transition-colors" size={20} />
                     </Link>
                   );
                 })}
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}
