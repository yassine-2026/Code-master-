import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  schema?: Record<string, any>;
}

export function SEO({ title, description, keywords, canonicalUrl, schema }: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    const fullTitle = `${title} | أكاديمية كود ماستر`;
    document.title = fullTitle;

    // Helper to set meta tags
    const setMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute('content', value);
      } else {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        } else if (selector.startsWith('meta[property')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        }
        element.setAttribute('content', value);
        document.head.appendChild(element);
      }
    };

    // 2. Update Description
    if (description) {
      setMetaTag('meta[name="description"]', 'content', description);
      setMetaTag('meta[property="og:description"]', 'content', description);
      setMetaTag('meta[property="twitter:description"]', 'content', description);
    }

    // 3. Update Keywords
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'content', keywords);
    }
    
    // 4. Update Title for Open Graph and Twitter
    setMetaTag('meta[property="og:title"]', 'content', fullTitle);
    setMetaTag('meta[property="twitter:title"]', 'content', fullTitle);

    // 5. Update Canonical URL
    const finalCanonicalUrl = canonicalUrl || `https://codemaster-academy.vercel.app${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', finalCanonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', finalCanonicalUrl);
      document.head.appendChild(canonicalLink);
    }
    
    setMetaTag('meta[property="og:url"]', 'content', finalCanonicalUrl);

    // 6. Structured Data (JSON-LD)
    if (schema) {
      let script = document.querySelector('#seo-schema') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'seo-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.innerText = JSON.stringify(schema);
    }

    // Cleanup function
    return () => {
      // We don't necessarily remove tags on unmount because the next page will overwrite them,
      // but to be clean, we can leave them or remove JSON-LD script if needed.
    };

  }, [title, description, keywords, canonicalUrl, location.pathname, schema]);

  return null;
}
