import { useParams, useNavigate } from 'react-router-dom';
import { InteractiveEditor } from '../components/InteractiveEditor';
import { ArrowRight, Trophy, Award, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useStore } from '../lib/store';

const challengeData: Record<string, any> = {
  'algo-1': {
    title: 'تحدي الخوارزميات: الرقم المفقود',
    desc: `لديك مصفوفة تحتوي على أرقام متسلسلة من 1 إلى N، ولكن هناك رقم واحد مفقود. مهمتك هي إيجاد هذا الرقم المفقود وإرجاعه.
    
مثال: 
\`\`\`js
findMissing([1, 2, 4, 5]) // يجب أن يرجع 3
\`\`\``,
    language: 'javascript',
    initialCode: `function findMissing(arr) {\n  // اكتب الكود الخاص بك هنا\n  \n}\n\nconsole.log(findMissing([1, 2, 4, 5]));`,
    instructions: 'أكمل دالة findMissing لترجع الرقم المفقود. افترض أن المصفوفة تبدأ دائماً بـ 1.',
    hints: [
      'فكر في استخدام المجموع المتوقع للأرقام من 1 إلى N وطرح مجموع المصفوفة منه.',
      'الخطوة الأولى: احسب مجموع الأرقام الموجودة في المصفوفة باستخدام حلقة (Loop) أو reduce.',
      'الخطوة الثانية: المجموع الحقيقي من 1 إلى N هو (N * (N + 1)) / 2، حيث N هي طول المصفوفة زائد واحد.',
      'الكود التقريبي:\nlet sum = 0;\narr.forEach(n => sum += n);\nlet n = arr.length + 1;\nlet expectedSum = ...'
    ],
    solution: `function findMissing(arr) {
  let n = arr.length + 1;
  let expectedSum = (n * (n + 1)) / 2;
  let actualSum = arr.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}`,
    solutionExplanation: `### شرح الحل خطوة بخطوة:

1. **\`let n = arr.length + 1;\`**
   - نعرف طول المصفوفة المتوقع إذا لم تكن ناقصة. حيث تمت إزالة رقم واحد.
2. **\`let expectedSum = (n * (n + 1)) / 2;\`**
   - نستعمل المعادلة الرياضية الشهيرة لحساب مجموع الأرقام المتتالية من 1 إلى N.
3. **\`let actualSum = arr.reduce(...);\`**
   - نقوم بجمع كل الأرقام الموجودة في المصفوفة حالياً.
4. **\`return expectedSum - actualSum;\`**
   - الفرق بين المجموع المتوقع والمجموع الحالي هو الرقم المفقود بالضبط.

إذا حذفنا المعادلة سنضطر لتجربة المرور على الأرقام واحداً تلو الآخر، وهو ما سيكون أبطأ بكثير (تعقيد O(n) مقابل معادلة رياضية سريعة).`,
    validationRegex: '\\*.*\\+.*1.*\\/|reduce|for.*let' // Basic check for logic or loop
  },
  'css-1': {
    title: 'تحدي التصميم: زر النبض',
    desc: `مطلوب تصميم زر يحتوي على تأثير "نبض" مستمر يلفت انتباه المستخدم. هذا التأثير شائع جداً في الإشعارات والتنبيهات.`,
    language: 'css',
    initialCode: `.pulse-btn {\n  /* اكتب تنسيق الزر هنا */\n  background-color: blue;\n  color: white;\n}\n\n@keyframes pulse {\n  /* اضف حركة النبض هنا */\n}`,
    instructions: 'أنشئ حركة (animation) باسم pulse واجعل حجم الزر يتغير بين 1 و 1.1 بشكل مستمر وناعم.',
    hints: [
      'المطلوب استخدام @keyframes لتغيير الحجم باستخدام transform.',
      'استخدم الخاصية animation: pulse داخل كلاس الزر لتفعيل الحركة.',
      'اضبط الحركة لتكون مستمرة من خلال الكلمة المفتاحية "infinite".',
      'الكود التقريبي:\n@keyframes pulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(...); }\n  100% { transform: ... }\n}'
    ],
    solution: `.pulse-btn {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}`,
    solutionExplanation: `### شرح التنسيق

1. **\`animation: pulse 1.5s infinite ease-in-out;\`**
   - استدعينا الحركة التي أسميناها \`pulse\`.
   - تستغرق ثانية ونصف، وتتكرر للأبد (infinite).
2. **\`@keyframes pulse\`**
   - قمنا بتقسيم الحركة لثلاث مراحل: البداية 0% والوسط 50% والنهاية 100%.
   - نعطي الزر حجماً طبيعياً في البداية والنهاية \`scale(1)\`.
   - في المنتصف يتم تكبيره بنسبة 10% \`scale(1.1)\`.
   
إذا حذفنا "infinite" فإن الحركة ستحصل مرة واحدة فقط عند تحميل الصفحة.`,
    validationRegex: 'transform:.*scale|@keyframes.*pulse'
  }
};

export function ChallengePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const challenge = id ? challengeData[id] : null;

  if (!challenge) {
    return <div className="p-8 text-center">التحدي غير موجود</div>;
  }

  const markChallengeComplete = useStore(state => state.markChallengeComplete);
  const completedChallenges = useStore(state => state.completedChallenges || []);

  const isCompleted = completedChallenges.includes(id || '');

  const handleSuccess = () => {
    if (id) markChallengeComplete(id);
    alert('رائع! لقد اجتزت التحدي بنجاح!');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl">
        <ArrowRight size={18} /> العودة للوحة التحكم
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
         {/* Decorative Background */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 dark:bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
         
         <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start">
            <div>
               <div className="flex flex-wrap items-center gap-3 mb-4">
                 <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-bold px-3 py-1 rounded-lg text-sm flex items-center gap-1"><Award size={16}/> تحدي اليوم</span>
                 <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono px-3 py-1 rounded-lg text-sm">{challenge.language}</span>
                 <span className="text-slate-400 flex items-center gap-1 text-sm"><Clock size={14}/> الوقت المتوقع: 15 دقيقة</span>
                 {isCompleted && (
                   <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold px-3 py-1 rounded-lg text-sm flex items-center gap-1">تم الإنجاز</span>
                 )}
               </div>
               <h1 className="text-3xl md:text-4xl font-bold mb-4">{challenge.title}</h1>
               <div className="markdown-body dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
                 <ReactMarkdown>{challenge.desc}</ReactMarkdown>
               </div>
            </div>
            
            <div className="shrink-0 w-full md:w-auto p-4 bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-700 rounded-xl text-center flex flex-col items-center justify-center min-w-[150px]">
               <Trophy size={48} className="text-orange-400 mb-2" />
               <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-1">النقاط المكتسبة</div>
               <div className="text-2xl font-black text-slate-800 dark:text-white">+50</div>
            </div>
         </div>
         
         <div className="mt-8 relative z-10">
           <InteractiveEditor
             initialCode={challenge.initialCode}
             language={challenge.language}
             instructions={challenge.instructions}
             validationRegex={challenge.validationRegex}
             hints={challenge.hints}
             onSuccess={handleSuccess}
           />
         </div>
      </div>
    </div>
  );
}
