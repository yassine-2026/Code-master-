import React, { useState, useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme for code
import { Play, CheckCircle2, AlertTriangle, RefreshCw, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { lintCode, LinterError } from '../lib/linter';

interface InteractiveEditorProps {
  initialCode: string;
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'python' | 'cpp' | 'java';
  instructions: string;
  validationRegex?: string;
  hints?: string[];
  solution?: string;
  solutionExplanation?: string;
  onSuccess: () => void;
}

export function InteractiveEditor({ initialCode, language, instructions, validationRegex, hints, solution, solutionExplanation, onSuccess }: InteractiveEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState<{ active: boolean; currentHint: number }>({ active: false, currentHint: 0 });
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showingSolution, setShowingSolution] = useState(false);
  const [canShowSolution, setCanShowSolution] = useState(false);
  const [linterError, setLinterError] = useState<LinterError | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync state when lesson changes
  useEffect(() => {
    setCode(initialCode);
    setOutput('');
    setStatus('idle');
    setFeedback('');
    setShowHint({ active: false, currentHint: 0 });
    setFailedAttempts(0);
    setShowingSolution(false);
    setCanShowSolution(false);
    setLinterError(null);
  }, [initialCode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanShowSolution(true);
    }, 180000); // 3 minutes
    return () => clearTimeout(timer);
  }, [initialCode]);

  useEffect(() => {
    if (failedAttempts >= 3) {
      setCanShowSolution(true);
    }
  }, [failedAttempts]);

  // Live preview with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
       runCodeSilently();
    }, 800);
    return () => clearTimeout(timer);
  }, [code]);

  const runCodeSilently = () => {
    const err = lintCode(code, language);
    if (err) {
      setLinterError(err);
      setStatus('error');
      setFeedback('مكتشف الأخطاء التلقائي وجد مشكلة يجب حلها أولاً.');
      if (iframeRef.current) iframeRef.current.srcdoc = '';
      return false;
    }
    
    setLinterError(null);

    if (language === 'html' || language === 'css' || language === 'javascript') {
      let combinedHTML = code;
      
      if (language === 'css') {
        combinedHTML = `<!DOCTYPE html><html><head><style>${code}</style></head><body><div style="padding: 20px;"><h1>تجربة التنسيق</h1><p>تأثير الكود سيظهر هنا</p><button>زر تجريبي</button></div></body></html>`;
      } else if (language === 'javascript') {
        // Capture console.log
        combinedHTML = `
          <!DOCTYPE html>
          <html>
          <body>
            <div id="output" style="font-family: monospace; padding: 10px; direction: ltr;"></div>
            <script>
              const ogLog = console.log;
              console.log = function(...args) {
                 const out = document.getElementById('output');
                 out.innerHTML += args.join(' ') + '<br>';
                 ogLog.apply(console, args);
              }
              try {
                ${code}
              } catch(e) {
                console.log('<span style="color:red">Error: ' + e.message + '</span>');
              }
            </script>
          </body>
          </html>
        `;
      }

      if (iframeRef.current) {
         iframeRef.current.srcdoc = combinedHTML;
      }
    }
    return true;
  };

  const runCodeAndValidate = () => {
    setStatus('idle'); // reset before applying new check
    const success = runCodeSilently();
    if (!success) {
      setFailedAttempts(prev => prev + 1);
      return; // prevent validation if there are linter errors
    }

    if (language !== 'html' && language !== 'css' && language !== 'javascript') {
       setOutput('جاري التجميع والتشغيل...\\nتمت العملية بنجاح!');
    }
    validateCode();
  };

  const validateCode = () => {
    if (!validationRegex) {
      setStatus('success');
      setFeedback('أحسنت! كود صحيح.');
      onSuccess();
      return;
    }

    try {
      let codeToTest = code.replace(/\s+/g, ' '); // simple normalization
      
      const regex = new RegExp(validationRegex, 'i');
      if (regex.test(codeToTest) || regex.test(code)) {
        setStatus('success');
        setFeedback('أحسنت! الكود صحيح وتم تنفيذ المطلوب بنجاح.');
        onSuccess();
      } else {
        setStatus('error');
        setFeedback('الكود يعمل ولكن لا يحقق جميع المتطلبات. تأكد من قراءة التعليمات بعناية.');
        setFailedAttempts(prev => prev + 1);
      }
    } catch (e) {
      setStatus('error');
      setFeedback('يوجد خطأ غير معروف أثناء فحص الكود.');
      setFailedAttempts(prev => prev + 1);
    }
  };

  const handleShowHint = () => {
    if (!hints || hints.length === 0) return;
    if (showHint.currentHint < hints.length) {
      setShowHint(prev => ({
         active: true,
         currentHint: prev.currentHint + 1
      }));
    }
  };

  const mapLangToPrism = (lang: string) => {
    if (lang === 'html') return Prism.languages.markup;
    if (lang === 'css') return Prism.languages.css;
    if (lang === 'javascript') return Prism.languages.javascript;
    return Prism.languages.javascript; // fallback
  };

  return (
    <div className="flex flex-col h-fit border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
      
      {/* Header / Instructions */}
      <div className="bg-slate-50 dark:bg-slate-800 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800">
         <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold flex items-center gap-2 text-lg">
               تمرين تفاعلي 
               <span className="text-xs font-mono bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded uppercase">{language}</span>
            </h3>
            {hints && hints.length > 0 && (
               <button 
                 onClick={handleShowHint}
                 className="text-sm text-amber-600 hover:text-amber-700 font-semibold bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1 transition-colors"
                 disabled={showHint.currentHint === hints.length}
               >
                 💡 أحتاج مساعدة {showHint.currentHint > 0 && showHint.currentHint < hints.length && `(${showHint.currentHint}/${hints.length})`}
               </button>
            )}
         </div>
         <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-2">{instructions}</p>
         
         {showHint.active && showHint.currentHint > 0 && !showingSolution && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-xl text-sm leading-relaxed whitespace-pre-wrap">
               <strong>تلميحات:</strong>
               <ul className="list-disc list-inside mt-2 space-y-1">
                 {hints.slice(0, showHint.currentHint).map((h, i) => (
                    <li key={i}>{h}</li>
                 ))}
               </ul>
            </div>
         )}
      </div>

      {/* Editor & Output Workspace */}
      <div className="flex-1 min-h-[400px] max-h-[600px] flex flex-col sm:flex-row overflow-hidden">
        {/* Editor Pane */}
        <div className="flex-1 flex flex-col border-b sm:border-b-0 sm:border-l border-slate-200 dark:border-slate-800 shrink-0 basis-1/2 relative">
           <div className="flex justify-between items-center bg-slate-900 text-slate-400 text-xs px-4 py-2">
              <span>محرر الكود</span>
              <button onClick={() => setCode(initialCode)} className="hover:text-white flex items-center gap-1"><RefreshCw size={12}/> إعادة تعيين</button>
           </div>
           <div className="flex-1 overflow-y-auto bg-[#2d2d2d] custom-scrollbar" dir="ltr">
             <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => Prism.highlight(code, mapLangToPrism(language), language)}
                padding={15}
                 style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 14,
                  minHeight: '100%',
                  color: '#e2e8f0',
                  direction: 'ltr'
                }}
                className="editor-container"
              />
           </div>
        </div>

        {/* Output Pane */}
        <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 basis-1/2 relative">
           <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xs px-4 py-2">
              <span>النتيجة (Output)</span>
              <button 
                onClick={runCodeAndValidate}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded flex items-center gap-1 transition-colors"
              >
                 <Play size={14} /> تشغيل الكود
              </button>
           </div>
           
           <div className="flex-1 bg-white dark:bg-white relative overflow-hidden h-full">
              {(language === 'html' || language === 'css' || language === 'javascript') ? (
                 <iframe 
                   ref={iframeRef} 
                   className="w-full h-full border-none"
                   sandbox="allow-scripts"
                   title="output"
                 />
              ) : (
                <div className="p-4 font-mono text-sm text-slate-800" dir="ltr">
                   <pre>{output}</pre>
                   <div className="text-slate-400 mt-4 text-xs italic">// بيئة المحاكاة تعمل بوضع القراءة فقط للغات التي تتطلب تجميع (Compile)</div>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Status Bar */}
      {status !== 'idle' && !linterError && (
        <div className={`p-4 text-sm font-semibold flex items-center gap-2 ${status === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
           {status === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
           {feedback}
        </div>
      )}

      {/* Linter Error Panel */}
      {linterError && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800 text-red-900 dark:text-red-200">
           <div className="flex items-center gap-2 font-bold mb-3">
              <XCircle size={18} className="text-red-600 dark:text-red-400" />
              <span>لوحة الأخطاء المحلية</span>
           </div>
                      <div className="space-y-2 text-sm">
              <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                 <span className="font-semibold text-red-700/80 dark:text-red-300">نوع الخطأ:</span>
                 <span>{linterError.type}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                 <span className="font-semibold text-red-700/80 dark:text-red-300">سبب الخطأ:</span>
                 <span>{linterError.reason}</span>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                 <span className="font-semibold text-red-700/80 dark:text-red-300">توجيه:</span>
                 <span>{linterError.fix}</span>
              </div>
           </div>
        </div>
      )}

      {/* Delayed Solution Button */}
      {canShowSolution && solution && !showingSolution && (
         <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 flex justify-center">
            <button
               onClick={() => setShowingSolution(true)}
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm"
            >
               إظهار الإجابة
            </button>
         </div>
      )}
      
      {showingSolution && solution && (
         <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200">
            <h4 className="font-bold mb-4 text-lg">الحل النموذجي:</h4>
            <pre className="bg-blue-100/50 dark:bg-slate-900/50 p-4 rounded-xl text-left" dir="ltr">
               <code>{solution}</code>
            </pre>
            {solutionExplanation && (
              <div className="mt-6 pt-6 border-t border-blue-200/50 dark:border-blue-800/50 markdown-body prose-sm max-w-none text-right" dir="rtl">
                 <ReactMarkdown>{solutionExplanation}</ReactMarkdown>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-blue-200/50 dark:border-blue-800/50 flex gap-4">
              <button onClick={() => { setCode(solution); setShowingSolution(false); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors">
                استخدام الحل في المحرر
              </button>
              <button onClick={() => setShowingSolution(false)} className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-4 py-2 rounded-lg font-bold transition-colors">
                إغلاق الإجابة
              </button>
            </div>
         </div>
      )}
    </div>
  );
}
