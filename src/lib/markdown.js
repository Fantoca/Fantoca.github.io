import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export function renderMarkdown(markdown) {
  const headings = [];
  const clean = sanitizeHtml(marked.parse(markdown, { async: false }), {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'],
    allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'width', 'height'], code: ['class'] },
  });
  const html = clean.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, title) => {
    const id = `section-${headings.length + 1}`;
    headings.push({ id, title: sanitizeHtml(title, { allowedTags: [], allowedAttributes: {} }) });
    return `<h2 id="${id}">${title}</h2>`;
  });
  return { html, headings };
}
