export interface Specialty {
  id: string;
  name: string;
  description: string;
  iconType: string;
  color: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
}

export interface InteractiveData {
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python' | 'cpp' | 'java' | 'csharp' | 'php' | 'sql' | 'dart' | 'kotlin' | 'swift' | 'bash';
  initialCode: string;
  instructions: string;
  expectedOutput?: string;
  validationRegex?: string;
  hints?: string[];
  solution?: string;
  solutionExplanation?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string; // Markdown or HTML
  type: 'video' | 'text' | 'quiz' | 'project' | 'interactive';
  duration: number; // in minutes
  interactiveData?: InteractiveData;
  quizData?: QuizQuestion[];
}

export interface Course {
  id: string;
  specialtyId: string;
  title: string;
  description: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  modules: {
    id: string;
    title: string;
    lessons: Lesson[];
  }[];
}

// Generate specialties based on requirements
export const specialties: Specialty[] = [
  { id: 'html', name: 'HTML', description: 'هيكل الويب وبناء الصفحات', iconType: 'Code', color: 'bg-orange-500' },
  { id: 'css', name: 'CSS', description: 'تنسيق وتصميم صفحات الويب', iconType: 'Paintbrush', color: 'bg-blue-500' },
  { id: 'js', name: 'JavaScript', description: 'لغة البرمجة التفاعلية للويب', iconType: 'FileCode2', color: 'bg-yellow-500' },
  { id: 'ts', name: 'TypeScript', description: 'JavaScript بلس', iconType: 'FileCode', color: 'bg-blue-600' },
  { id: 'python', name: 'Python', description: 'لغة متعددة الاستخدامات والذكاء الاصطناعي', iconType: 'Terminal', color: 'bg-yellow-600' },
  { id: 'php', name: 'PHP', description: 'لغة برمجة خوادم الويب', iconType: 'Database', color: 'bg-indigo-500' },
  { id: 'java', name: 'Java', description: 'لغة موجهة للكائنات للشركات', iconType: 'Coffee', color: 'bg-red-500' },
  { id: 'cpp_c', name: 'C / C++', description: 'برمجة النظم والألعاب', iconType: 'Cpu', color: 'bg-blue-700' },
  { id: 'csharp', name: 'C#', description: 'لغة مايكروسوفت وتطوير الألعاب', iconType: 'Hash', color: 'bg-purple-600' },
  { id: 'sql', name: 'SQL', description: 'قواعد البيانات العلائقية', iconType: 'Database', color: 'bg-blue-400' },
  { id: 'react', name: 'React', description: 'مكتبة بناء واجهات المستخدم', iconType: 'Atom', color: 'bg-cyan-500' },
  { id: 'nextjs', name: 'Next.js', description: 'إطار عمل React المتكامل', iconType: 'Triangle', color: 'bg-black' },
  { id: 'nodejs', name: 'Node.js', description: 'بيئة تشغيل JS على الخادم', iconType: 'Server', color: 'bg-green-600' },
  { id: 'express', name: 'Express', description: 'إطار خوادم Node.js', iconType: 'Server', color: 'bg-gray-800' },
  { id: 'flutter', name: 'Flutter', description: 'تطبيقات متعددة المنصات', iconType: 'Smartphone', color: 'bg-sky-500' },
  { id: 'dart', name: 'Dart', description: 'لغة برمجة Flutter', iconType: 'Code', color: 'bg-blue-500' },
  { id: 'kotlin', name: 'Kotlin', description: 'تطوير تطبيقات أندرويد', iconType: 'Smartphone', color: 'bg-purple-500' },
  { id: 'swift', name: 'Swift', description: 'تطوير تطبيقات iOS', iconType: 'Smartphone', color: 'bg-orange-600' },
  { id: 'unity', name: 'Unity', description: 'محرك ألعاب Unity الرائد', iconType: 'Gamepad2', color: 'bg-gray-800' },
  { id: 'unreal', name: 'Unreal Engine', description: 'محرك الألعاب الأقوى', iconType: 'Gamepad2', color: 'bg-blue-800' },
  { id: 'git_github', name: 'Git & GitHub', description: 'إدارة النسخ والمشاريع', iconType: 'GitBranch', color: 'bg-gray-800' },
  { id: 'linux', name: 'Linux', description: 'إدارة أنظمة التشغيل والسيرفرات', iconType: 'Terminal', color: 'bg-yellow-500' },
  { id: 'cyber_sec', name: 'الأمن السيبراني', description: 'حماية النظم والبيانات', iconType: 'ShieldCheck', color: 'bg-red-600' },
  { id: 'algorithms', name: 'الخوارزميات', description: 'أسس التفكير البرمجي', iconType: 'Network', color: 'bg-teal-600' },
  { id: 'data_structures', name: 'هياكل البيانات', description: 'تنظيم البيانات في الذاكرة', iconType: 'Database', color: 'bg-gray-600' },
  { id: 'web_dev', name: 'تطوير الويب الشامل', description: 'واجهات أمامية وخلفية', iconType: 'Globe', color: 'bg-indigo-600' },
  { id: 'app_dev', name: 'تطوير التطبيقات', description: 'موبايل ديف', iconType: 'Smartphone', color: 'bg-sky-600' },
  { id: 'game_dev', name: 'تطوير الألعاب', description: 'أساسيات تصميم الألعاب', iconType: 'Gamepad2', color: 'bg-emerald-600' },
];

export const mockCourses: Course[] = specialties.map((specialty, idx) => ({
  id: `course-${specialty.id}`,
  specialtyId: specialty.id,
  title: `المسار الشامل في ${specialty.name}`,
  description: `تعلم ${specialty.name} من الصفر وحتى الاحتراف مع أمثلة عملية ومشاريع حقيقية.`,
  level: idx % 3 === 0 ? 'مبتدئ' : idx % 3 === 1 ? 'متوسط' : 'متقدم',
  modules: [
    {
      id: `m-1-${specialty.id}`,
      title: 'مقدمة',
      lessons: [
        { 
          id: `l-1-1-${specialty.id}`, 
          courseId: `course-${specialty.id}`, 
          title: `ما هو ${specialty.name}؟`, 
          content: `## مقدمة شاملة في ${specialty.name}

قبل أن نكتب أي كود، دعنا نفهم المبدأ أولاً.

**ما هو هذا المفهوم؟**
تقنية ${specialty.name} هي أداة أو لغة تسمح لنا ببناء تطبيقات بشكل هيكلي ومنطقي، لكي يتعرف الكمبيوتر على المطلوب.

**لماذا نستخدمها؟**
تخيل بناء منزل بدون مخطط! هذه التكنولوجيا هي المخطط. نستخدمها لتنظيم الكود، تسريع العمل، وضمان أن التطبيق لا ينهار عند إضافة أجزاء جديدة.

**كيف يتم استخدامها في المشاريع الحقيقية؟**
في وظيفتك المستقبلية، ستستخدم ${specialty.name} يومياً لبناء واجهات أو قواعد بيانات، وتحديداً لجعل التطبيق قابلاً للصيانة من قبل فريق عمل كامل. بدلاً من تطوير شيء يعمل لمرة واحدة، تبني شيء يعمل لسنوات.

الآن بعد أن أدركت الأهمية النظرية، لننتقل للدرس القادم لنطبق عملياً.`, 
          type: 'text', 
          duration: 10 
        },
        { 
          id: `l-1-2-${specialty.id}`, 
          courseId: `course-${specialty.id}`, 
          title: `تجربتك الأولى الشاملة`, 
          content: `في هذا الدرس التفاعلي، ستكتب أول كود لك! الق نظرة على المحرر وقم بتنفيذ المطلوب. الهدف هنا هو كسر الحاجز بينك وبين الكود. الكود مجرد سطور منطقية تعطى للكمبيوتر.`, 
          type: 'interactive', 
          duration: 15,
          interactiveData: {
            language: ['html', 'css', 'js', 'javascript', 'ts', 'typescript', 'python', 'php', 'java', 'cpp', 'c', 'csharp', 'sql', 'dart', 'kotlin', 'swift'].includes(specialty.id.replace('_c', '')) ? (specialty.id.replace('_c', '').replace('js', 'javascript').replace('ts', 'typescript') as any) : 'javascript',
            initialCode: specialty.id === 'html' ? `<!-- اكتشف الكود هنا -->\n` : specialty.id === 'css' ? `/* اكتب كود CSS هنا */\nbody {}` : `// اكتشف لغة ${specialty.name} و اكتب كودك هنا\n\n`,
            instructions: specialty.id === 'html' ? 'أضف عنواناً (h1) يحتوي على كلمة "البداية".' : specialty.id === 'css' ? 'قم بتلوين الخلفية باللون الأسود.' : `استخدم لغة ${specialty.name} لتعريف متغير وطباعة كلمة Hello.`,
            validationRegex: specialty.id === 'html' ? '<h1.*>.*البداية.*</h1>' : specialty.id === 'css' ? 'background.*:.*black' : '(?=.*Hello).*',
            hints: specialty.id === 'html' ? [
              'استخدم الوسم <h1> للعنوان الكبير.',
              'تأكد من فتح الوسم <h1> وإغلاقه </h1>.',
              'اكتب كلمة "البداية" بين الوسمين.',
              'الهيكل العام يجب أن يكون: <h1>البداية</h1>'
            ] : specialty.id === 'css' ? [
              'نحتاج استخدام خاصية background لتعيين لون الخلفية.',
              'القيمة black تمثل اللون الأسود.',
              'ضع background: black; داخل أقواس body { }.',
              'الهيكل العام: body { background: black; }'
            ] : [
              'في هذه اللغة نحتاج لتعريف متغير أو طباعة كلمة.',
              'تأكد من استخدام علامات التنصيص " " حول الكلمة "Hello".',
              'ابحث عن دالة الطباعة الخاصة باللغة.'
            ],
            solution: specialty.id === 'html' ? '<h1>البداية</h1>' : specialty.id === 'css' ? 'body {\n  background: black;\n}' : 'console.log("Hello"); // أو ما يعادلها في هذه اللغة',
            solutionExplanation: specialty.id === 'html' ? `### شرح الكود بالتفصيل:

1. **\`<h1>\`**
   - **ماذا يفعل؟** يفتح وسم العنوان الرئيسي.
   - **لماذا استخدم؟** لنخبر المتصفح أن النص القادم هو عنوان الصفحة وهو الأهم لذلك يجب أن يعرض بخط كبير وعريض.
   - **ماذا سيحدث إذا تم حذفه؟** سيظهر النص كفقرة عادية صغيرة غير مميزة، وسيلخبط محركات البحث (مثل جوجل).
   - **البدائل الممكنة:** يمكن استخدام \`<h2>\` أو \`<p>\` ولكنها أقل أهمية من الناحية الدلالية (Semantics).

2. **\`البداية\`**
   - **ماذا يفعل؟** هو المحتوى النصي الذي يقرؤه المستخدم.

3. **\`</h1>\`**
   - **ماذا يفعل؟** يغلق وسم العنوان الرئيسي.
   - **لماذا استخدم؟** لنحدد بوضوح أين ينتهي هذا العنوان لنمنع تنسيق العنوان من التسرب لما بعده.
   - **ماذا سيحدث إذا تم حذفه؟** كل الكلام الذي سيُكتب بعده (حتى آخر الصفحة) سيظهر بحجم كبير وكأنه جزء من العنوان!
   - **البدائل الممكنة:** لا يوجد بديل، الوسم يجب أن يغلق.` : specialty.id === 'css' ? 'هنا حددنا العنصر `body` وهو يمثل جسم الصفحة كاملاً. وأعطينا خاصية `background` قيمة الكلمة المحجوزة للون `black` (أسود).' : 'استخدمنا دالة الطباعة وتأكدنا من كتابة Hello.'
          }
        },
      ]
    },
    {
      id: `m-2-${specialty.id}`,
      title: 'تطبيقات عملية ومشاريع',
      lessons: [
        {
          id: `l-2-1-${specialty.id}`,
          courseId: `course-${specialty.id}`,
          title: `مشروع: بناء آلة حاسبة`,
          content: `## مشروع الآلة الحاسبة
          
في هذا المشروع سنقوم ببناء آلة حاسبة حقيقية خطوة بخطوة. لن نبدأ بكل شيء دفعة واحدة. سنبدأ بمنطق الجمع فقط.

**لماذا نتعلم هذا؟**
بناء الآلة الحاسبة يعلمك كيفية التعامل مع الأحداث (Events)، وكيفية حفظ الحالة (State) المتمثلة في الأرقام المدخلة، وكيفية تحديث واجهة المستخدم بناءً عليها.

**المهمة:**
قم بكتابة دالة \`add\` تأخذ رقمين وتقوم بإرجاع مجموعهما للبدء بأساسيات الحاسبة.
`,
          type: 'interactive',
          duration: 30,
          interactiveData: {
            language: 'javascript',
            initialCode: `function add(a, b) {\n  // اكتب الكود الخاص بك هنا\n  \n}\n\nconsole.log(add(5, 3)); // يجب أن تطبع 8`,
            instructions: 'أكمل الدالة add لتقوم بإرجاع مجموع الرقمين a و b.',
            validationRegex: 'return a \\+ b|return a\\+b',
            hints: [
              'المطلوب استخدام الدالة ﻹرجاع (return) قيمة المجموع للاستفادة منها خارج الدالة.',
              'استخدم المعامل + لجمع المتغيرات a و b.',
              'الهيكل العام هو كتابة عملية الجمع مباشرة بعد كلمة return.',
              'الكود التقريبي: return a ... b;'
            ],
            solution: `function add(a, b) {
  return a + b;
}

console.log(add(5, 3));`,
            solutionExplanation: `### شرح الحل
استخدمنا الكلمة الجوهرية \`return\` وهي هامة جداً. بدون استخدام \`return\` لو كان لدينا \`a + b\` فقط، ستنفذ الدالة العملية وتتجاهلها (النتيجة تضيع في الذاكرة). الهدف هو إرجاع القيمة حتى يستطيع \`console.log\` عرضها على الشاشة. هنا \`add(5, 3)\` يتم استبدالها تلقائياً بالقيمة \`8\`.`
          }
        },
        { 
          id: `l-2-2-${specialty.id}`, 
          courseId: `course-${specialty.id}`, 
          title: `اختبار معلوماتك`, 
          content: `قم بالإجابة على الاختبار لتأكيد فهمك لما سبق.`, 
          type: 'quiz', 
          duration: 15,
          quizData: [
            {
              question: 'ما هي الكلمة المفتاحية المستخدمة لتعريف متغير لا يمكن تغيير قيمته في JavaScript؟',
              options: ['let', 'var', 'const', 'static'],
              correctAnswer: 2
            },
            {
              question: 'كيف يمكن طباعة رسالة في الكونسول (Console) الخاصة بالمتصفح؟',
              options: ['print("رسالة")', 'console.log("رسالة")', 'echo "رسالة"', 'System.out.println("رسالة")'],
              correctAnswer: 1
            }
          ]
        },
      ]
    },
    {
      id: `m-3-${specialty.id}`,
      title: 'خوارزميات وهياكل بيانات متميزة',
      lessons: [
        {
          id: `l-3-1-${specialty.id}`,
          courseId: `course-${specialty.id}`,
          title: `البحث الثنائي (Binary Search)`,
          content: `## مقدمة في البحث الثنائي
البحث الثنائي هو تقنية بحث سريعة جداً. تخيل أنك تبحث عن كلمة في قاموس، هل ستبحث في كل صفحة بالتسلسل؟ بالطبع لا! ستفتح القاموس من المنتصف، وإذا كانت الكلمة التي تبحث عنها بعد المنتصف أبجدياً، ستتجاهل النصف الأول تماماً.

سنتعلم ونجرب كيف نطبق هذه الخوارزمية في JavaScript.`,
          type: 'interactive',
          duration: 35,
          interactiveData: {
            language: 'javascript',
            initialCode: `function binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  \n  // أكمل الخوارزمية هنا\n\n  return -1;\n}\n\nconsole.log(binarySearch([1, 3, 5, 7, 9], 7));`,
            instructions: 'أكمل خوارزمية البحث الثنائي. المخرجات يجب أن تكون ترتيب الرقم في المصفوفة (Index).',
            validationRegex: 'while.*\\(.*left.*<=.*right.*\\)',
            hints: [
              'استخدم حلقة while طالما أن المؤشر الأيسر لا يتخطى الأيمن (left <= right).',
              'داخل الحلقة، احسب المنتصف عن طريق جمع left و right قسمة 2. استخدم Math.floor() لتجاهل الكسور.',
              'إذا كان الرقم في المنتصف arr[mid] يساوي الهدف، أرجع الناتج (return mid). وإلا فقم بتحريك left أو right.',
              'الكود التقريبي:\nwhile (left <= right) {\n  let mid = Math.floor((left + right)/2);\n  if (arr[mid] === target) return mid;\n  if (arr[mid] < target) left = mid + 1;\n  else right = mid - 1;\n}'
            ],
            solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1; // تجاهل النصف الأيسر
    } else {
      right = mid - 1; // تجاهل النصف الأيمن
    }
  }

  return -1; // الرقم غير موجود
}

console.log(binarySearch([1, 3, 5, 7, 9], 7));`,
            solutionExplanation: `### شرح الحل
1. **\`while (left <= right)\`**: نكرر البحث طالما أن نطاق البحث لم يصل لنهايته (بمعنى أن المؤشرات لم تتقاطع).
2. **\`let mid = Math.floor((left + right) / 2)\`**: نوجد مكان منتصف النطاق الحالي.
3. **\`if (arr[mid] === target)\`**: هل القيمة في المنتصف هي بالضبط ما نبحث عنه؟ إذا كان نعم نرجع هذا المكان فوراً!
4. **\`else if (arr[mid] < target)\`**: إذا كانت القيمة في المنتصف أصغر من المطلوب، فهذا يعني أن النصف الأيسر بالكامل غير مطالبين بالبحث فيه. نقوم بتغيير \`left\` ليصبح بعد المنتصف بخطوة.
5. وبنفس المنطق نتحكم في \`right\` في حال العكس.`
          }
        },
        { 
          id: `l-3-2-${specialty.id}`, 
          courseId: `course-${specialty.id}`, 
          title: `اختبار نهائي للمسار`, 
          content: `يعتبر هذا الاختبار الخلاصة لمجهودك. أجب عن الأسئلة التالية لتختبر عمق فهمك.`, 
          type: 'quiz', 
          duration: 25,
          quizData: [
            {
              question: 'في خوارزمية البحث الثنائي (Binary Search)، ما هو الشرط الأساسي الذي يجب أن يتوفر في المصفوفة قبل بدء البحث؟',
              options: ['أن تحتوي على أرقام فقط', 'أن تكون مرتبة (Sorted)', 'أن تكون الأرقام زوجية', 'أن تكون فارغة'],
              correctAnswer: 1
            },
            {
              question: 'ما هي الطريقة الصحيحة لتعريف دالة (Function) في JavaScript؟',
              options: ['function myFunc() {}', 'def myFunc():', 'func myFunc() {}', 'method myFunc() {}'],
              correctAnswer: 0
            },
            {
              question: 'ما هو الرمز المستخدم للمقارنة الصارمة (القيمة والنوع) في JavaScript؟',
              options: ['=', '==', '===', '!='],
              correctAnswer: 2
            }
          ]
        },
      ]
    },
    {
      id: `m-4-${specialty.id}`,
      title: 'مشاريع عملية متكاملة',
      lessons: [
        {
          id: `l-project-1-${specialty.id}`,
          courseId: `course-${specialty.id}`,
          title: `مشروع: بناء بطاقة تعريفية`,
          content: `في هذا المشروع النهائي، سنقوم ببناء بطاقة تعريفية كاملة. يتطلب منك هذا المشروع دمج المفاهيم التي تعلمتها.
          
**الأهداف:**
- إنشاء هيكل البطاقة.
- إضافة المعلومات الأساسية.

هذا المشروع يتكون من عدة خطوات وتحديات متتالية.`,
          type: 'interactive',
          duration: 30,
          interactiveData: {
            language: specialty.id === 'html' ? 'html' : specialty.id === 'css' ? 'css' : 'javascript',
            initialCode: specialty.id === 'html' ? `<!-- ابدأ بناء البطاقة هنا -->\n<div class="card">\n  \n</div>` : specialty.id === 'css' ? `.card {\n  /* نسق البطاقة هنا */\n}` : `// أضف تفاعلية للبطاقة\n`,
            instructions: specialty.id === 'html' ? 'قم بإضافة صورة (img) واسم (h2) ونبذة (p) داخل الـ div الخاص بالبطاقة.' : specialty.id === 'css' ? 'قم بإضافة حدود (border) وظل (box-shadow) للبطاقة.' : 'أنشئ زر يقوم بتغيير لون خلفية البطاقة عند الضغط عليه.',
            validationRegex: specialty.id === 'html' ? 'img.*h2.*p' : specialty.id === 'css' ? 'border.*box-shadow' : 'addEventListener.*click',
            hints: specialty.id === 'html' ? [
              'نحتاج وضع وسوم <img> ثم <h2> ثم <p>.',
              'تأكد من إغلاق </h2> و </p>.',
              'وسم الصورة لا يحتاج لإغلاق لكن يجب أن يحتوي على src.',
            ] : specialty.id === 'css' ? [
              'استخدم border: 1px solid black;',
              'استخدم box-shadow: 2px 2px 5px gray;',
            ] : [
              'يمكنك استخدام document.querySelector لاختيار الزر والبطاقة.',
              'استخدم addEventListener("click", ...).',
            ],
            solution: specialty.id === 'html' ? `<div class="card">\n  <img src="avatar.png" alt="Avatar">\n  <h2>اسم المبرمج</h2>\n  <p>هذه نبذة عني.</p>\n</div>` : specialty.id === 'css' ? `.card {\n  border: 1px solid #ccc;\n  box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n  padding: 20px;\n}` : `document.querySelector('button').addEventListener('click', () => {\n  document.querySelector('.card').style.backgroundColor = '#f0f0f0';\n});`,
            solutionExplanation: `هذا هو الهيكل الصحيح للبطاقة مما يضمن جودة في العرض والصيانة.`
          }
        }
      ]
    }
  ]
}));

export function getBadges() {
  return [
    { id: 'first_lesson', title: 'البداية', description: 'أكملت أول درس لك', icon: 'Star' },
    { id: 'first_course', title: 'خريج جديد', description: 'أتممت دورتك الأولى', icon: 'Award' },
    { id: 'quiz_master', title: 'ملك الاختبارات', description: 'حصلت على 100% في اختبار', icon: 'Trophy' },
    { id: 'night_owl', title: 'بومة الليل', description: 'تدرس في وقت متأخر', icon: 'Moon' },
  ];
}
