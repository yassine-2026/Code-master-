import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme for code
import { ArrowRight, Play, CheckCircle2, Circle, Lightbulb, Code2, MonitorPlay, XCircle, LayoutPanelLeft } from 'lucide-react';
import { realProjects, ProjectStage } from '../lib/projectsData';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import { SEO } from '../components/SEO';

export function ProjectWorkspace() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = realProjects.find(p => p.id === projectId);
  
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [code, setCode] = useState<{ [lang: string]: string }>({});
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [currentLang, setCurrentLang] = useState<'html' | 'css' | 'javascript'>(project?.defaultLanguage === 'html' ? 'html' : 'javascript');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [stagePassed, setStagePassed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!project) return;
    
    // Load saved progress
    try {
      const saved = localStorage.getItem(`project-progress-${project.id}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.stageIndex !== undefined) setCurrentStageIndex(data.stageIndex);
        if (data.code) setCode(data.code);
        return;
      }
    } catch(e) {}

    // Initialize code for first stage
    const firstStage = project.stages[0];
    initStageCode(firstStage, {});
  }, [project]);

  const initStageCode = (stage: ProjectStage, currentCode: { [lang: string]: string }) => {
    const newCode = { ...currentCode };
    if (stage.initialCode?.html && !newCode.html) newCode.html = stage.initialCode.html;
    if (stage.initialCode?.css && !newCode.css) newCode.css = stage.initialCode.css;
    if (stage.initialCode?.js && !newCode.js) newCode.js = stage.initialCode.js;
    setCode(newCode);
    setStagePassed(false);
    setValidationError(null);
    setShowHint(false);
    setShowExplanation(false);
  };

  const saveProgress = (stageIdx: number, currentCode: any) => {
    localStorage.setItem(`project-progress-${project?.id}`, JSON.stringify({
      stageIndex: stageIdx,
      code: currentCode
    }));
  };

  useEffect(() => {
    if (!project) return;
    saveProgress(currentStageIndex, code);
  }, [currentStageIndex, code, project]);

  if (!project) {
    return <div className="p-8 text-center">المشروع غير موجود</div>;
  }

  const stage = project.stages[currentStageIndex];

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(prev => ({ ...prev, [currentLang]: value }));
      setStagePassed(false);
      setValidationError(null);
    }
  };

  const runValidationAndPreview = () => {
    if (!stage) return;

    // Check rules
    let hasError = false;
    for (const rule of stage.validationRules) {
      const combinedCode = (code.html || '') + ' ' + (code.css || '') + ' ' + (code.js || '');
      const regex = new RegExp(rule.regex, 's');
      if (!regex.test(combinedCode)) {
        setValidationError(rule.errorMessage);
        hasError = true;
        break;
      }
    }

    if (hasError) {
      setStagePassed(false);
      setActiveTab('editor'); // keep them in editor to see error
    } else {
      setValidationError(null);
      setStagePassed(true);
      setActiveTab('preview');
      updatePreview();
    }
  };

  const updatePreview = () => {
    if (!iframeRef.current) return;
    
    const htmlSnippet = code.html || '<body></body>';
    const cssSnippet = code.css || '';
    const jsSnippet = code.js || '';

    const content = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 16px; box-sizing: border-box; }
            ${cssSnippet}
          </style>
        </head>
        ${htmlSnippet}
        <script>
          try {
            ${jsSnippet}
          } catch (e) {
            document.body.innerHTML += '<div style="color:red; margin-top:20px; font-family:monospace; border:1px solid red; padding:10px; border-radius:5px;">خطأ جافاسكريبت: ' + e.message + '</div>';
          }
        </script>
      </html>
    `;
    
    // Inject into iframe safely
    const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(content);
      iframeDoc.close();
    }
  };

  const nextStage = () => {
    if (currentStageIndex < project.stages.length - 1) {
      const nextIdx = currentStageIndex + 1;
      setCurrentStageIndex(nextIdx);
      initStageCode(project.stages[nextIdx], code);
      setActiveTab('editor');
    } else {
      alert("مبارك! لقد أتممت المشروع كاملاً.");
      navigate(`/projects`);
    }
  };

  const showHelpButtons = ['absolute_beginner', 'beginner', 'intermediate', 'advanced'].includes(project.level);
  const showExplainCodeButton = ['absolute_beginner', 'beginner'].includes(project.level);

  const mapLangToPrism = (lang: string) => {
    if (lang === 'html') return Prism.languages.markup;
    if (lang === 'css') return Prism.languages.css;
    if (lang === 'javascript') return Prism.languages.javascript;
    return Prism.languages.javascript; // fallback
  };

  return (
    <div className="fixed inset-0 top-16 bg-white dark:bg-slate-950 flex flex-col z-40">
      <SEO 
        title={`${project.title} - مساحة العمل`} 
        description={`مساحة العمل لمشروع ${project.title}. ابدأ البرمجة الآن.`}
      />
      {/* Header */}
      <header className="h-16 shrink-0 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="font-bold text-lg leading-tight truncate">{project.title}</h1>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              المرحلة {currentStageIndex + 1} من {project.stages.length}: {stage.title}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {stagePassed ? (
            <button
              onClick={nextStage}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-transform hover:scale-105 text-sm"
            >
              المرحلة التالية
              <CheckCircle2 size={18} />
            </button>
          ) : (
            <button
              onClick={runValidationAndPreview}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow flex items-center gap-2 transition-colors text-sm"
            >
              تشغيل ومعاينة
              <Play size={18} />
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left pane: Instructions */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{stage.title}</h2>
            
            <div className="prose dark:prose-invert prose-sm max-w-none mb-8 text-slate-700 dark:text-slate-300">
              <ReactMarkdown>{stage.explanation}</ReactMarkdown>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
               <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                 <CheckCircle2 size={18} />
                 المهمة المطلوبة
               </h3>
               <p className="text-sm text-blue-900 dark:text-blue-200">{stage.task}</p>
            </div>

            {validationError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 animate-pulse">
                 <h3 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                   <XCircle size={18} />
                   يوجد خطأ
                 </h3>
                 <p className="text-sm text-red-900 dark:text-red-200">{validationError}</p>
              </div>
            )}

            {stagePassed && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
                 <h3 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                   <CheckCircle2 size={18} />
                   أحسنت!
                 </h3>
                 <p className="text-sm text-green-900 dark:text-green-200">لقد نفذت المهمة بنجاح، يمكنك الانتقال للمرحلة التالية.</p>
              </div>
            )}

            {/* Help Buttons */}
            {showHelpButtons && !stagePassed && (
              <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                 {stage.hints && stage.hints.length > 0 && (
                   <button 
                     onClick={() => setShowHint(true)}
                     className="flex items-center gap-2 text-sm text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-4 py-2 rounded-lg border border-amber-200 dark:border-amber-800/50 transition-colors"
                   >
                     <Lightbulb size={16} />
                     أحتاج توجيهاً (تلميح)
                   </button>
                 )}
                 
                 {showHint && (
                   <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-sm text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/50">
                     <ul className="list-disc list-inside space-y-1">
                       {stage.hints.map((h, i) => <li key={i}>{h}</li>)}
                     </ul>
                   </div>
                 )}

                 {showExplainCodeButton && stage.codeExplanation && (
                   <button
                     onClick={() => setShowExplanation(!showExplanation)}
                     className="flex items-center gap-2 text-sm text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 px-4 py-2 rounded-lg border border-indigo-200 dark:border-indigo-800/50 transition-colors"
                   >
                     <Code2 size={16} />
                     اشرح لي الكود
                   </button>
                 )}
                 {showExplanation && stage.codeExplanation && (
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg text-sm text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800/50">
                      <ReactMarkdown>{stage.codeExplanation}</ReactMarkdown>
                    </div>
                 )}
              </div>
            )}
          </div>
        </div>

        {/* Right pane: Editor / Preview Tabbed Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#2d2d2d] relative">
          <div className="flex bg-[#1e1e1e] px-4 pt-2 gap-1 overflow-x-auto shrink-0">
             <button
               onClick={() => setActiveTab('editor')}
               className={cn("px-4 py-2 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-colors", activeTab === 'editor' ? "bg-[#2d2d2d] text-blue-400" : "text-slate-400 hover:text-slate-200 hover:bg-[#252525]")}
             >
               <Code2 size={16} />
               المحرر
             </button>
             <button
               onClick={() => { setActiveTab('preview'); updatePreview(); }}
               className={cn("px-4 py-2 rounded-t-lg font-medium text-sm flex items-center gap-2 transition-colors", activeTab === 'preview' ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400" : "text-slate-400 hover:text-slate-200 hover:bg-[#252525]")}
             >
               <MonitorPlay size={16} />
               المعاينة الفعلية
             </button>
          </div>

          <div className="flex-1 overflow-hidden relative">
             {activeTab === 'editor' && (
                <div className="absolute inset-0 flex flex-col">
                  {/* Language Selector if multiple exist */}
                  <div className="bg-[#2d2d2d] border-b border-[#3d3d3d] p-2 flex gap-2">
                    {['html', 'css', 'javascript'].filter(lang => code[lang] !== undefined).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setCurrentLang(lang as any)}
                        className={cn("px-3 py-1 text-xs font-mono rounded uppercase transition-colors", currentLang === lang ? "bg-[#3d3d3d] text-white" : "text-slate-400 hover:text-slate-200 hover:bg-[#333]")}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 overflow-y-auto bg-[#2d2d2d] custom-scrollbar w-full" dir="ltr">
                    <Editor
                      value={code[currentLang] || ''}
                      onValueChange={(val) => handleEditorChange(val)}
                      highlight={raw => Prism.highlight(raw, mapLangToPrism(currentLang), currentLang)}
                      padding={16}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: '#e2e8f0',
                        minHeight: '100%',
                        direction: 'ltr',
                        minWidth: 'max-content'
                      }}
                      className="editor-container w-full"
                    />
                  </div>
                </div>
             )}

             {activeTab === 'preview' && (
               <div className="absolute inset-0 bg-white shadow-inner flex flex-col">
                 <div className="bg-slate-100 border-b border-slate-200 p-2 text-xs text-slate-500 font-mono flex items-center gap-2">
                   <MonitorPlay size={14} /> المعاينة المباشرة (Live Preview)
                 </div>
                 <iframe 
                   ref={iframeRef}
                   className="w-full flex-1 border-0 bg-white"
                   title="Preview"
                   sandbox="allow-scripts"
                 />
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
