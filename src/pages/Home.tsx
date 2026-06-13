import { Link } from 'react-router-dom';
import { ArrowLeft, Code2, Cpu, Database, PlayCircle } from 'lucide-react';
import { specialties } from '../lib/data';

import { SEO } from '../components/SEO';

function IconWrapper({ iconName, className, size }: { iconName: string, className?: string, size?: number }) {
  // Mapping logic for dynamic icons based on name
  let Icon = Code2;
  if (iconName === 'Cpu') Icon = Cpu;
  if (iconName === 'Database') Icon = Database;
  return <Icon className={className} size={size} />;
}

export function Home() {
  const popularSpecialties = specialties.slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      <SEO 
        title="الرئيسية" 
        description="تعلم البرمجة من الصفر وحتى الاحتراف باللغة العربية عبر مسارات تفاعلية"
        keywords="تعلم البرمجة, كورسات برمجة, لغات برمجة, أكاديمية كود ماستر"
        schema={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "أكاديمية كود ماستر",
          "description": "منصة تعليمية عربية مجانية لتعلم البرمجة وتطوير الويب والتطبيقات والألعاب من خلال التطبيق العملي.",
          "url": "https://codemaster-academy.vercel.app/"
        }}
      />
      {/* Hero Section */}
      <section className="text-center py-16 px-4 md:py-24 rounded-2xl bg-gradient-to-l from-slate-800 to-slate-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mask-image-gradient"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            تعلم البرمجة، <br className="hidden md:block"/> ابنِ مستقبلك
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            منصة تعليمية متكاملة بمسارات منظمة من الصفر وحتى الاحتراف. جميع تقدمك وبياناتك تحفظ محلياً على جهازك بشكل آمن تماماً!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/courses" className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
              <PlayCircle size={20} />
              ابدأ التعلم الآن
            </Link>
            <Link to="/dashboard" className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-sm border border-white/20 transition-all w-full sm:w-auto">
              متابعة دراستي
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { title: "حفظ محلي 100%", desc: "لا خوادم أو حسابات. جميع بياناتك وتقدمك محفوظ بأمان تام محلياً بمتصفحك." },
          { title: "مسارات منظمة", desc: "تتبع تقدمك في دورات مبنية بشكل تدرجي معتمد من مبتدئ إلى محترف." },
          { title: "إنجازات وشهادات", desc: "احصل على شارات تفاعلية وشهادات كتقدير عند إكمالك كل تخصص." }
        ].map((feat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-xl mb-6">
                <Code2 size={24} />
             </div>
             <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
             <p className="text-slate-500 dark:text-slate-400">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* Specialties Preview */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">أبرز التخصصات</h2>
            <p className="text-slate-500 dark:text-slate-400">تعرف على المجالات الأكثر طلباً في سوق العمل</p>
          </div>
          <Link to="/courses" className="hidden sm:flex text-blue-600 font-semibold items-center gap-1 hover:gap-2 transition-all">
            عرض الكل <ArrowLeft size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {popularSpecialties.map(spec => (
             <Link key={spec.id} to={`/course/${spec.id}`} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-blue-400 dark:hover:border-blue-400 transition-all flex flex-col h-full cursor-pointer">
                <div className={`w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                   <IconWrapper iconName={spec.iconType} size={24} />
                </div>
                <h4 className="font-bold text-sm mb-1">{spec.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex-1">{spec.description}</p>
                <div className="flex items-center text-[10px] font-bold text-slate-400 mt-auto justify-between">
                   <span>3 مسارات</span>
                   <span className="text-blue-600 group-hover:underline">استكشف</span>
                </div>
             </Link>
           ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link to="/courses" className="bg-slate-100 dark:bg-slate-800 font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2">
            عرض جميع المسارات <ArrowLeft size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
