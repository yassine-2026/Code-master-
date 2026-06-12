export interface LinterError {
  line?: number;
  type: string;
  reason: string;
  fix: string;
}

export function lintCode(code: string, language: string, expectedVars?: string[]): LinterError | null {
  const lines = code.split('\n');

  if (language === 'html') {
    // Check for unclosed tags
    const openTags = [];
    const tagRegex = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
    let match;
    while ((match = tagRegex.exec(code)) !== null) {
      const tag = match[1].toLowerCase();
      const isClosing = match[0].startsWith('</');
      const isSelfClosing = match[0].endsWith('/>') || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tag);
      
      if (isSelfClosing) continue;

      if (!isClosing) {
        openTags.push(tag);
      } else {
        if (openTags.length === 0 || openTags[openTags.length - 1] !== tag) {
           return {
             type: 'علامة غير متطابقة (Mismatched Tag)',
             reason: `تم إغلاق وسم ولكن لم يتم فتحه بشكل صحيح، أو هناك وسم آخر متداخل.`,
             fix: `تأكد من إغلاق الوسوم بنفس الترتيب الذي فُتحت به.`
           };
        }
        openTags.pop();
      }
    }

    if (openTags.length > 0) {
      return {
        type: 'وسم غير مغلق (Unclosed Tag)',
        reason: `يوجد عنصر HTML لم يتم إغلاقه.`,
        fix: `بحث عن الوسم المفقود إغلاقه وأضف وسم الإغلاق المناسب.`
      };
    }
  }

  if (language === 'css') {
    // Check for missing braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
      return {
        type: 'قوس مفقود (Missing Brace)',
        reason: 'يوجد قوس فتح وليس له قوس إغلاق مقابل.',
        fix: 'هل قمت بإغلاق جميع الأقواس في النهاية؟'
      };
    } else if (closeBraces > openBraces) {
         return {
        type: 'قوس زائد (Extra Brace)',
        reason: 'يوجد قوس إغلاق زائد أو غير متوقع.',
        fix: 'راجع الأقواس وتأكد من عدم وضع أقواس إضافية.'
      };
    }
  }

  if (language === 'javascript') {
    // Basic syntax parsing
    try {
      new Function(code);
    } catch (e: any) {
      // e.g., SyntaxError: Unexpected token '}'
      const message = e.message || '';
      return {
        type: 'خطأ نحوي (Syntax Error)',
        reason: `هناك خطأ في طريقة كتابة الكود: ${message}`,
        fix: 'هل قمت بكتابة الأقواس والفواصل المنقوطة وعلامات التنصيص بشكل صحيح؟ راجع قواعد كتابة الجافاسكربت الأساسية.'
      };
    }
  }

  return null;
}
