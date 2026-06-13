import { useStore } from '../lib/store';
import { useState } from 'react';
import { Save, Download, Upload, AlertTriangle, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

export function Settings() {
  const store = useStore();
  const [importText, setImportText] = useState('');
  const [msg, setMsg] = useState<{type: 'success'|'error', text: string} | null>(null);

  const handleExport = () => {
    const data = store.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codemaster-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg({ type: 'success', text: 'تم تصدير البيانات بنجاح!' });
    store.addActivity('تصدير البيانات محلياً');
  };

  const handleImport = () => {
    if (!importText.trim()) {
       setMsg({ type: 'error', text: 'الرجاء لصق محتوى JSON أولاً' });
       return;
    }
    const success = store.importData(importText);
    if (success) {
      setMsg({ type: 'success', text: 'تم استيراد البيانات بنجاح! سيتم تحديث الصفحة...' });
      store.addActivity('استيراد بيانات من النسخة الاحتياطية');
      setTimeout(() => window.location.reload(), 2000);
    } else {
      setMsg({ type: 'error', text: 'فشل استيراد البيانات. تأكد من صحة الملف.' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setImportText(text);
      };
      reader.readAsText(file);
    }
  };

  const clearData = () => {
     if(confirm('هل أنت متأكد؟ سيتم مسح جميع بياناتك المحفوظة نهائياً.')) {
        localStorage.removeItem('codemaster-storage');
        window.location.href = '/';
     }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <SEO title="الإعدادات" description="إدارة إعدادات حسابك وبياناتك على أكاديمية كود ماستر." />
      <div>
        <h1 className="text-3xl font-bold mb-2">الإعدادات والبيانات</h1>
        <p className="text-slate-500 dark:text-slate-400">تحكم ببياناتك المحفوظة محلياً. منصة كود ماستر لا تستخدم أي خوادم خارجية.</p>
      </div>

      {msg && (
        <div className={`p-4 rounded-xl flex items-center gap-3 font-semibold ${msg.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
           {msg.type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
           {msg.text}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-800">
           <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Download size={20} /> تصدير البيانات (نسخ احتياطي)</h2>
           <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">يفضل عمل نسخة احتياطية لبياناتك بشكل دوري لتجنب فقدانها عند مسح بيانات المتصفح.</p>
           <button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
              <Download size={18} /> تحميل ملف النسخة الاحتياطية
           </button>
        </div>

        <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-800/20">
           <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><Upload size={20} /> استيراد البيانات</h2>
           <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">اختر ملف النسخة الاحتياطية أو الصق محتواه هنا لاستعادة تقدمك.</p>
           
           <div className="space-y-4">
              <input 
                type="file" 
                accept=".json" 
                onChange={handleFileUpload}
                className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-800 dark:file:text-slate-300"
              />
              
              <div className="relative">
                <textarea 
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="أو الصق الكود (JSON) هنا..."
                  className="w-full h-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                  dir="ltr"
                />
              </div>

              <button onClick={handleImport} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors">
                 <Save size={18} /> حفظ واستعادة
              </button>
           </div>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-3xl p-6 md:p-8 mt-8">
         <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2"><AlertTriangle size={20} /> منطقة الخطر</h2>
         <p className="text-slate-700 dark:text-slate-300 text-sm mb-6">مسح جميع بيانات التقدم المحفوظة في هذا المتصفح بشكل نهائي. لا يمكن التراجع عن هذه الخطوة.</p>
         <button onClick={clearData} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm">
            مسح جميع البيانات
         </button>
      </div>
    </div>
  );
}
