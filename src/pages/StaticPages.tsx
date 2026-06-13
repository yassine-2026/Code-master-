import { SEO } from '../components/SEO';

export function FAQ() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <SEO title="الأسئلة الشائعة" description="إجابات على الأسئلة الشائعة حول المنصة وطريقة الاستخدام." />
      <h1 className="text-3xl font-bold">الأسئلة الشائعة</h1>
      <div className="space-y-4">
        {[
          { q: 'كيف يتم حفظ بياناتي؟', a: 'يتم حفظ جميع البيانات المتعلقة بتقدمك، شاراتك، والمفضلة محلياً في متصفحك (LocalStorage). لا يتم إرسال أي معلومة إلى أي خادم خارجي.' },
          { q: 'ماذا لو قمت بتغيير الجهاز أو المتصفح؟', a: 'بما أن البيانات تحفظ محلياً، فستحتاج إلى تصدير بياناتك من الإعدادات في المتصفح القديم واستيرادها في المتصفح الجديد.' },
          { q: 'هل الدورات مجانية؟', a: 'نعم، المنصة تعليمية ومجانية بالكامل.' },
          { q: 'هل أحتاج لإنشاء حساب؟', a: 'لا، المنصة مصممة لتعمل بدون أي حسابات حفاظاً على خصوصيتك وسهولة الاستخدام.' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-2 text-blue-600 dark:text-blue-400">{item.q}</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <SEO title="تواصل معنا" description="تواصل مع فريق أكاديمية كود ماستر لأي استفسارات أو اقتراحات." />
      <h1 className="text-3xl font-bold">تواصل معنا</h1>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl text-center">
        <p className="text-slate-600 dark:text-slate-300 mb-6">لأي استفسارات أو اقتراحات لتطوير المنصة، نسعد بتواصلكم عبر البريد الإلكتروني.</p>
        <a href="mailto:support@codemaster.academy" className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
          support@codemaster.academy
        </a>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <SEO title="سياسة الخصوصية" description="سياسة خصوصية أكاديمية كود ماستر وكيفية حماية بياناتك." />
      <h1 className="text-3xl font-bold">سياسة الخصوصية</h1>
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
        <h3>1. جمع البيانات</h3>
        <p>لا نقوم بجمع أو تخزين أي بيانات شخصية. جميع معلومات التقدم والدروس يتم تخزينها محلياً على جهاز المستخدم المتصفح.</p>
        <h3>2. الأطراف الثالثة</h3>
        <p>المنصة لا تستخدم أي أدوات تتبع (Trackers) خارجية ولا يتم مشاركة أي معلومات مع طرف ثالث.</p>
        <h3>3. حماية البيانات</h3>
        <p>أنت المسؤول الأول عن حماية بياناتك عن طريق تصدير النسخ الاحتياطية من الإعدادات، حيث أن مسح بيانات المتصفح سيؤدي إلى فقدانها.</p>
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <SEO title="من نحن" description="معلومات عن أكاديمية كود ماستر وأهدافنا في تعليم البرمجة." />
      <h1 className="text-3xl font-bold">من نحن</h1>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">أكاديمية كود ماستر</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <p>
            أكاديمية كود ماستر هي منصة تعليمية عربية تهدف إلى تبسيط وتعليم البرمجة من الصفر وحتى الاحتراف. 
            نوفر بيئة تعليمية تفاعلية تعتمد على التطبيق العملي بعيداً عن الجانب النظري الممل.
          </p>
          <p>
            تتميز المنصة بدعمها الكامل للتدريب التفاعلي، حيث يمكنك كتابة الأكواد وتجربتها مباشرة داخل المتصفح وبدون الحاجة لإنشاء حساب أو تثبيت أي برامج معقدة.
          </p>
          <p>
            نؤمن بأن البرمجة يجب أن تكون ممتعة ومتاحة للجميع، ولذلك نقدم هذا المحتوى مجاناً.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      <SEO title="شروط الاستخدام" description="شروط الاستخدام الخاصة بمنصة أكاديمية كود ماستر تعليم البرمجة." />
      <h1 className="text-3xl font-bold">شروط الاستخدام</h1>
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
        <h3>1. الاستخدام المقبول</h3>
        <p>المنصة مفتوحة للجميع بفرض التعلم والتطوير الشخصي.</p>
        <h3>2. الملكية الفكرية</h3>
        <p>جميع حقوق المحتوى التعليمي محفوظة للمنصة، ولا يجوز إعادة نشرها لأغراض تجارية.</p>
        <h3>3. إخلاء المسؤولية</h3>
        <p>يتم توفير المحتوى "كما هو" لأغراض تعليمية، والمنصة غير مسؤولة عن فقدان البيانات المحلية في متصفح المستخدم.</p>
      </div>
    </div>
  );
}
