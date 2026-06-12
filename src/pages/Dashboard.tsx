import { useStore } from '../lib/store';
import { mockCourses, getBadges, specialties } from '../lib/data';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Star, History, PlayCircle, Award, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Dashboard() {
  const store = useStore();
  const badges = getBadges();

  const totalLessonsInAllCourses = mockCourses.reduce((acc, course) => acc + course.modules.reduce((a, m) => a + m.lessons.length, 0), 0);
  const completedCount = store.completedLessons.length;
  const globalProgress = totalLessonsInAllCourses === 0 ? 0 : Math.round((completedCount / totalLessonsInAllCourses) * 100);

  // Derive earned badges based on state
  const earnedBadgesIds = store.badges; // Currently store.badges just holds string ids. Let's auto-calculate a few for fun.
  const dynamicBadges = [];
  if (completedCount > 0) dynamicBadges.push('first_lesson');
  if (Object.keys(store.quizResults).some(k => store.quizResults[k] === 100)) dynamicBadges.push('quiz_master');
  
  const uniqueEarnedBadgeIds = Array.from(new Set([...earnedBadgesIds, ...dynamicBadges]));

  const favoriteCourses = mockCourses.filter(c => store.favorites.includes(c.id));

  // Recent course
  const lastCourse = mockCourses.find(c => c.id === store.lastVisitedCourse);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm">
      <div>
        <div className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">{title}</div>
        <div className="text-3xl font-black">{value}</div>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
         <Icon size={28} />
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">لوحة التحكم</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="الدروس المكتملة" value={completedCount} icon={BookOpen} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard title="التقدم الإجمالي" value={`${globalProgress}%`} icon={Trophy} color="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" />
        <StatCard title="الشارات" value={uniqueEarnedBadgeIds.length} icon={Award} color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
        <StatCard title="المفضلة" value={store.favorites.length} icon={Star} color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Continue Learning */}
           {lastCourse ? (
              <div className="bg-gradient-to-l from-slate-800 to-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <div className="text-blue-400 font-bold mb-2">استئناف التعلم</div>
                  <h3 className="text-2xl font-bold mb-2">{lastCourse.title}</h3>
                  <p className="text-slate-300 text-sm max-w-md">تابع من حيث توقفت في المرة السابقة.</p>
                </div>
                <Link to={store.lastVisitedLesson ? `/learn/${lastCourse.id}/${store.lastVisitedLesson}` : `/course/${lastCourse.id}`} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-500 flex items-center gap-2 shrink-0">
                  <PlayCircle size={20} />
                  استكمال التعلم
                </Link>
              </div>
           ) : (
             <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
                <p className="text-slate-500 font-semibold mb-4">لم تبدأ أي مسار بعد!</p>
                <Link to="/courses" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl inline-block hover:bg-blue-700 transition-colors">تصفح المسارات</Link>
             </div>
           )}

           {/* Daily Challenges */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold flex items-center gap-2"><Award size={20} className="text-orange-500" /> تحديات اليوم</h2>
                 <span className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-2 py-1 rounded font-bold">تتجدد يومياً</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                 {[
                    { id: 'algo-1', title: 'تحدي الخوارزميات', desc: 'أوجد الرقم المفقود في المصفوفة باستخدام JavaScript.', difficulty: 'متوسط', language: 'JavaScript', route: '/challenge/algo-1' },
                    { id: 'css-1', title: 'تحدي التصميم', desc: 'صمم زر بتأثيرات حركية باستخدام CSS فقط.', difficulty: 'سهل', language: 'CSS', route: '/challenge/css-1' }
                 ].map((challenge) => (
                    <Link to={challenge.route} key={challenge.id} className="border border-slate-100 dark:border-slate-800 rounded-2xl p-5 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer group flex flex-col justify-between">
                       <div>
                          <div className="flex justify-between items-start mb-3">
                             <h3 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{challenge.title}</h3>
                             <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${challenge.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>{challenge.difficulty}</span>
                          </div>
                          <p className="text-slate-500 text-sm mb-4 leading-relaxed">{challenge.desc}</p>
                       </div>
                       <div className="flex justify-between items-center mt-auto">
                          <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">{challenge.language}</span>
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">إبدأ التحدي <PlayCircle size={14}/></span>
                       </div>
                    </Link>
                 ))}
              </div>
           </div>

           {/* Favorites */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Star size={20} className="text-yellow-500 fill-yellow-500" /> مساراتي المفضلة</h2>
              
              {favoriteCourses.length === 0 ? (
                <p className="text-slate-500 text-sm">لا يوجد مسارات في المفضلة حالياً.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {favoriteCourses.map(course => {
                    const spec = specialties.find(s => s.id === course.specialtyId);
                    return (
                      <Link key={course.id} to={`/course/${course.id}`} className="border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                         <div className={`${spec?.color} w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-lg`}>
                            {spec?.name[0]}
                         </div>
                         <div>
                            <div className="font-bold line-clamp-1">{course.title}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{course.level}</div>
                         </div>
                      </Link>
                    )
                  })}
                </div>
              )}
           </div>

           {/* Activity Log */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><History size={20} /> سجل النشاطات</h2>
              <div className="space-y-4">
                 {store.activityLog.slice(0,5).map((log, i) => (
                    <div key={i} className="flex items-start gap-4">
                       <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                       <div>
                         <div className="font-semibold text-sm">{log.action}</div>
                         <div className="text-xs text-slate-500 mt-1">{new Date(log.date).toLocaleString('ar-EG')}</div>
                       </div>
                    </div>
                 ))}
                 {store.activityLog.length === 0 && <p className="text-slate-500 text-sm">لا يوجد نشاطات مسجلة بعد.</p>}
              </div>
           </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
           
           {/* Badges */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Trophy size={20} className="text-purple-600" /> شاراتي</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                 {badges.map(badge => {
                   const earned = uniqueEarnedBadgeIds.includes(badge.id);
                   return (
                     <div key={badge.id} className={`p-4 rounded-xl border ${earned ? 'border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-900/20' : 'border-slate-100 dark:border-slate-800 opacity-50 grayscale'}`}>
                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${earned ? 'bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                           <Award size={20} />
                        </div>
                        <div className="text-xs font-bold leading-tight line-clamp-1">{badge.title}</div>
                        {earned && <CheckCircle2 size={12} className="text-green-500 mx-auto mt-1" />}
                     </div>
                   );
                 })}
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
