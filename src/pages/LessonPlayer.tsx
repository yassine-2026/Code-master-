import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockCourses } from '../lib/data';
import { useStore } from '../lib/store';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CheckCircle2, ChevronRight, ChevronLeft, List, Trophy, PlayCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { InteractiveEditor } from '../components/InteractiveEditor';

export function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);
  const markLessonComplete = useStore(state => state.markLessonComplete);
  const completedLessons = useStore(state => state.completedLessons);
  const setLastVisited = useStore(state => state.setLastVisited);
  const saveQuizResult = useStore(state => state.saveQuizResult);
  const quizResults = useStore(state => state.quizResults);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [interactivePassed, setInteractivePassed] = useState(false);
  
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (courseId && lessonId) {
      setLastVisited(courseId, lessonId);
      // reset score visible when changing lessons
      setQuizScore(null);
      setInteractivePassed(completedLessons.includes(lessonId));
      setQuizAnswers({});
      setQuizSubmitted(false);
    }
  }, [courseId, lessonId, setLastVisited, completedLessons]);

  if (!course) return <div>مسار غير موجود</div>;

  // Flatten lessons to find current, next, prev
  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLessonIndex = lessonId 
    ? allLessons.findIndex(l => l.id === lessonId)
    : 0;
  
  const currentLesson = allLessons[currentLessonIndex];
  
  // If no lesson specified but course is, redirect to first lesson or last visited
  useEffect(() => {
     if (!lessonId && allLessons.length > 0) {
        navigate(`/learn/${course.id}/${allLessons[0].id}`, { replace: true });
     }
  }, [lessonId, allLessons, course.id, navigate]);

  if (!currentLesson) return <div>جاري التحميل...</div>;

  const prevLesson = allLessons[currentLessonIndex - 1];
  const nextLesson = allLessons[currentLessonIndex + 1];
  const isCompleted = completedLessons.includes(currentLesson.id);

  const handleComplete = () => {
    if (currentLesson.type === 'interactive' && !interactivePassed) {
       alert("الرجاء اجتياز التمرين التفاعلي أولاً للتمكن من الانتقال للدرس التالي.");
       return;
    }
    markLessonComplete(course.id, currentLesson.id);
    if (nextLesson) {
      navigate(`/learn/${course.id}/${nextLesson.id}`);
    }
  };

  const handleInteractiveSuccess = () => {
     setInteractivePassed(true);
     markLessonComplete(course.id, currentLesson.id);
  };

  const handleQuizSubmit = () => {
     if (currentLesson.quizData) {
       let correct = 0;
       currentLesson.quizData.forEach((q, i) => {
         if (quizAnswers[i] === q.correctAnswer) correct++;
       });
       const score = Math.round((correct / currentLesson.quizData.length) * 100);
       saveQuizResult(currentLesson.id, score);
       setQuizScore(score);
       setQuizSubmitted(true);
       if (score >= 80) {
         markLessonComplete(course.id, currentLesson.id);
       }
     } else {
       // fallback for mock quizzes
       const score = Math.floor(Math.random() * 21) + 80; // 80-100 score
       saveQuizResult(currentLesson.id, score);
       setQuizScore(score);
       markLessonComplete(course.id, currentLesson.id);
     }
  };

  const getTypeLabel = (type: string) => {
    if (type === 'video') return 'فيديو';
    if (type === 'quiz') return 'اختبار';
    if (type === 'interactive') return 'تفاعلي';
    return 'مقال';
  };

  return (
    <div className="flex bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[calc(100vh-8rem)]">
      
      {/* Sidebar for Navigation */}
      <div className={cn(
        "w-80 bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shrink-0 flex flex-col transition-all absolute md:relative z-20 h-full",
        sidebarOpen ? "translate-x-0 right-0 shadow-2xl" : "translate-x-full right-0 md:translate-x-0"
      )}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0">
          <h3 className="font-bold text-sm truncate">{course.title}</h3>
          <button className="md:hidden text-slate-500" onClick={() => setSidebarOpen(false)}>إغلاق</button>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-4 text-right">
          {course.modules.map((m, i) => (
            <div key={m.id}>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 px-2">وحدة {i + 1}: {m.title}</div>
              <div className="space-y-1">
                {m.lessons.map(l => (
                  <Link 
                    key={l.id} 
                    to={`/learn/${course.id}/${l.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg text-sm transition-colors",
                      l.id === currentLesson.id ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-bold" : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <span className="truncate ml-2">{l.title}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-slate-400">{getTypeLabel(l.type)}</span>
                       {completedLessons.includes(l.id) && <CheckCircle2 size={16} className="text-green-500 shrink-0" />}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-stretch overflow-hidden relative">
         {/* Mobile overlay */}
         {sidebarOpen && <div className="absolute inset-0 bg-black/50 z-10 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
         
         <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex justify-between items-center z-0 shrink-0">
           <button onClick={() => setSidebarOpen(true)} className="md:hidden flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg">
             <List size={18} /> الفهرس
           </button>
           <h2 className="font-bold text-lg hidden md:block">{currentLesson.title}</h2>
           <Link to={`/course/${course.id}`} className="text-slate-500 hover:text-black dark:hover:text-white px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold transition-colors">مغادرة</Link>
         </div>

         <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white dark:bg-slate-950">
           <div className="max-w-4xl mx-auto space-y-8">
             <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-6">
                <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs px-2 py-1 rounded font-bold mb-3">{getTypeLabel(currentLesson.type)}</span>
                <h1 className="text-3xl font-bold mb-4 text-right">{currentLesson.title}</h1>
             </div>

             {/* Content based on type */}
             {currentLesson.type === 'interactive' && currentLesson.interactiveData && (
                <div className="space-y-6">
                   <div className="markdown-body dark:prose-invert text-slate-800 dark:text-slate-200 text-right leading-relaxed text-lg" dir="rtl">
                      <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                   </div>
                   
                   <InteractiveEditor 
                      initialCode={currentLesson.interactiveData.initialCode}
                      language={currentLesson.interactiveData.language}
                      instructions={currentLesson.interactiveData.instructions}
                      validationRegex={currentLesson.interactiveData.validationRegex}
                      onSuccess={handleInteractiveSuccess}
                   />
                </div>
             )}

             {currentLesson.type === 'quiz' && (
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-right">
                   <h3 className="text-2xl font-bold mb-4">اختبار المعرفة</h3>
                   <div className="markdown-body text-slate-700 dark:text-slate-300 mb-8 max-w-none text-right" dir="rtl">
                     <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                   </div>
                   
                   {currentLesson.quizData && !quizSubmitted && (
                     <div className="space-y-8 text-right">
                       {currentLesson.quizData.map((q, i) => (
                         <div key={i} className="mb-6">
                           <p className="font-bold text-lg mb-3">السؤال {i + 1}: {q.question}</p>
                           <div className="space-y-2">
                             {q.options.map((opt, optIndex) => (
                               <label key={optIndex} className={cn(
                                 "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                                 quizAnswers[i] === optIndex ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                               )}>
                                 <input 
                                   type="radio" 
                                   name={`question-${i}`} 
                                   checked={quizAnswers[i] === optIndex}
                                   onChange={() => setQuizAnswers(prev => ({ ...prev, [i]: optIndex }))}
                                   className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                 />
                                 <span>{opt}</span>
                               </label>
                             ))}
                           </div>
                         </div>
                       ))}
                     </div>
                   )}
                   
                   {(quizResults[currentLesson.id] || quizScore !== null) ? (
                     <div className={cn(
                       "p-6 rounded-xl border mt-6 text-center",
                       (quizScore || quizResults[currentLesson.id]) >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/50" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800/50"
                     )}>
                        <Trophy size={48} className="mx-auto mb-4" />
                        <h4 className="font-bold text-xl mb-2">
                          {(quizScore || quizResults[currentLesson.id]) >= 80 ? 'ممتاز! لقد اجتزت الاختبار' : 'حاول مرة أخرى!'}
                        </h4>
                        <p className="text-lg mb-4">النتيجة: {quizScore || quizResults[currentLesson.id]}%</p>
                        
                        {(quizScore || quizResults[currentLesson.id]) < 80 && (
                          <button onClick={() => { setQuizSubmitted(false); setQuizScore(null); }} className="bg-white text-red-600 font-bold py-2 px-4 rounded-lg">إعادة الاختبار</button>
                        )}
                     </div>
                   ) : (
                     <div className="text-center mt-8">
                       <button 
                         onClick={handleQuizSubmit} 
                         disabled={currentLesson.quizData && Object.keys(quizAnswers).length < currentLesson.quizData.length}
                         className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg"
                       >
                         تقديم الاختبار
                       </button>
                     </div>
                   )}
                </div>
             )}
             
             {(currentLesson.type === 'text' || currentLesson.type === 'video' || currentLesson.type === 'project') && (
               <div className="markdown-body dark:prose-invert text-slate-800 dark:text-slate-200 text-right leading-relaxed text-lg" dir="rtl">
                  <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                  {currentLesson.type === 'video' && (
                    <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500 mt-8 relative overflow-hidden border border-slate-800 shadow-xl">
                       <PlayCircle size={64} className="text-white/30 hover:scale-110 hover:text-white transition-all cursor-pointer" />
                       <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                          <div className="text-white">
                             <span className="font-bold flex items-center gap-2 mb-1"><PlayCircle size={16} className="text-blue-500"/> مشغل الفيديو الافتراضي</span>
                             <span className="text-sm text-slate-300">{currentLesson.title}</span>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
             )}

             {/* Navigation Footer */}
             <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                {nextLesson ? (
                   <button 
                     onClick={handleComplete}
                     disabled={(currentLesson.type === 'interactive' && !interactivePassed) || (currentLesson.type === 'quiz' && (quizResults[currentLesson.id] === undefined && quizScore === null)) || (currentLesson.type === 'quiz' && (quizResults[currentLesson.id] || quizScore || 0) < 80)}
                     className={cn(
                       "font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-transform shadow-md",
                       ((currentLesson.type === 'interactive' && !interactivePassed) || (currentLesson.type === 'quiz' && (quizResults[currentLesson.id] === undefined && quizScore === null)) || (currentLesson.type === 'quiz' && (quizResults[currentLesson.id] || quizScore || 0) < 80)) ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
                     )}
                   >
                     {isCompleted ? 'الدرس التالي' : 'إكمال والمتابعة'}
                     <ChevronLeft size={20} />
                   </button>
                ) : (
                  <button 
                     onClick={() => navigate(`/course/${course.id}`)}
                     className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-md"
                   >
                     إنهاء التخصص
                     <Trophy size={20} />
                   </button>
                )}
                
                {prevLesson && (
                   <Link 
                     to={`/learn/${course.id}/${prevLesson.id}`}
                     className="text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                   >
                     <ChevronRight size={20} />
                     السابق
                   </Link>
                )}
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
