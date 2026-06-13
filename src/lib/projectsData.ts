export type Level = 'absolute_beginner' | 'beginner' | 'intermediate' | 'advanced' | 'pro';
export type ProjectType = 'web' | 'app' | 'game';

export interface ProjectStage {
  id: string;
  title: string;
  explanation: string;
  task: string;
  initialCode: {
    html?: string;
    css?: string;
    js?: string;
  };
  validationRules: {
    regex: string;
    errorMessage: string;
  }[];
  hints: string[];
  codeExplanation?: string;
  solution?: {
    html?: string;
    css?: string;
    js?: string;
  };
}

export interface RealProject {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  level: Level;
  defaultLanguage: 'html' | 'javascript';
  stages: ProjectStage[];
}

export const realProjects: RealProject[] = [
  {
    id: 'personal-site-1',
    title: 'موقع شخصي بسيط',
    description: 'ابنِ موقعك الشخصي الأول بخطوات بسيطة لتعرض معلوماتك.',
    type: 'web',
    level: 'absolute_beginner',
    defaultLanguage: 'html',
    stages: [
      {
         id: 'stage-1',
         title: 'العنوان الرئيسي',
         explanation: 'في هذه المرحلة سنقوم بإضافة عنوان للموقع. نستخدم وسم <h1> في بوابات HTML لإنشاء العناوين الكبيرة. هذا ضروري ليعرف الزائر من أنت فور دخوله.',
         task: 'أضف عنوان <h1> يحتوي على اسمك (مثلاً: "مرحباً، أنا أحمد").',
         initialCode: { html: `<body>\n  <!-- اكتب كودك هنا -->\n\n</body>` },
         validationRules: [
           { regex: '<h1[>\\s]', errorMessage: 'لم تقم بإنشاء وسم <h1>.' },
           { regex: '<h1[^>]*>.*?[^\\s].*?<\\/h1>', errorMessage: 'وسم <h1> فارغ، أضف بداخله اسماً.' }
         ],
         hints: ['اكتب <h1>', 'اكتب اسمك', 'أغلق الوسم بـ </h1>'],
         codeExplanation: 'وسم <h1> يدل على "Heading 1" وهو أهم وأكبر عنوان في الصفحة.'
      },
      {
         id: 'stage-2',
         title: 'قسم النبذة (فقرة)',
         explanation: 'الآن سنضيف فقرة نصية تشرح من أنت. نستخدم وسم <p> (Paragraph) لإنشاء الفقرات.',
         task: 'تحت العنوان، أضف وسم <p> واكتب بداخله نبذة عن نفسك (مثال: "أنا مبرمج مبتدئ أتعلم تطوير الويب").',
         initialCode: { html: `<body>\n  <h1>مرحباً، أنا مهندس ويب</h1>\n  <!-- أضف الفقرة هنا -->\n\n</body>` },
         validationRules: [
           { regex: '<p[>\\s]', errorMessage: 'لم تقم بإنشاء وسم <p>.' },
           { regex: '<p[^>]*>.*?[^\\s].*?<\\/p>', errorMessage: 'وسم <p> يبدو فارغاً.' }
         ],
         hints: ['وسم الفقرة هو <p>', 'تذكر إغلاقه بـ </p>'],
         codeExplanation: 'وسم <p> يرمز إلى Paragraph ويستعمل لعرض النصوص الاعتيادية في المواقع.'
      }
    ]
  },
  {
    id: 'calculator-app-1',
    title: 'تطبيق آلة حاسبة',
    description: 'برمج آلة حاسبة بسيطة لجمع رقمين وتطبيق الدوال.',
    type: 'app',
    level: 'beginner',
    defaultLanguage: 'javascript',
    stages: [
      {
        id: 'stage-1',
        title: 'دالة الجمع',
        explanation: 'الآلة الحاسبة تحتاج لمعالجة العمليات الحسابية. سنقوم ببناء دالة تأخذ رقمين وتعيد مجموعهما. نستخدم "function" لتعريف المهام في جافاسكريبت.',
        task: 'أنشئ دالة باسم `add` تقبل متغيرين (a, b) وتقوم بإرجاع مجموعهما (a + b).',
        initialCode: { js: `// أنشئ دالة الوظيفية هنا\n\n` },
        validationRules: [
          { regex: 'function\\s+add', errorMessage: 'لم تنشئ دالة باسم add.' },
          { regex: 'return\\s+[aA-zZ0-9]+\\s*\\+\\s*[aA-zZ0-9]+', errorMessage: 'يجب أن تقوم الدالة بإرجاع مجموع المتغيرين باستخدام return وعلامة الجمع +.' }
        ],
        hints: ['اكتب `function add(a, b)`', 'بين القوسين المعكوفين {} اكتب `return a + b;`'],
        codeExplanation: 'الكلمة function تفهم الكمبيوتر أنك ستعلمُه أمراً جديداً سيقدر على تنفيذه متى ما تمت مناداته، و return تخبره بالنتيجة التي يجب أن يعطيها لك.'
      }
    ]
  },
  {
    id: 'guess-game-1',
    title: 'لعبة تخمين الرقم',
    description: 'قم ببناء لعبة مصغرة تخمن فيها رقماً عشوائياً.',
    type: 'game',
    level: 'beginner',
    defaultLanguage: 'javascript',
    stages: [
      {
        id: 'stage-1',
        title: 'توليد رقم عشوائي',
        explanation: 'اللعبة تحتاج لرقم سرّي. في جافاسكريبت يمكننا استخدام Math.random() للحصول على أرقام عشوائية.',
        task: 'عرّف متغيراً باسم `secretNumber` واحفظ فيه رقماً بين 1 و 10. (تلميح: استخدم Math.random() و Math.floor()).',
        initialCode: { js: `// استخدم Math.random\n\n` },
        validationRules: [
          { regex: '(let|const|var)\\s+secretNumber', errorMessage: 'لم تعرف متغيراً باسم secretNumber.' },
          { regex: 'Math\\.random', errorMessage: 'لم تستخدم الدالة Math.random()' },
          { regex: 'Math\\.floor|Math\\.ceil|Math\\.round|parseInt', errorMessage: 'يجب تحويل الرقم العشوائي لعدد صحيح.' }
        ],
        hints: ['جرب: `const secretNumber = Math.floor(Math.random() * 10) + 1;`'],
        codeExplanation: 'Math.random() تعطينا دائماً رقماً عشرياً بين صفر وواحد، فنضربه في 10 لنكبره، ثم نزيل الفواصل فيصبح عدداً صحيحاً.'
      }
    ]
  }
];
